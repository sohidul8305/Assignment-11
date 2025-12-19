import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("Invalid payment session");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:4000/payment-details?session_id=${sessionId}`)
      .then(res => {
        setPayment(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Payment info not found");
        setLoading(false);
      });
  }, [sessionId]);

  if (loading) return <p>⏳ Payment processing...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;
  if (!payment) return <p>❌ Payment info not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "green" }}>Payment Successful 🎉</h2>

      <p><b>Transaction ID:</b> {payment.transactionId}</p>
      <p><b>Tracking ID:</b> {payment.trackingId}</p>
      <p><b>Loan Title:</b> {payment.loanTitle}</p>
      <p><b>Email:</b> {payment.email}</p>
      <p><b>Status:</b> {payment.status}</p>
      <p>
        <b>Amount Paid:</b> {payment.amount} {payment.currency?.toUpperCase()}
      </p>

      <p style={{ marginTop: "10px" }}>
        Thank you for your payment ❤️
      </p>
    </div>
  );
};

export default PaymentSuccess;
