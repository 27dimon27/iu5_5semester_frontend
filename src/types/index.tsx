export interface SoftwareService {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  status: boolean;
}

export interface CartItem {
  softwareService: SoftwareService;
  count: number;
  grade: string;
  sum: number;
}

export interface BidIcon {
  bidID: number,
  count: number,
}

export interface Bid {
  id: number;
  company: string;
  services: CartItem[];
  sum: number;
}