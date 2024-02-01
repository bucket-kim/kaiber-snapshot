"use client";

import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebasApp from "@/firebase";

const Upload = () => {
  const [video, setVideo] = useState(null);
  const [videoPrecent, setVideoPrecent] = useState<number>(0);
  const [inputs, setInputs] = useState<object>({});

  const uploadFile = (file: any, fileType: string) => {
    const storage = getStorage(firebasApp);
    const folder = fileType === "vidoeUrl" ? "video/" : null;
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        fileType === "videoUrl" ? setVideoPrecent(Math.round(progress)) : null;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
        switch (error.code) {
          case "storage/unauthorized":
            console.log(error);
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("DownloadURL - ", downloadURL);
          setInputs((prev) => {
            return {
              ...prev,
              [fileType]: downloadURL,
            };
          });
        });
      }
    );
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/videos", { ...inputs });
    } catch (error) {
      console.log(error);
    }
    console.log("submit");
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="video-upload">
          <label htmlFor="video">Video: </label>
          {videoPrecent > 0 && `Uploading: ${videoPrecent}%`}
          <br />
          <input
            type="file"
            accept="video/*"
            id="video"
            onChange={(e: any) => setVideo((prev) => e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
