"use client";
import { PROFILE_UPDATED } from "@/actions/user.acton";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { ImageUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

const UploadAvatar = ({ avatar, username }) => {
  const inputRef = useRef();
  const { dispatch } = useUserContext();

  const { privateApi } = useAxios();
  const [avatarImage, setAvatarImage] = useState(avatar);
  const router = useRouter();
  const handleUpload = () => {
    // set change handler for input
    inputRef.current?.addEventListener("change", async (e) => {
      const file = e?.target?.files[0];
      // check the file size is less than 5MB
      if (file.size > 5242880) {
        alert("File size should be less than 5MB");
        return;
      }
      // update image optimistically
      const url = URL.createObjectURL(file);
      setAvatarImage({
        url,
      });
      dispatch({ type: PROFILE_UPDATED, payload: { avatar: { url } } });
      // upload avatar
      try {
        const formData = new FormData();
        formData.append("avatar", file);
        await privateApi.patch("/api/v1/users/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        router.refresh();
        toast.success("Avatar uploaded successfully");
      } catch (error) {
        setAvatarImage(avatar);
        dispatch({ type: PROFILE_UPDATED, payload: { avatar } });

        toast.error("Failed to upload Avatar");
      }
    });
  };
  return (
    <div className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
      <img src={avatarImage?.url} alt={username} className="h-full w-full" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <input
          ref={inputRef}
          type="file"
          accept=".png, .jpg, .jpeg"
          id="profile-image"
          className="hidden"
        />
        <label
          onClick={handleUpload}
          htmlFor="profile-image"
          className="flex items-center justify-center  h-8 w-8 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white"
        >
          <ImageUp size={21} />
        </label>
      </div>
    </div>
  );
};

export default UploadAvatar;
