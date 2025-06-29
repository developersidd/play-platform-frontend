import { getUserCollections } from "@/api/playlist.api";
import AuthWrapper from "@/components/common/auth/AuthWrapper";
import CollectionList from "./_components/CollectionList";
import NoCollection from "./_components/NoCollection";

const CollectionsPage = async () => {
  const { data } =
    (await getUserCollections({
      expand: true,
    })) || {};
  console.log(" data:", data);
  return (
    <AuthWrapper>
      <div className="p-2 md:p-3 lg:p-4">
        {data?.length > 0 ? (
          <CollectionList collections={data} />
        ) : (
          <NoCollection />
        )}
      </div>
    </AuthWrapper>
  );
};

export default CollectionsPage;
