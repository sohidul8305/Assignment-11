import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("Invalid session");
      setLoading(false);
      return;
    }

    const loadPayment = async () => {
      try {
        const res = await axiosSecure.get(`/payment-details?session_id=${sessionId}`);
        setPayment(res.data);
      } catch {
        setError("Payment info not found");
      } finally {
        setLoading(false);
      }
    };

    loadPayment();
  }, [sessionId]);

  if (loading) return <p>⏳ Verifying payment...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-green-600">Payment Successful 🎉</h2>
      <p><b>Transaction ID:</b> {payment.transactionId}</p>
      <p><b>Email:</b> {payment.customerEmail}</p>
      <p><b>Loan:</b> {payment.loanTitle}</p>
      <p><b>Loan ID:</b> {payment.loanId}</p>
      <p className="text-xl font-bold mt-2">Amount Paid: {payment.amount} BDT</p>
    </div>
  );
};

export default PaymentSuccess;
