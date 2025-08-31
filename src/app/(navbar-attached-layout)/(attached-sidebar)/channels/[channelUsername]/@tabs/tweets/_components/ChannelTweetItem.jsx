"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxios from "@/hooks/useAxios";
import { Edit, Ellipsis, Trash } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import TweetLikeDislike from "./TweetLikeDislike";

const ChannelTweetItem = ({ tweet, isOwner, setTweetToEdit }) => {
  const {
    _id,
    owner: { fullName, avatar } = {},
    content,
    createdAt,
    likes,
    dislikes,
    isLiked,
    isDisliked,
  } = tweet || {};
  const [isDeleted, setIsDeleted] = useState(false);

  ////console.log("isOwner:", isOwner);
  const [showModal, setShowModal] = useState(false);
  const { apiClient } = useAxios();
  //const menuRef = useRef(null);
  //const menuTriggerRef = useRef(null);
  const handleDelete = async () => {
    if (!isOwner) return;
    setIsDeleted(true);
    try {
       await apiClient.delete(`/tweets/${_id}`);
      toast.success("Tweet Deleted successfully");
      //console.log("res:", res);
    } catch (error) {
      toast.error("Failed to Delete comment");
      setIsDeleted(false);
    }
  };

  return (
    <div
      className={`${isDeleted ? "hidden" : "block"} 
      
      flex  gap-3 border-b border-gray-700 py-4 last:border-b-transparent`}
    >
      <div className="h-14 w-14 shrink-0">
        <Image
          width={56}
          height={56}
          src={avatar?.url}
          alt={fullName}
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="w-full relative">
        <div className="flex items-center">
          <AlertDialog open={showModal} onOpenChange={setShowModal}>
            <AlertDialogContent className="bg-primary">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you want to Delete the Tweet ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Delete Tweet permanently.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="text-primary hover:text-white border bg-white"
                  onClick={handleDelete}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Modal trigger */}
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="absolute cursor-pointer top-0 right-5">
                  <Ellipsis />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-4">
                <DropdownMenuItem
                  onClick={() => {
                    setTweetToEdit({ content, tweetId: _id });
                  }}
                  className="cursor-pointer"
                >
                  <li className=" rounded-t flex items-center gap-2 ">
                    <Edit size={18} />
                    <button> Edit</button>
                  </li>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  {" "}
                  <li className="cursor-pointer rounded-b flex items-center gap-2">
                    <Trash size={18} />
                    <button> Delete</button>
                  </li>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <h4 className="mb-1 flex items-center gap-x-2">
            <span className="font-semibold">{fullName} </span>&nbsp;
            <span className="inline-block text-sm text-gray-400">
              {" "}
              {moment(createdAt).fromNow()}{" "}
            </span>
          </h4>
        </div>
        <p className="mb-2">{content}</p>
        {/* like & dislike */}
        <TweetLikeDislike
          tweetId={_id}
          likeData={{ likes, isLiked }}
          dislikeData={{ dislikes, isDisliked }}
        />
      </div>
    </div>
  );
};

export default ChannelTweetItem;
