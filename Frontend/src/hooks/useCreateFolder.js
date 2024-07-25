import { useSelector } from "react-redux"
import { toast } from "react-toastify";

const useCreateFolder = () => {
    const { token } = useSelector((e) => e.auth)
    const createFolder = async ({ name, parentId }) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/folder/create`, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    parentId,
                }),
                headers: {
                    "content-type": "application/json",
                    authorization: "Bearer " + token,
                },
            });
            const data = await res.json();
            if (data.status == "success") {
                toast.success(data.message)
            }
            else if (data.status == "File Already Created") {
                toast.info(data.message);
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error);
        }
    };
    return { createFolder };
};

export default useCreateFolder;