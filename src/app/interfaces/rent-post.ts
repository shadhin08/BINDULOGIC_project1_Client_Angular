export interface RentPost {
  id?: string;
  heading: string;
  description: string;
  rent: number;
  bed: number;
  bath: number;
  size: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  userUsername?: string;
  rentAreaName: string;
}
