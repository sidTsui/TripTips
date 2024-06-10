import { Room } from '../../app/models/room.interface';

export const mockRooms = new Map<string, Room>([
  [
    'OEK4boZbAedjiGOl9oJx',
    {
      id: 'OEK4boZbAedjiGOl9oJx',
      name: 'test',
      users: [
        {
          id: 'aXvi8Z3ZJkNBAOak89Bhkc0niPv1',
          username: 'test',
          email: 'test@test.com',
        },
        {
          id: 'hHFLwycuYqRnz7UH4qMNRP0fZQT2',
          username: 'johndoe',
          email: 'em1814@uncw.edu',
        },
      ],
    },
  ],
  [
    'mv52L85JNikTOXGbeD0e',
    {
      id: 'mv52L85JNikTOXGbeD0e',
      name: 'hi',
      users: [
        {
          id: 'hHFLwycuYqRnz7UH4qMNRP0fZQT2',
          username: 'johndoe',
          email: 'em1814@uncw.edu',
        },
        {
          id: 'birpxSP18hQ5JeUHh6XJY8woTJw1',
          username: 'cjt8822',
          email: 'cjt8822@uncw.edu',
        },
      ],
    },
  ],
]);
