import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import "../../globalStyles.css";
import useCreateFolder from "../hooks/useCreateFolder"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGetFileFolders from '../hooks/useGetFileFolders';
import useUploadFile from '../hooks/useUploadFile';


const HomePage = () => {
    const inputRef = useRef();
    const { createFolder } = useCreateFolder();
    const [newFolder, setNewFolder] = useState("");
    const [showCreateFolder, setShowCreateFolder] = useState(false);
    const [showUploadFile, setShowUploadFile] = useState(false);
    const [file, setFile] = useState(null);



    const { getFileFolders, fileFolders } = useGetFileFolders();
    const [folderStructure, setFolderStructure] = useState([{ _id: null }]);
    const parentFolder = folderStructure[folderStructure.length - 1];
    console.log(parentFolder)


    const handleDoubleClick = (elem) => {
        console.log("element link----->", elem.link)
        if (elem.type == "folder") {
            setFolderStructure([...folderStructure, elem]);
        } else {
            window.open(elem.link);
        }
    };

    const handleAllowCreateFolder = () => {
        setShowCreateFolder(true);
    };

    const handleAllowUploadFile = () => {
        setShowUploadFile(true);
    };


    const handleCreateFolder = async () => {
        if (newFolder.length > 0) {
            await createFolder(
                { name: newFolder, parentId: parentFolder._id });
        }
        else {
            toast.error("Name of a Folder can't be Empty")
        }
        getFileFolders(parentFolder._id);
        setShowCreateFolder(false);
    };

    const handleUploadFile = () => {
        setShowUploadFile(false);
        getFileFolders(parentFolder._id);

    };

    const handleCancel = () => {
        setShowCreateFolder(false);
    };

    useEffect(() => {
        getFileFolders(parentFolder._id);
    }, [folderStructure]);

    const handleBackClick = (clickIdx) => {
        const newFolderStructure = folderStructure.filter((elem, idx) => idx <= clickIdx);
        setFolderStructure(newFolderStructure);
    }

    const { uploadFile, isUploadAllowed } = useUploadFile();
    const handleFileUpload = async (e) => {
        if (isUploadAllowed) {
            const file = e.target.files[0];
            await uploadFile({
                file, parentId: parentFolder._id,
            });
            getFileFolders(parentFolder._id)
        } else {
            toast.warning("Uploading is already in progress. Please wait...");
        }

    }

    const getFileClass = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
                return 'image-file'; // Image icon
            case 'mp3':
            case 'wav':
                return 'music-file'; // Music icon
            case 'mp4':
            case 'avi':
                return 'video-file'; // Video icon
            default:
                return 'default-file'; // Default file icon
        }
    };



    return (
        <>
            <Navbar />
            <div className="home-page-container">
                <div className="home-content">
                    <div className="sidebar">
                        <button className="new-btn" onClick={handleAllowCreateFolder}>
                            <i className="fa fa-plus"></i> New Folder
                        </button>
                        <button className="new-btn" onClick={handleAllowUploadFile}>
                            <i className="fa fa-plus"></i>Upload File
                        </button>
                        <button className="sidebar-option">Storage</button>
                        <button className="sidebar-option">Recent</button>
                        <button className="sidebar-option">Starred</button>
                        <button className="sidebar-option">Spam</button>
                        {/* <button className="sidebar-option">Option 5</button>
                        <button className="sidebar-option">Option 6</button>
                        <button className="sidebar-option">Option 7</button>
                        <button className="sidebar-option">Option 8</button>
                        <button className="sidebar-option">Option 9</button>
                        <button className="sidebar-option">Option 10</button>
                        <button className="sidebar-option">Option 11</button> */}
                    </div>
                    <div className="main-content">
                        <h1>Welcome to Storify</h1>
                        <input type="text" placeholder="Search..." className="search-bar" />

                        <div className='path-shower'>
                            <ul>
                                {folderStructure.flatMap((elem, idx) => {
                                    return <li onClick={() => handleBackClick(idx)}> {elem.name}</li>;
                                })}
                            </ul>
                        </div>

                        <div className='show-folder-files'>
                            {Array.isArray(fileFolders) && fileFolders.length > 0 ? (
                                fileFolders.map((elem) => {
                                    const itemClass = elem.type === 'file' ? getFileClass(elem.name) : 'folder';
                                    return (
                                        <div
                                            key={elem.name}
                                            className={`folder-file-item ${itemClass}`}
                                            onDoubleClick={() => handleDoubleClick(elem)}
                                        >
                                            <p>{elem.name}</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <h2>No files or folders found.</h2>
                            )}
                        </div>

                    </div>
                </div>
                {showCreateFolder && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <h2>Create New Folder</h2>
                            <input
                                type="text"
                                value={newFolder}
                                onChange={(e) => setNewFolder(e.target.value)}
                                placeholder="Enter folder name"
                            />
                            <div className="popup-buttons">
                                <button onClick={handleCreateFolder}>Create</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>

                )}
                <div>
                    {showUploadFile && (
                        <div className="popup-overlay">
                            <div className="popup">
                                <h2>Upload File</h2>
                                <input
                                    className="file-upload-input"
                                    type="file"
                                    onChange={handleFileUpload}
                                />
                                <div className="popup-buttons">
                                    <button onClick={handleUploadFile}>Upload</button>
                                    <button onClick={() => setShowUploadFile(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


            </div>
            {/* <Footer /> */}
            <ToastContainer />
        </>
    );
};

export default HomePage; 
