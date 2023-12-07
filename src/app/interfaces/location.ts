import { RentPost } from './rent-post';

export interface City {
  id?: string;
  area: string;
  rentPosts?: RentPost[];
}
