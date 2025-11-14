import ShoppingList from '../models/ShoppingList.js';
import mongoose from 'mongoose';

// --- 1. FUNÇÃO PARA CRIAR UMA NOVA LISTA ---
export const createList = async (req, res) => {
  try {
    const { name, items } = req.body;

    const newList = new ShoppingList({
      name: name,
      items: items
    });

    await newList.save();
    res.status(201).json(newList);

  } catch (error) {
    console.error('Erro em createList:', error);
    res.status(500).json({ message: 'Erro ao criar a lista.' });
  }
};

// --- 2. FUNÇÃO PARA BUSCAR TODAS AS LISTAS ---
export const getAllLists = async (req, res) => {
  try {
    const lists = await ShoppingList.find();
    res.status(200).json(lists);

  } catch (error) {
    console.error('Erro em getAllLists:', error);
    res.status(500).json({ message: `Erro ao buscar as listas: ${error}` });
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

// --- 5. FUNÇÃO PARA "TICAR" UM ITEM ---
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