import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <div>
      <Card title="Recent Transactions">
        <div className="pt-6 w-full max-h-96 overflow-y-auto">
          {transactions.map((t, index) => (
            <div
              key={index}
              className="flex flex-col justify-between py-2 border-b border-gray-200"
            >
              <div className="flex items-center">
                <div className="text-sm">Received INR</div>
                <div className="text-slate-600 text-xs ml-2">
                  {t.time.toDateString()}
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-lg font-semibold text-green-500">
                  + Rs {t.amount / 100}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
