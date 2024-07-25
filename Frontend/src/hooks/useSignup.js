import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useSignup = () => {
    const navigate = useNavigate();
    const signup = async ({ email, password }) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/signup`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "content-type": "application/json",
                },
            });
            console.log(res);
            const data = await res.json();
            console.log(data);
            if (data.status == "success") {
                toast.success("Successfully Registered!")
                navigate(`/login?email=${email}`)
            } else {
                toast.warning(data.message);
            }
        } catch (err) {
            toast.error("Signup error: " + err.message);
        }
    };
    return { signup };
};

export default useSignup;