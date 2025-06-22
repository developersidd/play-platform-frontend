"use client";
import useAxios from "@/hooks/useAxios";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

const UploadCoverImage = ({ coverImage: coverImg, username }) => {
  const inputRef = useRef();
  const { apiClient } = useAxios();
  const [coverImage, setCoverImage] = useState(coverImg);
  const router = useRouter();
  const handleUpload = () => {
    console.dir(inputRef.current);
    // set change handler for input
    inputRef.current?.addEventListener("change", async (e) => {
      const file = e?.target?.files[0];
      // check the file size is less than 5MB
      if (file.size > 5242880) {
        alert("File size should be less than 5MB");
        return;
      }
      // update image optimistically
      setCoverImage({
        url: URL.createObjectURL(file),
      });
      // upload
      try {
        const formData = new FormData();
        formData.append("coverImage", file);
        await apiClient.patch("/users/cover-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        router.refresh();
        toast.success("Cover image uploaded successfully");
      } catch (error) {
        setCoverImage(coverImg);
        toast.error("Failed to upload cover image");
      }
    });
  };

  return (
    <div className="relative min-h-[150px] w-full pt-[16.28%]">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          width={1000}
          height={700}
          className="object-cover w-full h-full"
          src={coverImage?.url}
          alt={username}
        />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <input
          ref={inputRef}
          type="file"
          accept=".png, .jpg, .jpeg"
          id="cover-image"
          className="hidden"
        />
        <label
          onClick={handleUpload}
          htmlFor="cover-image"
          className="flex items-center justify-center   shadow-md h-10 w-10 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white"
        >
          {/*{uploading ? <Loader className="animate-spin" /> : <ImageUp />}*/}
          <ImageUp />
        </label>
      </div>
    </div>
  );
};

export default UploadCoverImage;
