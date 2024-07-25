import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { appLogout, emailVerified } from "../store/slices/authSlice.js"

const useVerifyOtp = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((e) => e.auth);
    const verifyOtp = async (otp) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/otp/verify`, {
                method: "POST",
                body: JSON.stringify({ otp }),
                headers: {
                    "content-type": "application/json",
                    authorization: "Bearer " + token,
                },
            });
            const data = await res.json();
            if (data.status === "success") {
                toast.success(data.message);
                dispatch(emailVerified(data));
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
        }
    };
    return { verifyOtp };
}

export default useVerifyOtp;