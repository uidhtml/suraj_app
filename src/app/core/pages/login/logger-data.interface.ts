export interface LoggerData {
  success: number;
  msg: string;
  results: {
    firstName: string;
    lastName: string;
    username: string;
    image: string;
    country: string;
    state: string;
    city: string;
    address: string;
    pincode: string;
  }[];
  status?: number;
}
