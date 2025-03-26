import WatchLaterSidebar from "./_components/WatchLaterSidebar";
import WatchLaterVideoList from "./_components/WatchLaterVideoList";

const WatchLaterPage = async () => {
  // decide what to render
  let content;
  return (
    <section className="p-4 flex gap-10 items-start ">
      <WatchLaterSidebar thumbnailUrl="https://res.cloudinary.com/absiddik123/image/upload/v1740740917/youtube-clone/zrhrrqva89s29ljbmqd0.jpg" />
      <WatchLaterVideoList />
    </section>
  );
};

export default WatchLaterPage;
