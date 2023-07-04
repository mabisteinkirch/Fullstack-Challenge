export interface Category {
  id: number;
  description: string;
  status: number;
  createdDate: string;
  updatedDate: string;
}

export interface Employee {
  id: number;
  name: string;
  phone: number;
  email: string;
  id_category: number;
  status: number;
  createdDate: string;
  updatedDate: string;
  label_category: string;
}
