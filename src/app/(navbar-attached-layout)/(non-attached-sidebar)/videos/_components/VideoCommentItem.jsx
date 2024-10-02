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
import useUserContext from "@/hooks/useUserContext";
import { Edit, Ellipsis, Trash } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const VideoCommentItem = ({ item }) => {
  const {
    state: { _id },
  } = useUserContext();
  //console.log("userId:", _id);
  const {
    owner: { _id: commentBy, username, fullName, avatar } = {},
    content,
    createdAt,
  } = item || {};
  const [state, setState] = useState({
    modalOpen: false,
    isEditingMode: false,
    showDots: false,
  });
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    setState((prev) => ({ ...prev, showDots: _id === commentBy }));
  }, [_id]);
  const [comment, setComment] = useState(item?.content);
  const { privateApi } = useAxios();
  const closeModal = () =>
    setState((prev) => ({
      ...prev,
      modalOpen: false,
      isEditingMode: false,
      showDots: true,
    }));
  const handleEditComment = async () => {
    closeModal();
    try {
      await privateApi.patch(`/api/v1/comments/c/${item._id}`, {
        content: comment,
      });
      toast.success("Comment Edited successfully");
    } catch (error) {
      toast.error("Failed to Edit comment");
      setState((prev) => ({ ...prev, modalOpen: true }));
      setComment(content);
    }
  };

  const handleDelete = async () => {
    setIsDeleted(true);
    try {
      await privateApi.delete(`/api/v1/comments/c/${item._id}`);
      toast.success("Comment Deleted successfully");
    } catch (error) {
      toast.error("Failed to Delete comment");
      setState((prev) => ({ ...prev, modalOpen: true }));
      setIsDeleted(false);
      console.log(error);
    }
  };

  return (
    <div className={`${isDeleted ? "hidden" : "block"}`}>
      <div className="flex relative gap-x-4 ">
        {/* Modal trigger */}
        {state.showDots && (
          <div
            onClick={() => setState((prev) => ({ ...prev, modalOpen: true }))}
            className="absolute cursor-pointer top-0 right-5"
          >
            <Ellipsis />
          </div>
        )}
        {/* Comment Modal */}
        <div
          className={`${
            state.modalOpen ? "block" : "hidden"
          }  w-[170px] h-[75px]  text-white absolute top-7 right-5 `}
        >
          {/* Modal Items */}
          <ul className="flex flex-col bg-primary rounded-md">
            <li
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  modalOpen: false,
                  isEditingMode: true,
                  showDots: false,
                }));
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
                    onClick={handleDelete}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ul>
        </div>
        {/* Commented User Info */}
        <div className="mt-2 h-11 w-11 shrink-0">
          <img
            src={avatar?.url}
            alt={username}
            className="h-full w-full rounded-full"
          />
        </div>
        {/* Edit Section */}
        {state.isEditingMode ? (
          <div className="w-full mt-2">
            <textarea
              className="block rounded mb-4 w-[90%] bg-primary  text-white outline-none px-4 py-2"
              onChange={(e) => setComment(e.target.value)}
              type="text"
              value={comment}
            />
            <button
              onClick={() => {
                closeModal();
                setComment(content);
              }}
              className="hover:bg-[#272727] rounded mr-6 px-4 py-[7px]  "
            >
              Cancel
            </button>
            <button
              disabled={!comment || state.isEditing}
              onClick={handleEditComment}
              className="disabled:cursor-not-allowed rounded px-6 py-[7px] bg-secondary"
            >
              Save
            </button>
          </div>
        ) : (
          // Comment Section
          <div className="block">
            <p className="flex items-center text-gray-200">
              {fullName} &nbsp;·&nbsp;
              <span className="text-sm">{moment(createdAt).fromNow()} </span>
            </p>
            <p className="text-sm text-gray-200">@{username}</p>
            <p className="mt-3 text-sm">{comment}</p>
          </div>
        )}
      </div>
      <hr className="my-4 border-white" />
    </div>
  );
};

export default VideoCommentItem;
