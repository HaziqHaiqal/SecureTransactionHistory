export type Transaction = {
  id: string;
  amount: number;
  amountMasked: string;
  date: string;
  description: string;
  type: 'debit' | 'credit';
  currency: string;
  paymentMethod: string;
  status: string;
  merchant: string;
  location: string;
  notes: string;
};
