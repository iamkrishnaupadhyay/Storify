import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



const useGetFileFolders = () => {
    const [fileFolders, setFileFolders] = useState([]);
    const { token } = useSelector((e) => e.auth);

    const getFileFolders = async (parentId = null) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/file-folder`,
                {
                    method: 'POST',
                    body: JSON.stringify({ parentId }),
                    headers: {
                        "content-type": "application/json",
                        authorization: "Bearer " + token,
                    },
                });
            const data = await res.json();
            console.log(data);
            setFileFolders(data.data.fileFolders);
            console.log(data)

        } catch (error) {
            toast.error(error.message)
        }
    };



    return { getFileFolders, fileFolders };
};

export default useGetFileFolders;