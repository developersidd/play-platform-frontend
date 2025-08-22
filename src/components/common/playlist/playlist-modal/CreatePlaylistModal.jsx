"use client";
import { getPlaylistById } from "@/api/playlist.api";
import {
  Dialog,
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AddVideosInPlaylistModal from "./AddVideosInPlaylistModal";
import EditPlaylistVideosOrder from "./EditPlaylistVideosOrder";
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
    .max(1000, {
      message: "Description must be at most 500 characters long",
    }),
  isPrivate: z.boolean(),
  videos: z
    .array(z.string())
    .min(1, {
      message: "Please select at least one video to add to playlist",
    })
    .max(50, {
      message: "You can add at most 50 videos to a playlist",
    }),
});

const CreatePlaylistModal = ({ children, playlistId }) => {
  const router = useRouter();
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [videosToUpdate, setVideosToUpdate] = useState([]);
  const isEditing = Boolean(playlistId);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { apiClient } = useAxios();
  const {
    state: { _id, username },
  } = useUserContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      isPrivate: false,
      videos: [],
    },
  });
  const { reset, setValue } = form;
  const { isSubmitting } = form.formState;

  // fetch playlist to edit
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const { data } = await getPlaylistById(playlistId);
        const { name, description, isPrivate, videos } = data;
        console.log("🚀 ~ data in:", data);
        if (data) {
          reset({
            name,
            description,
            isPrivate,
            videos: videos?.map(({ video = {} }) => (video || {})?._id),
          });
          setSelectedVideos(
            videos
              ?.map(({ position, video }) => {
                const { _id, thumbnail, title } = video || {};
                return { video: _id, thumbnail, title, position };
              })
              .filter((v) => Boolean(v.video))
          );
        }
      } catch (e) {
        console.log(" e:", e);
        toast.error("Error fetching playlist");
      }
    };
    if (playlistId) {
      fetchPlaylist();
    }
  }, [playlistId, apiClient, reset]);

  async function onSubmit(data) {
    if (!_id) {
      return toast.error("You must be logged in to upload videos!");
    }
    setShowUploadModal(false);
    try {
      console.log(" form data:", data);
      //return null
      if (isEditing) {
        // edit playlist
        const response = await apiClient.patch(`/playlists/${playlistId}`, {
          ...data,
          videos: videosToUpdate,
        });
        console.log(" response:", response);
        if (response.status === 200) {
          toast.success("Playlist updated successfully!");

          router.refresh();
        }
      } else {
        // create playlist
        const response = await apiClient.post(`/playlists`, data);
        if (response.status === 201) {
          router.push(`/channels/${username}/playlist`);
          toast.success("Playlist create successfully!");
          reset();
        }
      }
    } catch (e) {
      console.log(" e:", e);
      toast.error("There was an error occurred!");
    }
  }

  return (
    <>
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className="h-[80%] min-h-[90%] w-[90%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] block  overflow-y-auto max-h-[90%]  [&::-webkit-scrollbar]:w-[7px] [&::-webkit-scrollbar-track]:bg-background 
         [&::-webkit-scrollbar-thumb]:rounded-lg
        "
        >
          <DialogHeader className="block w-full mt-3">
            {/*<DialogTitle>*/}
            <div className="flex items-center justify-between border-b max-sm:pt-3 max-sm:pb-6 sm:p-4 ">
              <DialogTitle className="text-xl font-semibold">
                {isEditing ? "Edit" : "Create"} Playlist
              </DialogTitle>
              <button
                disabled={isSubmitting}
                onClick={() => {
                  form.handleSubmit(onSubmit)();
                }}
                className="group/btn mr-1 flex w-auto items-center gap-x-2 max-sm:text-sm bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              >
                Save
              </button>
              {/*</DialogClose>*/}
            </div>
            {/*</DialogTitle>*/}
          </DialogHeader>

          <Form {...form}>
            <form
              className="mt-5 mx-auto flex w-full max-w-3xl flex-col gap-y-4 sm:px-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Title Input */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-full">
                        <label htmlFor="name" className="mb-1 inline-block">
                          Name<sup>*</sup>
                        </label>

                        <input
                          {...field}
                          id="name"
                          type="text"
                          className="w-full border bg-transparent  px-2 py-1.5 outline-none"
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
                        <label htmlFor="desc" className="mb-1 inline-block">
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
                    <label htmlFor="desc" className="mb-1 inline-block">
                      Playlist Visibility
                    </label>
                    <FormControl>
                      <div className="w-full flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="isPrivate"
                        />
                        <Label htmlFor="isPrivate">Make Private </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Add Videos */}
              <FormField
                control={form.control}
                name="videos"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <AddVideosInPlaylistModal
                        setValue={setValue}
                        selectedVideos={selectedVideos}
                        setSelectedVideos={setSelectedVideos}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          {/* Selected Videos Preview */}
          {selectedVideos?.length > 0 && (
            <EditPlaylistVideosOrder
              setValue={setValue}
              setVideosToUpdate={setVideosToUpdate}
              selectedVideos={selectedVideos}
              setSelectedVideos={setSelectedVideos}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePlaylistModal;
