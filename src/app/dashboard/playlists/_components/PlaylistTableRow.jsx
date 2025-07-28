import { TableCell, TableRow } from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import PlaylistRowActions from "./PlaylistRowActions";
import TogglePlaylistStatus from "./TogglePlaylistStatus";
const PlaylistTableRow = ({ playlist, onCheckboxChange, selectedIds }) => {
  const {
    _id,
    name,
    createdAt,
    videos,
    isPrivate: isPlaylistPublished,
    owner: { username: ownerUsername, avatar } = {},
  } = playlist || {};

  const [isPrivate, setIsPrivate] = useState(isPlaylistPublished);

  return (
    <TableRow className=" h-[70px]">
      <TableCell className="pl-4">
        <Checkbox
          onCheckedChange={(checked) =>
            onCheckboxChange(checked, "single", _id)
          }
          checked={selectedIds?.includes(_id)}
          className="h-4 w-4"
        />
      </TableCell>
      <TogglePlaylistStatus
        playlistId={_id}
        isPrivate={isPrivate}
        setIsPrivate={setIsPrivate}
      />

      <TableCell>
        <h3 className="font-semibold">
          {name?.length > 90 ? name?.slice(0, 90) + "..." : name}
        </h3>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-4">
          <Image
            width={100}
            height={100}
            className="h-10 w-10 rounded-full"
            src={avatar?.url || "/default-avatar.png"}
            alt={ownerUsername || "Owner Avatar"}
          />
          <span className="font-semibold">{ownerUsername}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="inline-block rounded-xl bg-blue-200 px-2 py-0.5 text-blue-700">
          {videos?.length?.toLocaleString()}
        </span>
      </TableCell>

      <TableCell>{moment(createdAt).format("Do MMM YYYY")}</TableCell>
      <PlaylistRowActions isPrivate={isPrivate} name={name} playlistId={_id} />
    </TableRow>
  );
};

export default PlaylistTableRow;
