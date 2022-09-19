import React, { useEffect, useState } from "react";

export interface SingleFileProps {
  file: File;
}
const SingleFile = ({ file }: SingleFileProps) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    // custom http req handle, else use axios
    async function upload() {
      const url = await uploadFile(file, setProgress);
      console.log("url", url);
    }
    upload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>SingleFile -- {progress}</div>;
};

export default SingleFile;

function uploadFile(file: File, onProgress: (percentage: number) => void) {
  const url = "https://api.cloudinar.com/v1_1/demo/image/upload"; // this can be diff based on cloud storage
  const key = "docs_upload_example_us_preset";
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    //success
    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp.secure_url); //'url- where cloudinary saved the file'
    };
    //error
    xhr.onerror = (e) => {
      rej(e);
    };
    //progress
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentage = Math.round((e.loaded / e.total) * 100);
        onProgress(percentage);
      }
    };
    //send file
    const formData = new FormData();
    formData.append("file", file);
    //if storage provide a key as cloudinary
    formData.append("key", key);
    xhr.send(formData);
  });
}
