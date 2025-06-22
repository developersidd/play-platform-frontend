"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import UploadThumbnailForm from "./UploadThumbnailForm";
import UploadVideoForm from "./UploadVideoForm";
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
  thumbnail: z.union([
    z.string(),
    z
      .any()
      .refine((file) => file, "Thumbnail is required")
      .refine(
        (file) => file?.size < MAX_THUMBNAIL_FILE_SIZE,
        "Max size is 5MB."
      )
      .refine(
        (file) => checkFileType(file, "image"),
        "Only .png, .jpg, .jpeg formats are supported."
      ),
  ]),
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
  tags: z
    .string()
    .min(2, {
      message: "Tags must be at least 2 characters long",
    })
    .max(100, {
      message: "Tags must be at most 100 characters long",
    }),
});

const UploadVideoModal = ({ children, videoId }) => {
  const isEditingVideo = Boolean(videoId);
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
      tags: "",
      thumbnail: undefined,
    },
  });
  const { reset, setValue } = form;
  // fetch video data if editing
  useEffect(() => {
    if (isEditingVideo) {
      // if the form in editing mode then need to make the videoFile optional
      formSchema.shape.videoFile = z.any().optional();
      formSchema.shape.thumbnail = z.any().optional();
      const fetchVideoData = async () => {
        try {
          const { data } = await apiClient.get(`/videos/${videoId}`);
          const { title, description, thumbnail, tags } = data.data;
          setValue("title", title);
          setValue("description", description);
          setValue("thumbnail", thumbnail?.url);
          setValue("tags", tags?.join(", ") || "");
        } catch (error) {
          console.error("Error fetching video data:", error);
        }
      };
      fetchVideoData();
    }
  }, [isEditingVideo, videoId, apiClient, setValue]);

  const { isSubmitting } = form.formState;
  async function onSubmit(data) {
    if (!_id) {
      return toast.error("You must be logged in to upload videos!");
    }
    if (isEditingVideo) {
      // Edit video
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });
      try {
        setShowUploadModal(false);
        const response = await apiClient.patch(`/videos/${videoId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          router.refresh();
          toast.success("Video edited successfully!");
        }
      } catch (e) {
        toast.error("Error occurred while editing video");
      } finally {
        router.refresh();
        setShowUploadModal(false);
      }
    } else {
      // upload video
      const controller = new AbortController();
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
        if (response.status === 201) {
          reset();
          router.refresh();
          toast.success("Video uploaded successfully!");
        }
      } catch (e) {
        // Check if error is due to cancellation
        if (axios.isCancel(e) || e?.name === "CanceledError") {
          toast.info("Video Upload canceled");
          return;
        }
        toast.error("There was an error occurred uploading video!");
      } finally {
        setShowProgressModal(false);
        setUploading(false);
        router.refresh();
      }
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
        <DialogContent
          hideCloseButton
          className="sm:max-w-[70%] lg:max-w-[60%] block  overflow-y-auto h-[90%]  [&::-webkit-scrollbar]:w-[7px] [&::-webkit-scrollbar-thumb]:bg-light-bg pb-10"
        >
          <DialogHeader className="block w-full mt-3">
            <div className="flex items-center justify-between border-b p-4 ">
              <DialogTitle className="text-xl font-semibold">
                {" "}
                {isEditingVideo ? "Edit Video" : "Upload Video"}{" "}
              </DialogTitle>
              <DialogClose
                onClick={() => {
                  reset();
                }}
                className="cursor-pointer absolute top-[12px] right-4"
                asChild
              >
                <X size={18} />
              </DialogClose>
              <button
                type="submit"
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
              {!isEditingVideo && (
                <UploadVideoForm
                  form={form}
                  videoFile={videoFile}
                  setVideoFile={setVideoFile}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDrop={handleDrop}
                  dragging={dragging}
                />
              )}
              {/* Thumbnail Input */}
              <UploadThumbnailForm
                form={form}
                isEditingVideo={isEditingVideo}
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
              {/* tags field */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-full">
                        <label for="tags" className="mb-1 inline-block">
                          Tags<sup>*</sup>{" "}
                          <span className="text-sm text-gray-500">
                            (comma separated, e.g. tag1, tag2)
                          </span>
                        </label>
                        <input
                          {...field}
                          id="tags"
                          type="text"
                          className="w-full border bg-transparent px-2 py-1.5 outline-none"
                        />
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
