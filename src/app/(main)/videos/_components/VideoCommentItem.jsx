"use client";
import useUserContext from "@/hooks/useUserContext";
import { Edit, Ellipsis, Trash } from "lucide-react";
import moment from "moment";
import { useState } from "react";

const VideoCommentItem = ({ item }) => {
  const {
    state: { _id },
  } = useUserContext();
  //console.log("userId:", _id);
  const [modalOpen, setModalOpen] = useState(false);
  const {
    owner: { _id: commentBy, username, fullName, avatar } = {},
    content,
    createdAt,
  } = item || {};
  return (
    <>
      <div className="flex relative gap-x-4">
        {_id === commentBy && (
          <div
            onClick={() => setModalOpen((prev) => !prev)}
            className="absolute cursor-pointer top-0 right-5"
          >
            <Ellipsis />
          </div>
        )}
        <div
          className={`${
            modalOpen ? "block" : "hidden"
          }  w-[170px] h-[75px]  text-white absolute top-7 right-5 `}
        >
          <ul className="flex flex-col bg-primary rounded-md">
            <li className="cursor-pointer rounded-t pl-5 py-2 flex items-center gap-3 hover:bg-black">
              <Edit size={18} />
              <button> Edit</button>
            </li>
            <li className="cursor-pointer rounded-b pl-5 py-2 flex items-center gap-3 hover:bg-black">
              <Trash size={18} />
              <button> Delete</button>
            </li>
          </ul>
        </div>
        <div className="mt-2 h-11 w-11 shrink-0">
          <img
            src={avatar?.url}
            alt={username}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="block">
          <p className="flex items-center text-gray-200">
            {fullName} &nbsp;·&nbsp;
            <span className="text-sm">{moment(createdAt).fromNow()} </span>
          </p>
          <p className="text-sm text-gray-200">@{username}</p>
          <p className="mt-3 text-sm">{content}</p>
        </div>
      </div>
      <hr className="my-4 border-white" />
    </>
  );
};

export default VideoCommentItem;
