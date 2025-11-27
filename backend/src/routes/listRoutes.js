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

const router = express.Router();

// Define a rota principal: /wisesave/lists
router.get('/', getAllLists); 
router.post('/', createList);

// IMPORTANTE: Rotas específicas ANTES das rotas com parâmetros genéricos
router.put('/updateList/:id', updateList);

router.put('/:listId/items/:itemId/update', updateItemInList);
router.put('/:listId/items/:itemId', toggleItemCompleted);

// Rotas genéricas com :id por ÚLTIMO
router.get('/:id', getListById);
router.delete('/:id', deleteList);

export default router;