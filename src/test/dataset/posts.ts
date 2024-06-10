import { Post } from '../../app/models/post.interface';

// Create and export a Map of Post objects
export const mockPosts = new Map<string, Post>([
  [
    'czhCG2zORH3sSCHUtWcG',
    {
      id: 'czhCG2zORH3sSCHUtWcG',
      comment: 'njnkj',
      rating: 4.5,
      likes: ['hHFLwycuYqRnz7UH4qMNRP0fZQT2'],
      type: 'Feature',
      lastModifiedDate: {
        seconds: 1712682762,
        nanoseconds: 455000000,
      },
      createdBy: 'hHFLwycuYqRnz7UH4qMNRP0fZQT2',
      createdAt: {
        seconds: 1712682762,
        nanoseconds: 455000000,
        toDate() {
          return new Date(this.seconds * 1000 + this.nanoseconds / 1000000);
        },
      },
      geometry: {
        type: 'Point',
        coordinates: {
          lat: 18.896691899047582,
          lng: 7.8246000000030165,
        },
      },
      properties: {
        message: '',
      },
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/',
    },
  ],
  [
    'NY1u96wI8whluGg89ye5',
    {
      id: 'NY1u96wI8whluGg89ye5',
      lastModifiedDate: {
        seconds: 1712680616,
        nanoseconds: 616000000,
      },
      createdAt: {
        seconds: 1712680616,
        nanoseconds: 616000000,
        toDate() {
          return new Date(this.seconds * 1000 + this.nanoseconds / 1000000);
        },
      },
      properties: {
        message: '',
      },
      geometry: {
        type: 'Point',
        coordinates: {
          lng: -93.07383750000055,
          lat: 38.480056063804795,
        },
      },
      rating: 4.5,
      createdBy: 'hHFLwycuYqRnz7UH4qMNRP0fZQT2',
      likes: [],
      comment: 'Testing',
      type: 'Feature',
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/',
    },
  ],
  [
    'GdrZHBVeB6XE932di9UD',
    {
      id: 'GdrZHBVeB6XE932di9UD',
      image: '',
      createdAt: {
        seconds: 1712250199,
        nanoseconds: 347000000,
        toDate() {
          return new Date(this.seconds * 1000 + this.nanoseconds / 1000000);
        },
      },
      likes: ['aXvi8Z3ZJkNBAOak89Bhkc0niPv1', 'hHFLwycuYqRnz7UH4qMNRP0fZQT2'],
      properties: {
        message: '',
      },
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: {
          lng: 136.848037500001,
          lat: -25.243931765861234,
        },
      },
      comment: 'testing',
      rating: 4.5,
      createdBy: 'hHFLwycuYqRnz7UH4qMNRP0fZQT2',
      lastModifiedDate: {
        seconds: 1712250199,
        nanoseconds: 347000000,
      },
    },
  ],
]);
