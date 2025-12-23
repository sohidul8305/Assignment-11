import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    const fetchPayment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/payment-details?session_id=${sessionId}`
        );
        setPayment(res.data);
      } catch (err) {
        console.error("Payment fetch error:", err.response?.data || err.message);
        setError("Payment info not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [sessionId]);

  if (loading) return <p>⏳ Payment processing...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "green" }}>Payment Successful 🎉</h2>
      <p><b>Transaction ID:</b> {payment.transactionId}</p>
      <p><b>Loan Title:</b> {payment.loanTitle}</p>
      <p><b>Email:</b> {payment.email}</p>
      <p><b>Status:</b> {payment.status}</p>
      <p><b>Amount Paid:</b> {payment.amount} {payment.currency}</p>
      <button
        style={{ marginTop: "15px", padding: "8px 15px", background: "blue", color: "white", borderRadius: "5px" }}
        onClick={() => navigate("/dashboard/my-loans")}
      >
        Go to My Loans
      </button>
    </div>
  );
};

export default PaymentSuccess;
