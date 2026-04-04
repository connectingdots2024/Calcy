export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'accountant' | 'employee' | 'viewer';
  companyId?: string;
}

export interface Organization {
  id: string;
  name: string;
  ownerId: string;
  subscriptionPlan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
  companyId: string;
  receiptUrl?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  items: InvoiceItem[];
  companyId: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  salary: number;
  companyId: string;
}
