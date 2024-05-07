import React from "react";
import { Link, NavLink } from "react-router-dom";

const MainSideBar = ({ user }) => {
  const handleLogout = async () => {
    try {
      window.location.href = "http://localhost:8080/logout";
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="bg-black">
      {" "}
      <div className=" flex flex-col bg-black">
        <aside className="flex flex-col shrink-0 lg:w-[250px] w-[250px]  m-0 fixed  bg-cyan-800 border-r border-r-dashed border-r-neutral-200  min-h-full">
          

          <div className="flex items-center justify-between px-8 py-5 bg-cyan-900 ">
            <Link
              to={`/profile/${user?.id}`}
              className="flex items-center mr-5"
            >
              <div className="mr-2">
                <div className="">
                  <img
                    className="w-[40px] h-[40px] min-w-[40px] rounded-full border-gray-400 border-2 "
                    src={user?.profileImage}
                    alt="profile"
                  />
                </div>
              </div>
              <div className="mr-2 ">
                <p className="text-base text-sm font-bold uppercase ">{user?.name}</p>
                <p className="text-xs text-gray-800">{user?.email}</p>
              </div>
            </Link>
          </div>

          <div className="relative pl-3 my-3 ">
            <div className="flex flex-col w-full font-medium">
              <div>
                <span className="select-none flex items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-primary  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Home
                  </NavLink>
                </span>
              </div>

              <div>
                <span className="select-none flex items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to="/post"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-primary  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Post
                  </NavLink>
                </span>
              </div>

              <div>
                <span className="select-none flex items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to="/Classification"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-primary  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Coral Classification
                  </NavLink>
                </span>
              </div>

              <div>
                <span className="select-none flex items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to="/health"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-primary  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Check Health
                  </NavLink>
                </span>
              </div>

              <div>
                <span className="select-none flex items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to="/CreateMealPlan"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-primary  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Check Quality
                  </NavLink>
                </span>
              </div>

              {/* <div>
                <span className="select-none flex items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to="/profile"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-primary  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Profile
                  </NavLink>
                </span>
              </div> */}

              <div>
                <span className="select-none flex items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to="/setting"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-primary  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Crowd Sourcing
                  </NavLink>
                </span>
              </div>

              <div className="my-20">
                <span className="select-none flex items-center px-4 py-[.175rem] cursor-pointer my-[.1rem] rounded-[.95rem]   text-white">
                  <button
                    className="flex items-center rounded-lg w-full px-2 h-10 bg-red-800 text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MainSideBar;
