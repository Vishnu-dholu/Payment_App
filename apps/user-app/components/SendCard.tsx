"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useRouter } from "next/navigation";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await p2pTransfer(number, Number(amount) * 100);
      setIsPaymentSuccessful(true);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div className="h-[90vh] -mt-10">
      <Center>
        {isPaymentSuccessful ? (
          <Card
            title={
              <div className="flex justify-center">
                <img src="/accept.png" className="w-8 h-8 mr-2" />
                <span className="text-green-500">Payment Successful</span>
              </div>
            }
          >
            <div className="pt-2 min-w-72 text-center">
              <div className="font-semibold">
                Thank you! Your payment of Rs.{amount} has been received.
              </div>
              <div className="mt-3 underline">Recipient: {number}</div>
            </div>
            <div className="flex justify-center mt-16">
              <button
                onClick={() => {
                  router.push("/transactions");
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                OK
              </button>
            </div>
          </Card>
        ) : (
          <Card title="Send">
            <div className="pt-2 min-w-72">
              <TextInput
                placeholder={"Number"}
                label="Number"
                onChange={(value) => {
                  setNumber(value);
                }}
              />
              <TextInput
                placeholder={"Amount"}
                label="Amount"
                onChange={(value) => {
                  setAmount(value);
                }}
              />
              <div className="flex pt-4 justify-center">
                <Button onClick={handleSubmit}>Send</Button>
              </div>
            </div>
          </Card>
        )}
      </Center>
    </div>
  );
}
