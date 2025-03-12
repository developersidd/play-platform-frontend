"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import UploadVideoProgressModal from "./UploadVideoProgressModal";

const MAX_THUMBNAIL_FILE_SIZE = 5242880; // 5MB
const MAX_VIDEO_FILE_SIZE = 52428800; // 50MB
function checkFileType(file, format) {
  if (file?.name) {
    const fileType = file?.name?.split(".")?.pop();
    const allowedTypes =
      format === "image" ? ["png", "jpg", "jpeg", "webp"] : ["mp3", "mp4"];
    if (allowedTypes.includes(fileType)) return true;
  }
  return false;
}
const formSchema = z.object({
  videoFile: z
    .any()
    .refine((file) => file, "Video File is required")
    .refine((file) => file?.size < MAX_VIDEO_FILE_SIZE, "Max size is 50MB.")
    .refine(
      (file) => checkFileType(file, "video"),
      "Only .mp3, .mp4 formats are supported."
    ),
  thumbnail: z
    .any()
    .refine((file) => file, "Thumbnail is required")
    .refine((file) => file?.size < MAX_THUMBNAIL_FILE_SIZE, "Max size is 5MB.")
    .refine(
      (file) => checkFileType(file, "image"),
      "Only .png, .jpg, .jpeg formats are supported."
    ),
  title: z
    .string()
    .min(10, {
      message: "Title must be at least 10 characters long",
    })
    .max(100, {
      message: "Title must be at most 100 characters long",
    }),
  description: z
    .string()
    .min(20, {
      message: "Description must be at least 20 characters long",
    })
    .max(500, {
      message: "Description must be at most 500 characters long",
    }),
});

const UploadVideoModal = ({ children }) => {
  const router = useRouter();
  const abortControllerRef = useRef(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [videoFile, setVideoFile] = useState({});
  const [dragging, setDragging] = useState(false);
  const { apiClient } = useAxios();
  const {
    state: { _id },
  } = useUserContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      videoFile: undefined,
      thumbnail: undefined,
    },
  });
  const { reset, setValue } = form;
  const { isSubmitting } = form.formState;
  async function onSubmit(data) {
    if (!_id) {
      return toast.error("You must be logged in to upload videos!");
    }
    const controller = new AbortController();
    //setController(controller);
    abortControllerRef.current = controller;
    setUploading(true);
    setShowUploadModal(false);
    setShowProgressModal(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await apiClient.post("/videos", formData, {
        signal: controller.signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response:", response.data);
      //router.push(`/${username}`);
      if (response.status === 201) {
        router.refresh();
        toast.success("Video uploaded successfully!");
      }
    } catch (e) {
      console.log(" e:", e);
      // Check if error is due to cancellation
      if (axios.isCancel(e) || e?.name === "CanceledError") {
        toast.info("Video Upload canceled");
        return;
      }
      toast.error("There was an error uploading video!");
    } finally {
      //form.reset();
      setShowProgressModal(false);
      setUploading(false);
    }
  }
  // Drag and Drop Functionality

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!dragging) {
      setDragging(true);
    }
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setValue("videoFile", file);
    }
  };


  // Cancel Request handler
  const handleCancelRequest = () => {
    abortControllerRef.current?.abort();
  };
  return (
    <>
      {/* Video Uploading Progres Modal */}
      <UploadVideoProgressModal
        onCancelRequest={handleCancelRequest}
        uploading={uploading}
        videoFile={videoFile}
        showProgressModal={showProgressModal}
        setShowProgressModal={setShowProgressModal}
      />
      {/* Upload Video Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[70%] lg:max-w-[60%] block  overflow-y-auto h-[90%]  [&::-webkit-scrollbar]:w-[7px] [&::-webkit-scrollbar-thumb]:bg-light-bg">
          <DialogHeader className="block w-full mt-3">
            {/*<DialogTitle>*/}
            <div className="flex items-center justify-between border-b p-4 ">
              <h2 className="text-xl font-semibold">Upload Videos</h2>
              {/*<DialogClose asChild>*/}
              <button
                disabled={isSubmitting}
                onClick={() => {
                  form.handleSubmit(onSubmit)();
                }}
                className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              >
                Save
              </button>
              {/*</DialogClose>*/}
            </div>
            {/*</DialogTitle>*/}
          </DialogHeader>

          <Form {...form}>
            <form
              className="mt-5 mx-auto flex w-full max-w-3xl flex-col gap-y-4 px-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Upload video Input */}
              <FormField
                control={form.control}
                name="videoFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`w-full border-2 border-dashed px-4 py-12 text-center cursor-drop ${
                          dragging ? "border-purple-500" : ""
                        }`}
                      >
                        <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                            ></path>
                          </svg>
                        </span>
                        {
                          // Show video file name if selected
                          videoFile?.name && (
                            <p className="mb-2 ">
                              {" "}
                              Selected File:{" "}
                              <span className="font-semibold">
                                {value?.name}{" "}
                              </span>{" "}
                            </p>
                          )
                        }
                        <h6 className="mb-2 font-semibold">
                          Drag and drop video files to upload
                        </h6>
                        <p className="text-gray-400">
                          Your videos will be private untill you publish them.
                        </p>

                        <label
                          for="upload-video"
                          className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                        >
                          <input
                            onChange={(e) => {
                              const file = e.target?.files && e.target.files[0];
                              setVideoFile(file);
                              onChange(file);
                            }}
                            {...fieldProps}
                            type="file"
                            accept="video/mp4, video/mp3"
                            id="upload-video"
                            className="sr-only"
                          />
                          Select Files
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Thumbnail Input */}
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-full">
                        <label for="thumbnail" className="mb-1 inline-block">
                          Thumbnail<sup>*</sup>
                        </label>
                        <input
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          {...fieldProps}
                          onChange={(e) => {
                            onChange(e.target?.files && e.target.files[0]);
                          }}
                          id="thumbnail"
                          type="file"
                          className="w-full p-1 border file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Title Input */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-full">
                        <label for="title" className="mb-1 inline-block">
                          Title<sup>*</sup>
                        </label>

                        <input
                          {...field}
                          id="title"
                          type="text"
                          className="w-full border bg-transparent px-2 py-1.5 outline-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Description Input */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-full">
                        <label for="desc" className="mb-1 inline-block">
                          Description<sup>*</sup>
                        </label>
                        <textarea
                          {...field}
                          id="desc"
                          className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
                        ></textarea>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadVideoModal;
