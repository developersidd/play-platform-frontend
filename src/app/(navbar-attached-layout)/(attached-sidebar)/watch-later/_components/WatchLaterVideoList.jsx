"use client";

import { reorderWatchLaterVideos } from "@/api/watchLater.api";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { toast } from "sonner";
import WatchLaterVideoItem from "./WatchLaterVideoItem";

const WatchLaterVideoList = ({ dbVideos }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [items, setItems] = useState(dbVideos);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setItems(items);
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const [movedVideo] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedVideo);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    setItems(items);

    const updatedItems = items.slice(startIndex, endIndex + 1);
    const bulkUpdateData = updatedItems.map((item) => ({
      videoId: item?.video?._id,
      position: items.findIndex(({ _id }) => _id === item._id),
    }));
    //console.log(" bulkUpdateData:", bulkUpdateData);
    reorderWatchLaterVideos(bulkUpdateData)
      .then(() => {
        router.refresh();
        toast.success("Videos reordered successfully");
      })
      .catch((e) => {
        //console.log(" e:", e);
        toast.error("Error reordering videos");
      });
  };

  if (!isMounted) return null;

  return (
    <div className="w-full lg:w-3/4 pb-[85px]">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="videos">
          {(provided) => (
            <Virtuoso
              useWindowScroll
              data={items}
              overscan={20}
              components={{
                List: (() => {
                  const ListComponent = forwardRef(
                    ({ style, children }, ref) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={(el) => {
                            provided.innerRef(el);
                            if (typeof ref === "function") ref(el);
                            else if (ref) ref.current = el;
                          }}
                          style={style}
                        >
                          {children}
                          {provided.placeholder}
                        </div>
                      );
                    }
                  );
                  ListComponent.displayName = "VirtuosoDroppableList";
                  return ListComponent;
                })(),
              }}
              itemContent={(index, item) => {
                return <WatchLaterVideoItem item={item} index={index} />;
              }}
            />
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default WatchLaterVideoList;
