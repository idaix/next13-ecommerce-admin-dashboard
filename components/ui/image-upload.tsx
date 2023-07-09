"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, TrashIcon } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  values: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  disabled?: boolean;
}

const UploadImage: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  values,
  disabled,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {values.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] overflow-hidden rounded-md"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => onRemove(url)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
            <Image
              fill
              src={url}
              alt="Uploaded image"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="hthl3eff">
        {({ open }) => {
          const onClick = () => {
            // e.preventDefault();
            open();
          };
          return (
            <Button
              onClick={onClick}
              variant="secondary"
              type="button"
              disabled={disabled}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImage;
