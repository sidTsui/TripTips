export interface Message {
  id: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
  createdBy: string;
  createdById: string;
  content: string;
  type: 'text';
}
