import ShoppingList from '../models/ShoppingList.js';
import mongoose from 'mongoose';

export const createList = async (req, res) => {
  // 1. Extrai o novo campo 'userId' do corpo da requisição
  const { name, items, userId } = req.body; 

  try {
    // 2. Validação: Checa se o nome e, PRINCIPALMENTE, o userId estão presentes
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: 'O nome da lista é obrigatório.' });
    }
    
    // ⚠️ Validação de Segurança/Obrigatoriedade do Schema
    if (!userId) {
        // Usa 401 (Não Autorizado) ou 403 (Proibido) para indicar falta de autenticação/identificação
        return res.status(401).json({ message: 'O ID do usuário é obrigatório para criar a lista.' });
    }

    // 3. Cria a nova lista, incluindo o userId
    const newList = new ShoppingList({
      name: name.trim(),
      items: items || [],
      userId: userId      // <--- O DONO DA LISTA AGORA É SALVO AQUI
    });

    await newList.save();
    res.status(201).json(newList);

  } catch (error) {
    console.error('Erro em createList:', error);
    // Erros 500 podem incluir falhas de conexão ou falha na validação do ObjectId
    res.status(500).json({ message: 'Erro ao criar a lista.' });
  }
};

// --- 2. FUNÇÃO PARA BUSCAR TODAS AS LISTAS ---
export const getAllLists = async (req, res) => {
  // 1. CAPTURA DO ID DE FORMA SEGURA a partir do middleware
  const userId = req.userId; // <-- CAPTURANDO A VARIÁVEL QUE O MIDDLEWARE ANEXOU

  try {
    // ⚠️ Validação: O token deve ter garantido que o ID existe, mas é bom checar.
    if (!userId) {
      // Isso só deveria ocorrer se o middleware falhar, mas é uma proteção.
      return res.status(401).json({ message: 'Acesso negado. ID de usuário não encontrado.' });
    }

    // 2. FILTRAGEM NO BANCO DE DADOS
    const userLists = await ShoppingList.find({
      userId: userId // <-- Filtra APENAS pelas listas desse usuário
    })
    .sort({ createdAt: -1 })
    .exec();

    res.status(200).json(userLists);

  } catch (error) {
    console.error('Erro em getAllLists:', error);
    res.status(500).json({ message: 'Erro ao buscar as listas.' });
  }
};

// --- 3. FUNÇÃO PARA BUSCAR UMA LISTA POR ID ---
export const getListById = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await ShoppingList.findById(id);

    if (!list) {
      return res.status(404).json({ message: 'Lista não encontrada.' });
    }
    res.status(200).json(list);

  } catch (error) {
    console.error('Erro em getListById:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

// --- 4. FUNÇÃO PARA DELETAR UMA LISTA ---
export const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedList = await ShoppingList.findByIdAndDelete(id);

    if (!deletedList) {
      return res.status(404).json({ message: 'Lista não encontrada.' });
    }
    res.status(200).json({ message: 'Lista deletada com sucesso.' });

  } catch (error) {
    console.error('Erro em deleteList:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

export const updateList = async (req, res) => {
  try {
    const {id} = req.params;

    const list = await ShoppingList.findById(id);
    if (!list) {
      return res.status(404).json({ message: 'Lista não encontrada.' });
    }

    // Calcula o total somando price * quantity apenas dos itens completed: true
    const total = list.items.reduce((sum, item) => {
      if (item.completed) {
        const itemPrice = parseFloat(item.price.toString());
        return sum + (itemPrice * item.quantity);
      }
      return sum;
    }, 0);

    list.totalPrice = total;
    await list.save();

    res.status(200).json({ 
      message: 'Total atualizado com sucesso',
      totalPrice: total,
      list: list // Retorna a lista atualizada 
    });

  } catch (error) {
    console.error('Erro em updateListTotalPrice:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};



// --- 5. FUNÇÃO PARA MARCAR UM ITEM ---
export const toggleItemCompleted = async (req, res) => {
  try {
    const { listId, itemId } = req.params;

    const list = await ShoppingList.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'Lista não encontrada.' });
    }

    // O seu 'itemId' pode ser uma string simples ou um _id do Mongo.
    // Este código tenta os dois jeitos.
    const item = list.items.find(i => i.id === itemId || i._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado.' });
    }

    item.completed = !item.completed;
    await list.save();

    res.status(200).json(item);

  } catch (error) {
    console.error('Erro em toggleItemCompleted:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};
// ATT ITENS DA LISTA
export const updateItemInList = async (req, res) => {
  try {
    // Precisamos de dois IDs agora: O da Lista e o do Item
    const { listId, itemId } = req.params;
    const updateData = req.body;

    // Validações dos dados recebidos
    if (updateData.name !== undefined && updateData.name.trim() === '') {
      return res.status(400).json({ 
        message: 'O nome do item não pode estar vazio.' 
      });
    }

    if (updateData.quantity !== undefined && (updateData.quantity <= 0 || isNaN(updateData.quantity))) {
      return res.status(400).json({ 
        message: 'A quantidade deve ser um número positivo.' 
      });
    }

    if (updateData.price !== undefined && (updateData.price < 0 || isNaN(updateData.price))) {
      return res.status(400).json({ 
        message: 'O preço deve ser um número não negativo.' 
      });
    }

    // 1. Buscar a Lista Pai pelo ID
    const list = await ShoppingList.findById(listId);

    if (!list) {
      return res.status(404).json({ message: 'Lista de compras não encontrada.' });
    }

    // 2. Buscar o subdocumento (o item) dentro do array 'items'
    const item = list.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado nesta lista.' });
    }

    // 3. Atualizar os dados do item manualmente
    if (updateData.name !== undefined) {
      item.name = updateData.name.trim();
    }
    if (updateData.quantity !== undefined) {
      item.quantity = parseFloat(updateData.quantity);
    }
    if (updateData.unit !== undefined) {
      item.unit = updateData.unit;
    }
    if (updateData.price !== undefined) {
      item.price = parseFloat(updateData.price);
    }

    // 4. CRÍTICO: Marcar o array como modificado para o Mongoose detectar as mudanças
    list.markModified('items');

    // 5. Salvar a Lista Pai
    await list.save();

    // 6. Recarregar o documento para garantir que os dados estão atualizados
    const updatedList = await ShoppingList.findById(listId);
    const updatedItem = updatedList.items.id(itemId);

    // Retorna o item atualizado
    return res.status(200).json(updatedItem);

  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ message: 'Erro ao atualizar o item.' });
  }
};