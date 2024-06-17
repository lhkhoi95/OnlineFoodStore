"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";

export default function CheckOutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;
      setIsLoading(true);
      const { data } = await axios.post("/api/checkout", {
        data: { amount: 89 },
      });
      const clientSecret = data;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to confirm card payment");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <CardElement />
      {isLoading ? <p>Loading...</p> : <button type="submit">Submit</button>}
    </form>
  );
}
