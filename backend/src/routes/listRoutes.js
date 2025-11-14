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

// Define a rota principal: /api/lists
router.route('/')
  .get(getAllLists)
  .post(createList); // <--- E AQUI TAMBÉM

// Define a rota para um ID específico: /api/lists/:id
router.route('/:id')
  .get(getListById)
  .delete(deleteList);

// Define a rota para ATUALIZAR um item específico: /api/lists/:listId/items/:itemId
router.route('/:listId/items/:itemId')
  .put(toggleItemCompleted);

// Exporta o roteador para o app principal usar
export default router;