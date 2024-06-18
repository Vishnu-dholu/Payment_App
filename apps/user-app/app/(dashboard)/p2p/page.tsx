import { SendCard } from "../../../components/SendCard";

export default function () {
  return (
    <div className="w-full">
      <div className="flex justify-center text-2xl font-semibold text-[#6a51a6] mt-2 mb-6">
        P2P Transfer
      </div>
      <SendCard />
    </div>
  );
}
