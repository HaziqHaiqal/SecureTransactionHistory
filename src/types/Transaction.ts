export type Transaction = {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: 'debit' | 'credit';
  currency: string;
  paymentMethod: string;
  status: string;
};
