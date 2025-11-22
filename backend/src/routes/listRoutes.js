// routes/listRoutes.js
import express from 'express';

import {
  createList, 
  getAllLists,
  getListById,
  deleteList,
  toggleItemCompleted, 
  updateItemInList
  
} from '../controllers/listController.js';

const router = express.Router();


// Define a rota principal: /wisesave/lists
router.get('/', getAllLists); 
router.post('/', createList);

// Define a rota para um ID específico: /wisesave/lists/:id
router.get('/:id', getListById);
router.delete('/:id', deleteList);


router.put('/:listId/items/:itemId/update',  updateItemInList)
// O método PUT é geralmente usado para atualizar ou substituir um recurso.
router.put('/:listId/items/:itemId', toggleItemCompleted);


// Exporta o roteador para o app principal usar
export default router;