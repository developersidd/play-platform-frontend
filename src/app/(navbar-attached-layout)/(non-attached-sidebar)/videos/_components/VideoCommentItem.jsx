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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { Edit, Ellipsis, Trash } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const VideoCommentItem = ({ item }) => {
  const {
    state: { _id },
  } = useUserContext();
  const {
    owner: { _id: commentBy, username, fullName, avatar } = {},
    _id: commentId,
    content,
    createdAt,
  } = item || {};
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    if (String(_id) === String(commentBy)) {
      setShowMenu(true);
    }
  }, [_id, commentBy]);
  const [comment, setComment] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const { apiClient } = useAxios();

  const handleEditComment = async () => {
    try {
      await apiClient.patch(`/comments/c/${commentId}`, {
        content: comment,
      });
      toast.success("Comment Edited successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to Edit comment");
      setIsOpen(true);
      setComment(content);
    }
  };

  const handleCommentDelete = async () => {
    setIsDeleted(true);
    try {
      await apiClient.delete(`/comments/c/${commentId}`);
      toast.success("Comment Deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to Delete comment");
      setIsOpen(true);
      setIsDeleted(false);
    }
  };

  return (
    <div className={`${isDeleted ? "hidden" : "block"}`}>
      <div className="flex relative gap-x-4 ">
        {/* Comment Modal */}
        {showMenu && (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="absolute top-0 right-5" asChild>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="*:curs" align="end">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit size={18} />
                <DropdownMenuLabel>Edit </DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCommentDelete}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <>
                      <Trash size={18} />
                      <DropdownMenuLabel> Delete</DropdownMenuLabel>
                    </>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-primary">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you want to Delete Comment ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Delete Comment permanently.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="text-primary hover:text-white border bg-white"
                        onClick={handleCommentDelete}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Commented User Info */}
        <div className="mt-2 h-11 w-11 shrink-0">
          <img
            src={avatar?.url}
            alt={username}
            className="h-full w-full rounded-full"
          />
        </div>
        {/* Edit Section */}
        {isEditing ? (
          <div className="w-full mt-2">
            <textarea
              className="block bg-gray-100 dark:bg-dark-bg rounded mb-4 w-[90%]    outline-none px-4 py-2"
              onChange={(e) => setComment(e.target.value)}
              type="text"
              value={comment}
            />
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="mr-6 px-4 py-[7px]  "
            >
              Cancel
            </Button>
            <Button
              disabled={!comment || !isEditing}
              onClick={handleEditComment}
              className="disabled:cursor-not-allowed rounded px-6 py-[7px] bg-secondary text-white"
            >
              Save
            </Button>
          </div>
        ) : (
          // Comment Section
          <div className="block">
            <p className="flex items-center ">
              {fullName} &nbsp;·&nbsp;
              <span className="text-sm">{moment(createdAt).fromNow()} </span>
            </p>
            <p className="text-sm ">@{username}</p>
            <p className="mt-3 text-sm">{comment}</p>
          </div>
        )}
      </div>
      <hr className="my-4 " />
    </div>
  );
};

export default VideoCommentItem;
