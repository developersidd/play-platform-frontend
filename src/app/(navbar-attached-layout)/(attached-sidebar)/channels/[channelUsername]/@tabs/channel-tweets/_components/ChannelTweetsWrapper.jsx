"use client";
import { useState } from "react";
import ChannelNoTweets from "./ChannelNoTweets";
import ChannelTweetItem from "./ChannelTweetItem";
import CreateTweet from "./CreateTweet";

const ChannelTweetsWrapper = ({ isOwner, tweets, username }) => {
  const [tweetToEdit, setTweetToEdit] = useState(null);
  return (
    <>
      {isOwner && (
        <CreateTweet
          key={tweetToEdit?.tweetId}
          tweetToEdit={tweetToEdit}
          setTweetToEdit={setTweetToEdit}
          isOwner={isOwner}
        />
      )}
      {tweets?.length > 0 ? (
        tweets.map((tweet) => (
          <ChannelTweetItem
            isOwner={isOwner}
            setTweetToEdit={setTweetToEdit}
            key={tweet._id}
            tweet={tweet}
          />
        ))
      ) : (
        <ChannelNoTweets />
      )}
    </>
  );
};

export default ChannelTweetsWrapper;
