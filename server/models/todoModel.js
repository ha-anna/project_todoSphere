import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Todo = mongoose.model('Todo', todoSchema);
export { Todo };
