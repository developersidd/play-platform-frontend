"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";

function WatchLaterSidebar({ thumbnailUrl = "" }) {
  return (
    <aside
      className={`transition-colors duration-300  top-[100px] sticky left-0 w-1/4 h-[calc(100vh-120px)] rounded-xl overflow-hidden `}
    >
      <div className={`relative w-full flex min-h-full overflow-hidden  p-3`}>
        <div
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
          className={`absolute inset-0  blur-xl bg-center bg-cover bg-no-repeat `}
        ></div>

        <div
          className="z-50 w-full h-full  bg-white/20 shadow
         rounded-xl p-3"
        >
          <Image
            width={450}
            height={300}
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
