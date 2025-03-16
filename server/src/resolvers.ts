import { UserInputError } from 'apollo-server-express';
import User from './models/User';
import Node from './models/Node';
import DailyNote from './models/DailyNote';
import Task from './models/Task';
import { generateToken } from './utils/auth';
import bcrypt from 'bcryptjs';
import mongoose, { Document, Types } from 'mongoose';

// Define interfaces for resolver parameters
interface NodeArgs {
  id: string;
  type?: string;
  title?: string;
  content?: string;
  tags?: string[];
  parent?: string;
}

interface UserArgs {
  id?: string;
  email: string;
  password: string;
  name?: string;
}

interface DailyNoteArgs {
  id?: string;
  date: string;
  content: string;
}

interface TaskArgs {
  id?: string;
  content: string;
  dueDate?: string;
  priority?: number;
  completed?: boolean;
  dailyNoteId?: string;
}

interface Context {
  req: any;
  user?: any;
}

interface CreateNodeArgs {
  title: string;
  content: string;
  type: string;
  tags?: string[];
  parent?: string;
}

interface UpdateNodeArgs {
  id: string;
  title?: string;
  content?: string;
  type?: string;
  tags?: string[];
  parent?: string;
}

interface AddReferenceArgs {
  sourceId: string;
  targetId: string;
}

interface RemoveReferenceArgs {
  sourceId: string;
  targetId: string;
}

interface CreateDailyNoteArgs {
  date: string;
  content: string;
}

interface UpdateDailyNoteArgs {
  id: string;
  content: string;
}

interface CreateTaskArgs {
  content: string;
  dueDate?: string;
  priority?: number;
  dailyNoteId?: string;
}

interface UpdateTaskArgs {
  id: string;
  content?: string;
  dueDate?: string;
  priority?: number;
  completed?: boolean;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface RegisterArgs {
  email: string;
  password: string;
  name: string;
}

interface UpdateUserArgs {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
}

export const resolvers = {
  Query: {
    getNode: async (_: any, { id }: { id: string }) => {
      return await Node.findById(id);
    },
    
    getNodes: async () => {
      return await Node.find({});
    },
    
    getNodesByType: async (_: any, { type }: { type: string }) => {
      return await Node.find({ type });
    },
    
    getDailyNote: async (_: any, { date }: { date: string }) => {
      return await DailyNote.findOne({ date }).populate('tasks');
    },
    
    getDailyNotes: async () => {
      return await DailyNote.find({}).populate('tasks').sort({ date: -1 });
    },
    
    searchNodes: async (_: any, { query }: { query: string }) => {
      return await Node.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
          { tags: { $in: [query] } }
        ]
      });
    },
    
    getCurrentUser: async (_: any, __: any, { user }: Context) => {
      if (!user) {
        throw new UserInputError('Not authenticated');
      }
      return await User.findById(user.id);
    },
  },
  
  Mutation: {
    createNode: async (_: any, args: CreateNodeArgs) => {
      const newNode = new Node({
        ...args,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [],
        references: [],
        referencedBy: []
      });
      await newNode.save();
      
      // Update parent's children array if parent exists
      if (args.parent) {
        await Node.findByIdAndUpdate(
          args.parent,
          { $push: { children: newNode.id } }
        );
      }
      
      return newNode;
    },
    
    updateNode: async (_: any, { id, ...updates }: UpdateNodeArgs) => {
      // First check if the node exists
      const node = await Node.findById(id);
      
      if (!node) {
        throw new UserInputError('Node not found');
      }
      
      // Apply updates
      Object.keys(updates).forEach(key => {
        if (updates[key as keyof typeof updates] !== undefined) {
          (node as any)[key] = updates[key as keyof typeof updates];
        }
      });
      
      node.updatedAt = new Date().toISOString();
      await node.save();
      
      return node;
    },
    
    deleteNode: async (_: any, { id }: { id: string }) => {
      // First check if the node exists
      const node = await Node.findById(id);
      
      if (!node) {
        throw new UserInputError('Node not found');
      }
      
      // Remove this node from any references
      await Node.updateMany(
        { references: id },
        { $pull: { references: id } }
      );
      
      // Remove this node from any referencedBy
      await Node.updateMany(
        { referencedBy: id },
        { $pull: { referencedBy: id } }
      );
      
      await node.deleteOne();
      
      return { id, success: true };
    },
    
    addReference: async (_: any, { sourceId, targetId }: AddReferenceArgs) => {
      // Check if both nodes exist
      const sourceNode = await Node.findById(sourceId);
      const targetNode = await Node.findById(targetId);
      
      if (!sourceNode || !targetNode) {
        throw new UserInputError('One or both nodes not found');
      }
      
      // Add reference
      if (!sourceNode.references.includes(new Types.ObjectId(targetId))) {
        sourceNode.references.push(new Types.ObjectId(targetId));
        await sourceNode.save();
      }
      
      // Add referencedBy
      if (!targetNode.referencedBy.includes(new Types.ObjectId(sourceId))) {
        targetNode.referencedBy.push(new Types.ObjectId(sourceId));
        await targetNode.save();
      }
      
      return { success: true };
    },
    
    removeReference: async (_: any, { sourceId, targetId }: RemoveReferenceArgs) => {
      // Check if both nodes exist
      const sourceNode = await Node.findById(sourceId);
      const targetNode = await Node.findById(targetId);
      
      if (!sourceNode || !targetNode) {
        throw new UserInputError('One or both nodes not found');
      }
      
      // Remove reference
      sourceNode.references = sourceNode.references.filter(
        (ref: mongoose.Types.ObjectId) => ref.toString() !== targetId
      );
      await sourceNode.save();
      
      // Remove referencedBy
      targetNode.referencedBy = targetNode.referencedBy.filter(
        (ref: mongoose.Types.ObjectId) => ref.toString() !== sourceId
      );
      await targetNode.save();
      
      return { success: true };
    },
    
    createDailyNote: async (_: any, { date, content }: CreateDailyNoteArgs) => {
      // Check if a note for this date already exists
      const existingNote = await DailyNote.findOne({ date });
      
      if (existingNote) {
        throw new UserInputError('A note for this date already exists');
      }
      
      const newDailyNote = new DailyNote({
        date,
        content,
        tasks: []
      });
      
      await newDailyNote.save();
      return newDailyNote;
    },
    
    updateDailyNote: async (_: any, { id, content }: UpdateDailyNoteArgs) => {
      const dailyNote = await DailyNote.findById(id);
      if (!dailyNote) throw new UserInputError('Daily note not found');
      
      dailyNote.content = content;
      await dailyNote.save();
      return dailyNote;
    },
    
    createTask: async (_: any, { content, dueDate, priority, dailyNoteId }: CreateTaskArgs) => {
      const newTask = new Task({
        content,
        completed: false,
        dueDate,
        priority: priority || 0,
        createdAt: new Date().toISOString()
      });
      
      await newTask.save();
      
      // If this task is associated with a daily note, add it
      if (dailyNoteId) {
        const dailyNote = await DailyNote.findById(dailyNoteId);
        if (dailyNote) {
          dailyNote.tasks.push(newTask._id);
          await dailyNote.save();
        }
      }
      
      return newTask;
    },
    
    updateTask: async (_: any, updates: UpdateTaskArgs) => {
      const task = await Task.findById(updates.id);
      if (!task) throw new UserInputError('Task not found');
      
      Object.assign(task, updates);
      await task.save();
      return task;
    },
    
    deleteTask: async (_: any, { id }: { id: string }) => {
      // Remove this task from any daily notes
      await DailyNote.updateMany(
        { tasks: id },
        { $pull: { tasks: id } }
      );
      
      await Task.findByIdAndDelete(id);
      return { id, success: true };
    },
    
    login: async (_: any, { email, password }: LoginArgs) => {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new UserInputError('Invalid email or password');
      }
      
      const validPassword = await bcrypt.compare(password, user.password);
      
      if (!validPassword) {
        throw new UserInputError('Invalid email or password');
      }
      
      const token = generateToken(user);
      
      return {
        id: user.id,
        token,
        email: user.email,
        name: user.name
      };
    },
    
    register: async (_: any, { email, password, name }: RegisterArgs) => {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        throw new UserInputError('User with this email already exists');
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Create new user
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        createdAt: new Date().toISOString()
      });
      
      await newUser.save();
      
      const token = generateToken(newUser);
      
      return {
        id: newUser.id,
        token,
        email: newUser.email,
        name: newUser.name
      };
    },
    
    updateUser: async (_: any, updates: UpdateUserArgs, { user }: Context) => {
      if (!user) {
        throw new UserInputError('Not authenticated');
      }
      
      const userToUpdate = await User.findById(user.id);
      if (!userToUpdate) throw new UserInputError('User not found');
      
      // If updating password, hash it
      if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
      }
      
      Object.assign(userToUpdate, updates);
      await userToUpdate.save();
      
      return userToUpdate;
    }
  }
};
