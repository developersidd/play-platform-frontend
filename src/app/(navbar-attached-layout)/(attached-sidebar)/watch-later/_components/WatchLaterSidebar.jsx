"use client";

import { Button } from "@/components/ui/button";
import { FastAverageColor } from "fast-average-color";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

function WatchLaterSidebar({ thumbnailUrl = "" }) {
  const [bgColor, setBgColor] = useState("hsl(0, 0%, 100%)");

  useEffect(() => {
    const getColor = async () => {
      try {
        const fastAverageColor = new FastAverageColor();
        const color = await fastAverageColor.getColorAsync(thumbnailUrl);
        console.log(" color:", color);
        setBgColor(color.hex);
      } catch (error) {
        console.error("Error fetching color:", error);
        setBgColor("#000000");
      }
    };

    if (thumbnailUrl) getColor();
  }, [thumbnailUrl]);
  let bgClasses = `bg-${bgColor}`;
  return (
    <aside
      className={`transition-colors duration-300  top-[100px] sticky left-0 w-1/4 h-[calc(100vh-115px)] rounded-xl overflow-hidden`}
    >
      {/*<div className=" sticky  top-4 left-0 ">*/}
      <div class={`relative w-full flex min-h-full overflow-hidden  p-3`}>
        <div
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
          class={`absolute inset-0  blur-xl bg-center bg-cover bg-no-repeat bg-black`}
        ></div>

        <div
          className="z-50 w-full h-full  bg-white/15 shadow
         rounded-xl p-3"
        >
          <img
            src={thumbnailUrl}
            className="w-full h-[200px] object-fill rounded-xl mb-5"
            alt=""
          />
          <h2 className="text-2xl font-bold mb-4">Watch Later</h2>
          <h5 className="font-medium">AB Siddik</h5>
          <p className="mt-1 text-sm opacity-70">2500 videos</p>
          <Button className="mt-5 rounded-full" size="lg">
            <Play /> Play all
          </Button>
        </div>
      </div>
      {/*</div>*/}
    </aside>
  );
}
export default WatchLaterSidebar;
