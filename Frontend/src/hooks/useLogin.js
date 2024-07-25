import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appLogin } from "../store/slices/authSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useLogin = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = async ({ email, password }) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
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
                toast.success("Successfully Logged in");
                // navigate(`/`)
                dispatch(appLogin(data))
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Login error: " + err.message);
        }
    };
    return { login };
};

export default useLogin;