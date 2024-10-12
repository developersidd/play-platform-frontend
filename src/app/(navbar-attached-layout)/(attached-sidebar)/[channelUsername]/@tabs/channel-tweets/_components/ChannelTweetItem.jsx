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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useAxios from "@/hooks/useAxios";
import { Edit, Ellipsis, Trash } from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
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

  //console.log("isOwner:", isOwner);
  const [showMenu, setShowMenu] = useState(false);
  const { privateApi } = useAxios();
  const menuRef = useRef(null);
  const menuTriggerRef = useRef(null);
  const handleDelete = async () => {
    if (!isOwner) return;
    setIsDeleted(true);
    try {
      const res = await privateApi.delete(`/api/v1/tweets/${_id}`);
      toast.success("Tweet Deleted successfully");
      console.log("res:", res);
    } catch (error) {
      toast.error("Failed to Delete comment");
      setShowMenu(true);
      setIsDeleted(false);
    }
  };
  // close piker on outside click
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      menuTriggerRef.current &&
      !menuTriggerRef.current.contains(event.target)
    ) {
      setShowMenu(false);
    }
  };
  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      className={`${
        isDeleted ? "hidden" : "block"
      } flex  gap-3 border-b border-gray-700 py-4 last:border-b-transparent`}
    >
      <div className="h-14 w-14 shrink-0">
        <img
          src={avatar?.url}
          alt={fullName}
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="w-full relative">
        <div className="flex items-center">
          {/* Modal trigger */}
          <div>
            {isOwner && (
              <div
                ref={menuTriggerRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="absolute cursor-pointer top-0 right-5"
              >
                <Ellipsis />
              </div>
            )}
            {/* Comment Modal */}
            <div
              ref={menuRef}
              className={`${
                showMenu ? "block" : "hidden"
              }  w-[170px] h-[75px]  text-white absolute top-7 right-5 `}
            >
              {/* Modal Items */}
              <ul className="flex flex-col bg-primary rounded-md">
                <li
                  onClick={() => {
                    setShowMenu(false);
                    setTweetToEdit({ content, tweetId: _id });
                  }}
                  className="cursor-pointer rounded-t pl-5 py-2 flex items-center gap-3 hover:bg-[#272727]"
                >
                  <Edit size={18} />
                  <button> Edit</button>
                </li>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <li className="cursor-pointer rounded-b pl-5 py-2 flex items-center gap-3 hover:bg-[#272727]">
                      <Trash size={18} />
                      <button> Delete</button>
                    </li>
                  </AlertDialogTrigger>
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
              </ul>
            </div>
          </div>

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
