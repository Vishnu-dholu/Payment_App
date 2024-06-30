import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { P2PTransfer } from "../../../components/P2PTransaction";

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map(
    (t: { startTime: any; amount: any; status: any; provider: any }) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    })
  );
}

async function getP2pTransactions() {
  const session = await getServerSession(authOptions);
  const p2p = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });
  return p2p.map(
    (t: { timestamp: any; amount: any; toUserId: any; fromUserId: any }) => ({
      time: t.timestamp,
      amount: t.amount,
      receiver: t.toUserId,
      sender: t.fromUserId,
    })
  );
}

export default async function () {
  const transactions = await getOnRampTransactions();
  const p2p = await getP2pTransactions();
  return (
    <div className="pt-6 w-full max-h-screen">
      <div className="m-2">
        <h1 className="mb-6 text-3xl text-[#6a51a6] font-bold">Transactions</h1>
        <OnRampTransactions transactions={transactions} />
      </div>
      <div className="mt-6 m-2">
        <h1 className="mb-6 text-3xl text-[#6a51a6] font-bold">
          P2P Transactions
        </h1>
        <P2PTransfer transactions={p2p} />
      </div>
    </div>
  );
}
