export interface User {
  id?: string;
  phoneNumber?: string;
  lastName?: string;
  lastLogin?: {
    seconds?: number;
    nanoseconds?: number;
  };
  profilePicture?: string;
  blocked?: string[];
  following?: string[];
  blockedBy?: string[];
  followers?: string[];
  username?: string;
  createdAt?: {
    seconds?: number;
    nanoseconds?: number;
  };
  email?: string;
  firstName?: string;
}
