interface RoomUser {
  id: string;
  username: string;
  email: string;
}

// Define the Room interface
export interface Room {
  id: string;
  name: string;
  users: RoomUser[];
}
