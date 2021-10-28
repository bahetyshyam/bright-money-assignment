interface BillsState {
  activeBills: Bill[];
  billsToPay: Bill[];
}

interface Bill {
  id: string | number;
  description: string;
  category: string;
  amount: number;
  date: string | Date;
}
