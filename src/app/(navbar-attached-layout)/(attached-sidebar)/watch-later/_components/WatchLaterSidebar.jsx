"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";

function WatchLaterSidebar({ thumbnailUrl = "" }) {
  return (
    <aside
      className={`transition-colors duration-300 top-0 sticky left-0 w-full lg:w-3/6 xl:w-2/6  2xl:w-[28%] lg:h-[calc(100vh-120px)] max-h-max rounded-xl overflow-hidden `}
    >
      <div
        className={`relative w-full flex lg:min-h-full overflow-hidden  p-3`}
      >
        <div
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
          className={`absolute inset-0  blur-xl bg-center bg-cover bg-no-repeat `}
        ></div>

        <div
          className="z-50 w-full h-full flex flex-col sm:flex-row lg:flex-col  bg-white/20 shadow sm:gap-6
         rounded-xl p-3"
        >
          <div className="lg:w-full h-[200px] mb-3">
            <Image
              width={450}
              height={300}
              src={thumbnailUrl}
              className="size-full object-fill rounded-xl "
              alt=""
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">Watch Later</h2>
            <h5 className="font-medium">AB Siddik</h5>
            <p className="mt-1 text-sm opacity-70">2500 videos</p>
            <Button className="mt-5 rounded-full" size="lg">
              <Play /> Play all
            </Button>
          </div>
        </div>
      </div>
      {/*</div>*/}
    </aside>
  );
}
export default WatchLaterSidebar;
