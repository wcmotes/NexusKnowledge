import mongoose from 'mongoose';

const DailyNoteSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    default: ''
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }]
});

export default mongoose.model('DailyNote', DailyNoteSchema);
