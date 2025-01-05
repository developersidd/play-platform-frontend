import { PauseIcon, TrashIcon } from "lucide-react";
import HistorySearch from "./HistorySearch";

const HistorySettings = () => {
  return (
    <div className="w-1/5 hidden lg:block">
      <HistorySearch />
      <div className="mt-6 space-y-2">
        <button className="flex items-center gap-x-2 py-2 px-3 hover:bg-[#3F3F3F] rounded-full">
          <TrashIcon />
          <h4 className="font-bold"> Clear all watch history </h4>
        </button>
        <button className="flex items-center gap-x-2 py-2 px-3 hover:bg-[#3F3F3F] rounded-full">
          <PauseIcon />
          <h4 className="font-bold"> Pause watch history </h4>
        </button>
      </div>
    </div>
  );
};

export default HistorySettings;
