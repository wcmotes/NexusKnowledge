export enum NodeType {
  NOTE = 'note',
  TASK = 'task',
  DAILY_NOTE = 'daily_note',
  COLLECTION = 'collection',
  REFERENCE = 'reference',
  MEDIA = 'media',
  CUSTOM = 'custom',
}

export interface Field {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'reference' | 'select' | 'multi-select' | 'url';
  options?: string[];
  required: boolean;
  value?: any;
}

export interface SuperTag {
  id: string;
  name: string;
  icon?: string;
  fields: Field[];
}

export interface Node {
  id: string;
  type: NodeType;
  title: string;
  content: string;
  tags: string[];
  supertags: SuperTag[];
  createdAt: string;
  updatedAt: string;
  parent?: string;
  children: string[];
  references: string[];
  referencedBy: string[];
  properties?: Record<string, any>;
}

export interface DailyNote extends Node {
  date: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  content: string;
  completed: boolean;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}
