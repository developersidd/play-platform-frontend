"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
//import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  /*const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch(`/api/me`);
        const data = await response.json();
        setLoggedInUser(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchMe();
  }, []);
*/
  return (
    <div className="w-full border-b">
      <div className="p-4  h-full flex items-center  z-30 container mx-auto">
        {/*<MobileSidebar />*/}
        <div>Logo</div>
        <div className="flex items-center justify-end  w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">
                <Avatar>
                  <AvatarImage src={""} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-4">
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href="#"
                  onClick={() => {
                    console.log("Logout");
                  }}
                >
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
