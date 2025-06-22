import { TableCell, TableRow } from "@/components/ui/table";

import { Monitor, Smartphone, Tablet } from "lucide-react";
import moment from "moment";
import DeviceRowAction from "./DeviceRowAction";
const DevicesTableRow = ({ device }) => {
  const {
    _id,
    ip,
    isActive,
    createdAt,
    deviceInfo: { os, model, browser, deviceType, version } = {},
  } = device || {};
  const deviceIcon = {
    smartphone: <Smartphone className="h-5 w-5" />,
    tablet: <Tablet className="h-5 w-5" />,
    desktop: <Monitor className="h-5 w-5" />,
  };

  return (
    <TableRow className=" h-[70px]">
      <TableCell className="relative pl-6">
        <div className="flex items-center gap-4">
          <div
            className={`absolute top-[30px] left-[6px] h-2 w-2 rounded-full bg-green-500 ${
              isActive ? "block" : "hidden"
            }`}
          />
          {deviceIcon[deviceType]}
          <h3 className="font-semibold">{model}</h3>
        </div>
      </TableCell>
      <TableCell>{os}</TableCell>
      <TableCell>{version}</TableCell>

      <TableCell>{ip}</TableCell>
      <TableCell>{browser}</TableCell>
      <TableCell>
        {moment(createdAt).format("Do MMM YYYY [at] h:mm A")}
      </TableCell>
      <DeviceRowAction deviceId={_id} currentDevice={isActive} />
    </TableRow>
  );
};

export default DevicesTableRow;
