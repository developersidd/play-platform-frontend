import RelatedVideoCard from "./RelatedVideoCard";

const RelatedVideoList = () => {
  return (
    <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
      <RelatedVideoCard />
      <RelatedVideoCard />
      <RelatedVideoCard />
      <RelatedVideoCard />
    </div>
  );
};

export default RelatedVideoList;
