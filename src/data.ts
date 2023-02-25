interface Report {
  id: string;
  type: ReportType;
  source: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

type Data = {
  report: Report[];
};

export const data: Data = {
  report: [],
};
