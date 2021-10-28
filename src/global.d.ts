interface BillsState {
  activeBills: Bill[];
  billsToPay: Bill[];
  budget: number;
}

interface Bill {
  id: string | number;
  description: string;
  category: string;
  amount: number;
  date: string | Date;
}
