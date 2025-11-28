import mongoose from 'mongoose';

// schema itens da lista
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  unit: { type: String, default: 'un' },
  completed: { type: Boolean, default: false },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0,
    get: (v) => parseFloat(v.toString())
  },
});

itemSchema.set('toJSON', { getters: true });

//schema para lista
const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        // required: true,
        index: true
    },
  createdAt: { type: Date, default: Date.now },
  items: [itemSchema], 
  totalPrice: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0,
    get: (v) => parseFloat(v.toString())
  },
});

listSchema.set('toJSON', { getters: true });

const ShoppingList = mongoose.model('ShoppingList', listSchema);

export default ShoppingList;