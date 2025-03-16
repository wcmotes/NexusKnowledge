import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: String
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high']
  }
});

export default mongoose.model('Task', TaskSchema);
