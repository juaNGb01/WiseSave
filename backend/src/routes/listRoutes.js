// routes/listRoutes.js
import express from 'express';

// Importa TODAS as funções da "cozinha"
// Preste atenção nas maiúsculas: 'createList'
import {
  createList, // <--- O 'L' AQUI É MAIÚSCULO
  getAllLists,
  getListById,
  deleteList,
  toggleItemCompleted
} from '../controllers/listController.js';

// Cria o roteador
const router = express.Router();


// Define a rota principal: /wisesave/lists
router.get('/', getAllLists); 
router.post('/', createList);

// Define a rota para um ID específico: /wisesave/lists/:id
router.get('/:id', getListById);
router.delete('/:id', deleteList);

// Define a rota para ATUALIZAR um item específico: /wisesave/lists/:listId/items/:itemId
// O método PUT é geralmente usado para atualizar ou substituir um recurso.
router.put('/:listId/items/:itemId', toggleItemCompleted);

// Exporta o roteador para o app principal usar
export default router;