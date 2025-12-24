import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) return;

    const confirmPayment = async () => {
      try {
        await axios.post("http://localhost:4000/confirm-payment", { sessionId });

        // ✅ payment confirm → redirect
        navigate("/dashboard/my-loans");
      } catch (err) {
        console.error("Payment confirm failed:", err);
      }
    };

    confirmPayment();
  }, [sessionId, navigate]);

  return (
    <div className="p-10 text-center">
      <h2 className="text-green-600 text-2xl font-bold">Payment Successful 🎉</h2>
      <p>Updating loan status...</p>
    </div>
  );
};

export default PaymentSuccess;
