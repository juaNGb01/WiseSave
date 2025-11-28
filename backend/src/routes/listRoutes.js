// routes/listRoutes.js
import express from 'express';

import {
  createList, 
  getAllLists,
  getListById,
  deleteList,
  toggleItemCompleted, 
  updateItemInList, 
  updateList
  
} from '../controllers/listController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

//rota principal: /wisesave/lists
router.get('/', authenticateToken,  getAllLists); //retornar todas as listas
router.post('/', createList); //criar lista

//att uma lista 
router.put('/updateList/:id', updateList);

//att item especifico da lista
router.put('/:listId/items/:itemId/update', updateItemInList);
//marcar item como completo
router.put('/:listId/items/:itemId', toggleItemCompleted);

// retornar lista especifica
router.get('/:id', getListById);
//deletar lista
router.delete('/:id', deleteList);

export default router;