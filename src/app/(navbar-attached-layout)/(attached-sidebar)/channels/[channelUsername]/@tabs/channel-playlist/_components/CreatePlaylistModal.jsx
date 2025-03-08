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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AddVideosInPlaylist from "./AddVideosInPlaylist";
const playlistTypes = ["videoPlaylist", "watchLater"];
const formSchema = z.object({
  name: z
    .string()
    .min(10, {
      message: "Name must be at least 10 characters long",
    })
    .max(50, {
      message: "Title must be at most 50 characters long",
    }),
  description: z
    .string()
    .min(20, {
      message: "Description must be at least 20 characters long",
    })
    .max(500, {
      message: "Description must be at most 500 characters long",
    }),
  isPrivate: z.boolean(),
  videos: z.array(z.string()),
});

const CreatePlaylistModal = ({ children, playlistType = "" }) => {
  const router = useRouter();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { apiClient } = useAxios();
  const {
    state: { _id },
  } = useUserContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      isPrivate: false,
      videos: [],
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

  return (
    <>
      {/* Upload Video Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[70%] lg:max-w-[60%] block  overflow-y-auto h-[90%]  [&::-webkit-scrollbar]:w-[7px] [&::-webkit-scrollbar-thumb]:bg-light-bg">
          <DialogHeader className="block w-full mt-3">
            {/*<DialogTitle>*/}
            <div className="flex items-center justify-between border-b p-4 ">
              <h2 className="text-xl font-semibold">Create Playlist</h2>
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
              {/* visibility Input */}
              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <FormItem>
                    <label for="desc" className="mb-1 inline-block">
                      Playlist Visibility
                    </label>
                    <FormControl>
                      <div className="w-full flex items-center space-x-2">
                        <Switch {...field} id="isPrivate" />
                        <Label htmlFor="isPrivate">Make Private </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Add Videos */}
              <AddVideosInPlaylist />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePlaylistModal;
