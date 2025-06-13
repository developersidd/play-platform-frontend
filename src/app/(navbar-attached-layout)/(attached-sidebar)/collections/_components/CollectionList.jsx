import CollectionItem from "./CollectionItem";

const CollectionList = ({ collections = [] }) => {
  return (
    <div className="grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))]">
      {collections.map((collection) => (
        <CollectionItem key={collection?._id} collection={collection} />
      ))}
    </div>
  );
};

export default CollectionList;
