import React, {useState, useEffect} from "react";
import {storage} from "../firebase/firebase";
import {ref, uploadBytes, getDownloadURL, listAll} from "firebase/storage";
import {v4 as uuidv4} from "uuid";
import "../pagess/DocumentPage.css";

function DocumentPage() {
    const [fileUpload, setFileUpload] = useState(null);
    const [filePreviews, setFilePreviews] = useState([]);
    const [uploading, setUploading] = useState(false);

    const filesListRef = ref(storage, "files/");

    const uploadFile = () => {
        if (!fileUpload || uploading) return;
        setUploading(true);
        const fileRef = ref(storage, `files/${uuidv4()}_${fileUpload.name}`);
        uploadBytes(fileRef, fileUpload)
                    .then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((url) => {
                            setFilePreviews((prevPreviews) => [
                                ...prevPreviews,
                                    {url, type: getFileType(fileUpload.type), name: fileUpload.name},
                                ]);
                                setUploading(false);
                        });
                    })
                    .catch((error) => {
                        console.error("Error uploading file:", error);
                        setUploading(false);
                    });
    };

    const getFileType = (fileType) => {
        if (!fileType) {
            return "other";
        } else if (fileType.startsWith("image/")) {
            return "image";
        } else if (fileType === "application/pdf") {
            return "pdf";
        } else {
            return "other";
        }
    };

    useEffect(() => {
        listAll(filesListRef)
                    .then((res) => {
                        const previewsPromises = res.items.map((itemRef) =>
                            getDownloadURL(itemRef).then((url) => ({
                            url,
                            type: getFileType(itemRef.contentType),
                            name: itemRef.name.split("_")[1],
                            })),
                        );
                        Promise.all(previewsPromises).then((previews) => {
                            setFilePreviews(previews);
                        });
                    })
                    .catch((error) => {
                        console.error("Error listing files:", error);
                    });
    }, [filesListRef]);

    return (
        <>
            <h1 className="heading">Welcome to Document Page</h1>
            <div className="container">
                <div className="docx">
                    <input
                        type="file"
                        onChange={(event) => {
                            setFileUpload(event.target.files[0]);
                        }}
                    />
                    <button onClick={uploadFile} disabled={!fileUpload || uploading}>
                        {uploading ? "Uploading..." : "Upload File"}
                    </button>
                    <div className="file-previews">
                        {filePreviews.map((preview, index) => (
                            <div key={index} className="file-preview">
                                {preview.type === "image" && (
                                    <img src={preview.url} alt={`Preview ${index + 1}`} />
                                )}
                                {preview.type === "pdf" && (
                                    <iframe src={preview.url} title={`PDF ${index + 1}`} />
                                )}
                                {preview.type === "other" && (
                                    <a
                                        href={preview.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {preview.name}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DocumentPage;
