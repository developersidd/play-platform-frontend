"use client";

import useAxios from "@/hooks/useAxios";
import Picker from "emoji-picker-react";
import { Edit, Send, Smile } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
const CreateTweet = ({ isOwner, tweetToEdit, setTweetToEdit }) => {
  const [tweet, setTweet] = useState(tweetToEdit?.content);
  const isEditing = Boolean(tweetToEdit?.tweetId);
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();
  const EmojiPikerRef = useRef(null);
  const { privateApi } = useAxios();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // handle emoji click
  const onEmojiClick = (emojiObject) => {
    setTweet((prevInput) => prevInput + emojiObject.emoji);
  };

  // close piker on outside click
  const handleClickOutside = (event) => {
    if (
      EmojiPikerRef.current &&
      !EmojiPikerRef.current.contains(event.target)
    ) {
      setShowPicker(false);
    }
  };

  const handleCreateTweet = async () => {
    if (!tweet?.trim() || !isOwner) return;
    setIsSubmitting(true);
    try {
      if (isEditing) {
        const res = await privateApi.patch(`/tweets/${tweetToEdit.tweetId}`, {
          content: tweet,
        });
        console.log("res:", res);
        setTweetToEdit(null);
        toast.success("Tweet updated successfully");
      } else {
        const res = await privateApi.post(`/tweets`, { content: tweet });
        toast.success("Tweet created successfully");
        console.log("res:", res);
      }
      setTweet("");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create tweet");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div class="mt-2 border pb-2 ">
      <div
        ref={EmojiPikerRef}
        className="picker-container relative"
        onClick={handleClickOutside}
      >
        <Picker
          open={showPicker}
          className="!fixed z-[9999999] top-[40%] right-60"
          pickerStyle={{ width: "70%" }}
          onEmojiClick={onEmojiClick}
        />
      </div>
      <textarea
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        class="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
        placeholder="Write a tweet"
      ></textarea>
      <div class="flex items-center justify-end gap-x-4 px-3">
        <button
          onClick={() => setShowPicker((prev) => !prev)}
          class="inline-block h-5 w-5 hover:text-[#ae7aff]"
        >
          <Smile />
        </button>
        {isEditing && (
          <button
            onClick={() => {
              setTweetToEdit({});
            }}
            class="bg-white rounded px-2 py-2 font-semibold text-black"
          >
            Cancel
          </button>
        )}
        <button
          disabled={isSubmitting}
          onClick={handleCreateTweet}
          class="rounded bg-[#ae7aff] px-2 py-2 font-semibold text-black"
        >
          <span className="align-middle inline-block mr-1.5">
            {isEditing ? <Edit size={18} /> : <Send size={18} />}
          </span>
          {isEditing ? "Edit" : "Send"}
        </button>
      </div>
    </div>
  );
};

export default CreateTweet;
