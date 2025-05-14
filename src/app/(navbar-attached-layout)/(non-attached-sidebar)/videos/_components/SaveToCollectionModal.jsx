"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserCollections } from "@/server-actions/playlist.action";
import { retrieveCurrentUser } from "@/server-actions/user.action";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import CreateVideoCollection from "./CreateVideoCollection";
import VideoCollectionItem from "./VideoCollectionItem";

const SaveToCollectionModal = ({ videoId, open, setIsOpen, children }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user first
        const { data: { username } = {} } = (await retrieveCurrentUser()) || {};
        if (username) {
          // Then fetch playlists
          const playlistsRes = await getUserCollections();
          setCollections(playlistsRes.data || []);
        }
      } catch (error) {
        setError(error?.message || "Failed to fetch collections");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  let content;
  if (loading) {
    content = (
      <div className="flex justify-center py-10">
        <Loader size={28} className="animate-spin" />
      </div>
    );
  } else if (collections?.length > 0) {
    content = (
      <div className="space-y-1.5">
        {collections?.map((collection) => (
          <VideoCollectionItem
            key={collection?._id}
            collection={collection}
            videoId={videoId}
            isSaved={collection?.videos?.some(
              ({ video }) => video?.toString() === videoId
            )}
          />
        ))}
      </div>
    );
  } else if (collections?.length === 0) {
    content = (
      <div className="text-center py-3 text-lg">
        You don&apos;t have any collections yet.
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-center py-3 text-lg text-red-500">
        <p>There was an error fetching your collections.</p>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="block w-full mt-3">
          <DialogTitle> Save to collection</DialogTitle>
        </DialogHeader>

        {content}
        <CreateVideoCollection setCollections={setCollections} />
      </DialogContent>
    </Dialog>
  );
};

export default SaveToCollectionModal;
