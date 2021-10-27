interface BillsState {
  bills: Bill[];
  categories: string[];
}

interface Bill {
  id: string | number;
  description: string;
  category: string;
  amount: number;
  date: string | Date;
}
