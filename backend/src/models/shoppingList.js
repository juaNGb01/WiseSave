// models/ShoppingList.js
import mongoose from 'mongoose';

// Este é o "molde" de como um item individual se parece
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  unit: { type: String, default: 'un' },
  completed: { type: Boolean, default: false }
  // Você pode adicionar 'price' aqui depois
});

// Este é o "molde" da LISTA DE COMPRAS
const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  items: [itemSchema] // Uma lista de itens que seguem o molde de cima
});

// O Mongoose vai criar a collection chamada 'shoppinglists'
const ShoppingList = mongoose.model('ShoppingList', listSchema);

export default ShoppingList;