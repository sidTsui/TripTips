import { User } from '../../app/models/user.interface';

export const mockUsers = new Map<string, User>([
  [
    'MRogfqrsRjhFkXsCA8TkCfLLDXp1',
    {
      id: 'MRogfqrsRjhFkXsCA8TkCfLLDXp1',
      phoneNumber: '1111111111',
      lastName: 'A',
      lastLogin: {
        seconds: 1712283262,
        nanoseconds: 396000000,
      },
      profilePicture: 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg',
      blocked: [],
      following: ['hHFLwycuYqRnz7UH4qMNRP0fZQT2', 'BwqegXpjgbQhHsXuTBWE8HQafcr2', 'aXvi8Z3ZJkNBAOak89Bhkc0niPv1'],
      blockedBy: ['BwqegXpjgbQhHsXuTBWE8HQafcr2', 'birpxSP18hQ5JeUHh6XJY8woTJw1'],
      followers: ['hHFLwycuYqRnz7UH4qMNRP0fZQT2', 'aXvi8Z3ZJkNBAOak89Bhkc0niPv1'],
      username: 'atestuser',
      createdAt: {
        seconds: 1712283257,
        nanoseconds: 450000000,
      },
      email: 'atest@test.com',
      firstName: 'A',
    },
  ],
  [
    'birpxSP18hQ5JeUHh6XJY8woTJw1',
    {
      id: 'birpxSP18hQ5JeUHh6XJY8woTJw1',
      phoneNumber: '9996786789',
      blockedBy: [],
      profilePicture: 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg',
      lastLogin: {
        seconds: 1712682401,
        nanoseconds: 303000000,
      },
      lastName: 'Tubbs',
      username: 'cjt8822',
      createdAt: {
        seconds: 1712506156,
        nanoseconds: 384000000,
      },
      email: 'cjt8822@uncw.edu',
      firstName: 'Caleb',
      following: ['hHFLwycuYqRnz7UH4qMNRP0fZQT2', 'aXvi8Z3ZJkNBAOak89Bhkc0niPv1'],
      blocked: ['hHFLwycuYqRnz7UH4qMNRP0fZQT2', 'Wmou7i8Vh6hCiNZ6Hdir6CyXf2L2', 'MRogfqrsRjhFkXsCA8TkCfLLDXp1'],
      followers: [],
    },
  ],
  [
    'BwqegXpjgbQhHsXuTBWE8HQafcr2',
    {
      id: 'BwqegXpjgbQhHsXuTBWE8HQafcr2',
      firstName: 'Kristin',
      lastName: 'Painter',
      profilePicture: 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg',
      phoneNumber: '9103820988',
      followers: ['MRogfqrsRjhFkXsCA8TkCfLLDXp1', 'aXvi8Z3ZJkNBAOak89Bhkc0niPv1', 'hHFLwycuYqRnz7UH4qMNRP0fZQT2'],
      lastLogin: {
        seconds: 1712584720,
        nanoseconds: 2000000,
      },
      following: [],
      email: 'kpainter2@gmail.com',
      createdAt: {
        seconds: 1712252048,
        nanoseconds: 53000000,
      },
      blocked: ['MRogfqrsRjhFkXsCA8TkCfLLDXp1', 'aXvi8Z3ZJkNBAOak89Bhkc0niPv1'],
      username: 'kp123',
    },
  ],
  [
    'Wmou7i8Vh6hCiNZ6Hdir6CyXf2L2',
    {
      id: 'Wmou7i8Vh6hCiNZ6Hdir6CyXf2L2',
      blockedBy: ['birpxSP18hQ5JeUHh6XJY8woTJw1'],
      profilePicture: 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg',
      username: 'sidTsui',
      firstName: 'sid',
      lastName: 'Tsui',
      lastLogin: {
        seconds: 1712590361,
        nanoseconds: 296000000,
      },
      createdAt: {
        seconds: 1712590333,
        nanoseconds: 434000000,
      },
      followers: ['aXvi8Z3ZJkNBAOak89Bhkc0niPv1'],
      phoneNumber: '9176286976',
      email: 'smt4601@uncw.edu',
    },
  ],
  [
    'aXvi8Z3ZJkNBAOak89Bhkc0niPv1',
    {
      id: 'aXvi8Z3ZJkNBAOak89Bhkc0niPv1',
      profilePicture:
        'https://firebasestorage.googleapis.com/v0/b/csc450-sp24-project-team-3.appspot.com/o/profile_images%2F1711564375131_Pug%201%20year%20cropped.jpg?alt=media&token=0db16e1a-0da7-4f97-8859-da63fbc411bc',
      createdAt: {
        seconds: 1710439217,
        nanoseconds: 505000000,
      },
      lastName: 'user',
      phoneNumber: '1111111111',
      firstName: 'test',
      lastLogin: {
        seconds: 1712682381,
        nanoseconds: 196000000,
      },
      followers: ['hHFLwycuYqRnz7UH4qMNRP0fZQT2', 'MRogfqrsRjhFkXsCA8TkCfLLDXp1', 'birpxSP18hQ5JeUHh6XJY8woTJw1'],
      blockedBy: ['BwqegXpjgbQhHsXuTBWE8HQafcr2'],
      blocked: ['hHFLwycuYqRnz7UH4qMNRP0fZQT2'],
      email: 'test@test.com',
      following: [
        'BwqegXpjgbQhHsXuTBWE8HQafcr2',
        'Wmou7i8Vh6hCiNZ6Hdir6CyXf2L2',
        'MRogfqrsRjhFkXsCA8TkCfLLDXp1',
        'hHFLwycuYqRnz7UH4qMNRP0fZQT2',
      ],
      username: 'test',
    },
  ],
]);
