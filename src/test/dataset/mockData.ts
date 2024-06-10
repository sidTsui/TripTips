import { mockComments } from './comments';
import { mockMessages } from './messages';
import { mockPosts } from './posts';
import { mockRooms } from './rooms';
import { mockUsers } from './users';

export const generateMockData = () => {
  let mockData = new Map<string, Map<string, any>>();
  mockData.set('comments', mockComments);
  mockData.set('messages', mockMessages);
  mockData.set('posts', mockPosts);
  mockData.set('rooms', mockRooms);
  mockData.set('users', mockUsers);

  return mockData;
};
