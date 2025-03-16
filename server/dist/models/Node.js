"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FieldSchema = new mongoose_1.default.Schema({
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
    value: mongoose_1.default.Schema.Types.Mixed
});
const SuperTagSchema = new mongoose_1.default.Schema({
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
const NodeSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Node'
    },
    children: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Node',
        default: []
    },
    references: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Node',
        default: []
    },
    referencedBy: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Node',
        default: []
    },
    properties: {
        type: mongoose_1.default.Schema.Types.Mixed,
        default: {}
    }
});
exports.default = mongoose_1.default.model('Node', NodeSchema);
//# sourceMappingURL=Node.js.map