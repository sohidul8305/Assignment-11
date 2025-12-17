import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";

const PaymentSuccess = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) queryClient.invalidateQueries(["my-loans", user.email]);
    Swal.fire("Payment Successful!", "Your fee has been paid.", "success").then(() => {
      navigate("/myloans");
    });
  }, [user, queryClient, navigate]);

  return <p className="text-center mt-10">Processing payment...</p>;
};

export default PaymentSuccess;
