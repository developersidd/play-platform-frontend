import CollectionItem from "./CollectionItem";

const CollectionList = ({ collections = [] }) => {
  return (
    <div className="grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">
      {collections.map((playlist) => (  
        <CollectionItem key={playlist?._id} collection={playlist} />
      ))}
    </div>
  );
};

export default CollectionList;
