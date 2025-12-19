import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const loanId = searchParams.get("loanId");

  useEffect(() => {
    if (loanId) {
      axios
        .get(`http://localhost:4000/payment-info/${loanId}`)
        .then((res) => {
          setPaymentInfo(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [loanId]);

  if (loading) return <p>Loading payment info...</p>;
  if (!paymentInfo) return <p>No payment info found.</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful ✅</h1>
      <p>Thank you for your payment. Your loan fee has been updated.</p>

      <div style={{ marginTop: "30px", textAlign: "left", display: "inline-block" }}>
        <p><strong>Transaction ID:</strong> {paymentInfo.transactionId}</p>
        <p><strong>Email:</strong> {paymentInfo.email}</p>
        <p><strong>Loan Title:</strong> {paymentInfo.loanTitle}</p>
        <p><strong>Amount:</strong> ${paymentInfo.amount}</p>
        <p><strong>Date:</strong> {new Date(paymentInfo.date).toLocaleString()}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
