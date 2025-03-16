import mongoose from 'mongoose';

const FieldSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'date', 'boolean', 'reference', 'select', 'multi-select', 'url']
  },
  options: [String],
  required: {
    type: Boolean,
    default: false
  },
  value: mongoose.Schema.Types.Mixed
});

const SuperTagSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  icon: String,
  fields: [FieldSchema]
});

const NodeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['note', 'task', 'daily_note', 'collection', 'reference', 'media', 'custom']
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  supertags: {
    type: [SuperTagSchema],
    default: []
  },
  createdAt: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node'
  },
  children: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Node',
    default: []
  },
  references: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Node',
    default: []
  },
  referencedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Node',
    default: []
  },
  properties: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

export default mongoose.model('Node', NodeSchema);
