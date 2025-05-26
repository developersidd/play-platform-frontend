"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Tally2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EditPlaylistVideosOrder = ({
  selectedVideos,
  setSelectedVideos,
  setVideosToUpdate,
  setValue,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [items, setItems] = useState(selectedVideos);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setItems(selectedVideos);
    // update the videosToUpdate state when selectedVideos changes
    const updatedVideosToUpdate = selectedVideos.map((item, ind) => ({
      video: item.video,
      position: ind,
    }));
    setVideosToUpdate(updatedVideosToUpdate);
  }, [selectedVideos]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const [movedVideo] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedVideo);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedItems = items.slice(startIndex, endIndex + 1);
    const bulkUpdateData = updatedItems.map((item) => ({
      video: item.video,
      position: items.findIndex(({ video }) => video === item.video),
    }));
    setVideosToUpdate(bulkUpdateData);
    /*reorderWatchLaterVideos(bulkUpdateData)
      .then((data) => {
        router.refresh();
        toast.success("Videos reordered successfully");
      })
      .catch((e) => {
        console.log(" e:", e);
        toast.error("Error reordering videos");
      });*/
  };

  if (!isMounted) {
    return null;
  }

  return (
    <section className="mt-8 px-4 w-full max-w-3xl mx-auto">
      <ScrollArea className="h-[600px] border rounded-lg p-3">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="videos">
            {(provided) => (
              <div
                className="space-y-3"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {selectedVideos.map(
                  ({ video, title, thumbnail } = {}, index) => (
                    <Draggable key={video} draggableId={video} index={index}>
                      {(provided, { isDragging }) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={cn(
                            "!left-auto !top-auto w-full rounded-lg hover:bg-dark-bg px-2  flex items-center group",
                            isDragging && "bg-light-bg"
                          )}
                        >
                          {/* indexing */}
                          <span className="text-xs text-gray-500 font-bold mx-2">
                            {index + 1}.
                          </span>

                          <div
                            className={cn(
                              "px-2 h-full  flex items-center justify-center  pb-0 m-0 cursor-grab"
                            )}
                            {...provided.dragHandleProps}
                          >
                            <Tally2 className=" rotate-90 mt-3" />
                          </div>
                          <div
                            key={video}
                            className="flex w-full items-center p-2  "
                          >
                            <Image
                              width={100}
                              height={100}
                              src={thumbnail?.url}
                              className="w-16 h-10 rounded object-cover mr-3"
                              alt={title}
                            />
                            <span className="text-sm">{title}</span>
                          </div>
                          {/* create a cross button with group hover show */}
                          <button
                            type="button"
                            className="invisible
                          group-hover:visible mr-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 ease-in-out"
                            aria-label="remove"
                            onClick={() => {
                              const updatedVideos = selectedVideos.filter(
                                (item) => item?.video !== video
                              );
                              setSelectedVideos(updatedVideos);
                              setValue(
                                "videos",
                                updatedVideos.map(({ video }) => video)
                              );
                            }}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  )
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollArea>
    </section>
  );
};
export default EditPlaylistVideosOrder;
