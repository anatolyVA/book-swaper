import React, { useRef } from "react";
import { Input } from "@/shared/ui/input";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { PlusIcon, UploadIcon, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { className } from "postcss-selector-parser";

interface ImageUploaderProps {
  onChange: (image: File | null) => void;
  value: File | null;
  className?: string;
}

export function ImageUploader({
  onChange,
  value,
  className,
}: ImageUploaderProps) {
  const [image, setImage] = React.useState<File | null>(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0] || null);
    onChange(e.target.files?.[0] || null);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileUploaderRef.current?.click();
  };

  const fileUploaderRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Button
        onClick={handleClick}
        className={cn(
          `p-0 h-full w-full cursor-pointer border-dashed overflow-hidden group transition-opacity`,
          image && "border-none",
          className,
        )}
        variant="outline"
        asChild
      >
        {image ? (
          <div className="relative">
            <Image
              src={image ? URL.createObjectURL(image) : ""}
              alt="Upload"
              className="group-hover:opacity-50 transition-opacity object-contain"
              fill
            />
            <div className="group-hover:opacity-100 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-primary rounded-full opacity-25">
              <UploadIcon className="text-primary-foreground" />
            </div>
          </div>
        ) : (
          <div className="items-center flex flex-col">
            <UploadIcon />
            Upload
          </div>
        )}
      </Button>
      <Input
        accept=".png, .jpg, .jpeg, .webp"
        ref={fileUploaderRef}
        className="hidden"
        id="fileInput"
        type="file"
        onChange={handleChange}
      />
    </>
  );
}
