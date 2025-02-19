"use client";

import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload({
  onUploadSuccess,
}: {
  onUploadSuccess: () => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
    multiple: true,
  });

  // Remove file from list
  const removeFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  // Handle file upload
  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("http://localhost:3001/api/v1/uploads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      alert("Upload successful!");
      onUploadSuccess();
      setFiles([]);
    } catch (error) {
      alert("Upload failed: " + error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded-lg shadow-md">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className="p-6 border-2 border-dashed border-gray-400 rounded-md text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          Drag & drop images here, or click to select files
        </p>
      </div>

      {/* File Table Preview */}
      {files.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Preview</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="border">
                  <td className="p-2 border">
                    <div className="relative w-16 h-16">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  </td>
                  <td className="p-2 border">{file.name}</td>
                  <td className="p-2 border">
                    {(file.size / 1024).toFixed(2)} KB
                  </td>
                  <td className="p-2 border">
                    <button
                      className="text-red-500"
                      onClick={() => removeFile(file.name)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Upload Files
          </button>
        </div>
      )}
    </div>
  );
}
