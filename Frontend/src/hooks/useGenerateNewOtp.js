import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useGenerateNewOtp = () => {
    const { token } = useSelector((e) => e.auth);
    console.log(token);

    const generateNewOtp = async () => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/otp/generate`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (data.status === "success") {
                toast.success(data.message);
            } else if (data.status === "already sent") {
                toast.warning(data.message)
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Error: " + err.message);
        }
    };

    useEffect(() => {
        generateNewOtp();
    }, []);

    return { generateNewOtp };
};

export default useGenerateNewOtp;