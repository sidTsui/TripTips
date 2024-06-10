// Define the nested Geometry interface
interface Geometry {
  type?: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
}
interface Properties {
  message?: string;
}
export interface Post {
  id?: string;
  comment?: string;
  rating?: number;
  likes?: string[];
  type?: string;
  lastModifiedDate?: {
    seconds?: number;
    nanoseconds?: number;
  };
  createdBy?: string;
  createdAt?: any;
  geometry?: Geometry;
  properties?: Properties;
  image?: string | null;
}
