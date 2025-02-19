"use client";

import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { deleteImage, getImages } from "../services/imagesApi";
import FileUpload from "./upload";

const ImageGallery = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const data = await getImages();
    setImages(data);
  };

  const handleDelete = async (name: string) => {
    await deleteImage(name);
    fetchImages();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>

      {/* Upload Section */}
      <div className="flex gap-2 mb-4">
        <FileUpload onUploadSuccess={fetchImages} />
      </div>

      {/* Image List */}
      <div className="grid grid-cols-3 gap-4">
        {images &&
          images.map((img) => (
            <Card key={img}>
              <CardBody className="flex flex-col items-center">
                <Image
                  src={`http://localhost:3001/api/v1/images/${img}`}
                  alt={img}
                  width={200}
                  height={150}
                  className="object-cover"
                />
                <p className="text-center mt-2">{img}</p>
                <Button
                  color="danger"
                  onClick={() => handleDelete(img)}
                  className="mt-2"
                >
                  Delete
                </Button>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ImageGallery;
