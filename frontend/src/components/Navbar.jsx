import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, LogOut, MessageSquare, Settings, User } from "lucide-react";
// import { useChatStore } from "../store/useChatStore";

// if the user is not authenticated user will see logo and settings.
// if the user is authenticated user will see logo and settings,profile and logout btn
const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [isClicked, setIsClicked] = useState(false);
  // const { clearSelectedUser } = useChatStore();
  const navigate = useNavigate();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg ">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* left side */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>

          {/* right side */}

          <div className="flex items-center gap-2">
            <button onClick={() => setIsClicked((prev) => !prev)} type="button">
              <Link
                to={!isClicked ? "/settings" : "/"}
                className={`
              btn btn-sm gap-2 transition-colors perspective-midrange
              
              `}
              >
                <span className="switch-flip inline-flex">
                  {!isClicked ? (
                    <Settings className="size-4" />
                  ) : (
                    <HomeIcon className="size-4" />
                  )}
                </span>
                <span className="switch-flip hidden sm:inline">
                  {!isClicked ? "Settings" : "Home"}
                </span>
              </Link>
            </button>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => {
                    (logout(navigate));
                  }}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
