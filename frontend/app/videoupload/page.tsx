'use client'

import axios from "axios";
import { ChangeEvent, useState } from "react"

export default function Videoupload() {
   
  const [videourl, setVideoUrl] = useState<string | null>(null)

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
   const file= event.target.files?.[0];

   if(!file){
    console.error("No file is selected");
    return;
   }

   console.log(file);
   try {
    const formData= new FormData();  // we can send the data in the form directly in the key:value pair
    formData.append("video", file); //  we append the data where video is the key which we used in videoRouter backend with file as data

    const response= await axios.post('http://localhost:3001/api/v1/videos/upload' , formData, {
      headers: {
        'Content-Type': 'multipart/form-data'  // Multipart upload is a method for uploading large files by splitting them into smaller, independent parts that can be uploaded in parallel
      }
    });
    console.log(response.data);
   } catch (error) {
    console.log("something went wrong while uploading ", error);

   }
  }
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-4"
    >
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1>Upload your video here</h1>
        
        <input
          type="file"
          onChange={(e)=>{}}
          className="block w-full text-sm text-gray-700 rounded-lg border border-gray-300 p-2 mt-2 cursor-pointer bg-gray-500 mb-4"
        />
      </div>
    </div>
  )
}