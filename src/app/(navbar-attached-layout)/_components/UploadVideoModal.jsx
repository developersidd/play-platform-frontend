"use client";
import {
  Dialog,
  DialogClose,
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
import { formatFileSize } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Film, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const MAX_THUMBNAIL_FILE_SIZE = 5242880; // 5MB
const MAX_VIDEO_FILE_SIZE = 52428800; // 50MB
function checkFileType(file, format) {
  if (file?.name) {
    const fileType = file?.name?.split(".")?.pop();
    const allowedTypes =
      format === "image" ? ["png", "jpg", "jpeg"] : ["mp3", "mp4"];
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
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [videoFile, setVideoFile] = useState({});
  const { privateApi } = useAxios();
  const {
    state: { _id, username },
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
  const { isSubmitting } = form.formState;
  async function onSubmit(data) {
    if (!_id) {
      return toast.error("You must be logged in to upload videos!");
    }
    setUploading(true);
    setShowUploadModal(false);
    setShowProgressModal(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      // delay for 5 seconds
      /*await new Promise((resolve) => setTimeout(resolve, 3000));*/
      const response = await privateApi.post("/api/v1/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response:", response.data);
      //router.push(`/${username}`);

      router.refresh();
      toast.success("Video uploaded successfully!");
    } catch (e) {
      //console.log("e:", e);
      setShowProgressModal(false);
      toast.error("There was an error uploading video!");
    } finally {
      //form.reset();
      setUploading(false);
    }
  }

  return (
    <>
      {/* Video Uploading Progres Modal */}
      <Dialog
        open={showProgressModal}
        onOpenChange={setShowProgressModal}
        className="bg-primary"
      >
        <DialogContent className="sm:max-w-[40%] block bg-primary overflow-y-auto">
          <DialogHeader className="block w-full mt-3">
            <div class="mb-4 flex items-start justify-between">
              <h2 class="text-xl font-semibold">
                {uploading ? "Uploading Video..." : "Video Uploaded"}
                <span class="block text-sm text-gray-300">
                  Track your video uploading process.
                </span>
              </h2>
            </div>
          </DialogHeader>

          {/* Progress */}
          <div class="mb-6 flex gap-x-2 border p-3">
            <div class="w-8 shrink-0">
              <span class="inline-block w-full rounded-full bg-[#E4D3FF] p-1 text-[#AE7AFF]">
                <Film />
              </span>
            </div>
            <div class="flex flex-col">
              <h6> {videoFile?.name} </h6>
              <p class="text-sm"> {formatFileSize(videoFile?.size)} </p>
              <div class="mt-2">
                {uploading ? (
                  <>
                    <LoaderCircle className="inline-block animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Check className="inline-block mr-2 text-green-500" />
                    Uploaded
                  </>
                )}
              </div>
            </div>
          </div>

          {/*  Footer */}
          <div class="grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <button
                onClick={() => {
                  setShowProgressModal(false);
                }}
                class="border px-4 py-3"
              >
                Cancel
              </button>
            </DialogClose>
            <DialogClose asChild>
              <button
                disabled={uploading}
                class="bg-[#ae7aff] px-4 py-3 text-black disabled:bg-[#E4D3FF]"
              >
                Finish
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      {/* Upload Video Modal */}
      <Dialog
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
        className="bg-primary"
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[60%] block bg-primary overflow-y-auto h-[90%]">
          <DialogHeader className="block w-full mt-3">
            {/*<DialogTitle>*/}
            <div className="flex items-center justify-between border-b p-4 ">
              <h2 className="text-xl font-semibold">Upload Videos</h2>
              {/*<DialogClose asChild>*/}
              <button
                disabled={isSubmitting}
                onClick={() => {
                  // submit the form
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
                      <div className="w-full border-2 border-dashed px-4 py-12 text-center">
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
                              setVideoFile(e.target.files[0]);
                              console.log("e:", e.target.files[0]);
                              onChange(e.target?.files && e.target.files[0]);
                            }}
                            {...fieldProps}
                            type="file"
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
