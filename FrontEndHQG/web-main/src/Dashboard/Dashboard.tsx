import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
} from "@tanstack/react-location";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Hooks/AuthContext";
import { UserMenuItem } from "./UserMenuItem";
import { MainHeader } from "../Common/MainHeader";
import { LocationGenerics } from "../Router/CustomRouter";
import { Switch } from "../Common/Switch";
import { DashboardIcon } from "../Common/icons/DashboardIcon";
import { SearchIcon } from "../Common/icons/SearchIcon";
import _, { set } from "lodash";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useFollowing } from "../Hooks/useFolloweeContext";
import { Followee } from "../Services/FollowService";
import { Loader } from "../Common/Loader";

export const Dashboard = () => {
  const auth = useAuth();

  if (!auth?.user?.roles?.includes("professional")) {
    return <Navigate to={`/${auth.user?.id}/recordings`} />;
  }

  const nav = useNavigate();
  const loc = useLocation();

  const {
    params: { userId },
  } = useMatch<LocationGenerics>();

  const [menuFocus, setMenuFocus] = useState<"CONTRACT" | "EXPAND">("EXPAND");
  const [subjects, setSubjects] = useState<Followee[]>();
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [scrollPosY, setScrollPosY] = useState(0);
  const [lastnameFirst, setLastnameFirst] = useState(true);
  const [sortDesc, setSortDesc] = useState(false);

  const { followees, isLoading } = useFollowing();

  useEffect(() => {
    if (followees && followees.length > 0) {
      const search = (loc.current.search.patientSearch as string) || "";

      let userList = _.sortBy(followees, (o) => {
        const firstName = o?.user?.firstName || "";
        const lastName = o?.user?.lastName || "";
        const name = lastnameFirst
          ? `${lastName}${firstName}`.toLowerCase()
          : `${firstName}${lastName}`.toLowerCase();
        return name;
      });

      if (sortDesc) {
        userList.reverse();
      }

      if (search) {
        userList = userList.filter((followee) => {
          const firstName = followee.user.firstName?.toLowerCase() || "";
          const lastName = followee.user.lastName?.toLowerCase() || "";
          const searchLower = search.toLowerCase();
          return (
            firstName.includes(searchLower) || lastName.includes(searchLower)
          );
        });
      }

      setSubjects(userList);
    } else {
      setSubjects([]);
    }
  }, [followees, loc.current.search, sortDesc, lastnameFirst]);

  const onSearch = (value: string) => {
    nav({
      search: {
        patientSearch: value,
      },
    });
  };

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      if (event.clientX < 355) {
        setMousePos({ x: event.clientX, y: event.clientY });
      } else {
        setMousePos(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", (event) => {
      setScrollPosY(window.scrollY);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", (event) => {
        setScrollPosY(window.scrollY);
      });
    };
  }, []);

  return (
    <div className="flex flex-col  items-stretch justify-items-stretch ">
      <button
        className={` 
        ${
          menuFocus === "CONTRACT"
            ? "translate-x-[80px]"
            : "translate-x-[300px]"
        } 
        ${
          !mousePos ? "absolute bottom-[100px]" : `absolute`
        } bg-primary-red drop-shadow-md text-white h-12 rounded-r-md 
        hover:p-4
        z-50
        `}
        style={{
          ...(mousePos
            ? {
                top: mousePos.y - 24 + scrollPosY,
              }
            : {}),
        }}
        onClick={() => {
          if (menuFocus === "CONTRACT") {
            setMenuFocus("EXPAND");
          } else {
            setMenuFocus("CONTRACT");
          }
        }}
      >
        {menuFocus === "CONTRACT" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        )}
      </button>
      <MainHeader />
      <div className="flex flex-1 h-full ">
        <div
          // onMouseOver={() => {
          //   shouldHover ? setMenuFocus("EXPAND") : null
          // }}
          // onMouseOut={() => {
          //   if (!matchRoute({ to: "/:userId/dashboard" })) {
          //     setMenuFocus("CONTRACT")
          //   }
          //   !shouldHover ? setShouldHover(true) : null
          // }}
          className={`transition-all duration-100 top-16  ${
            menuFocus === "CONTRACT"
              ? " w-[80px] absolute"
              : " w-[300px] absolute shadow-md "
          } h-full  bg-charcoal z-50 `}
        >
          <div
            className={`transition-all duration-100 flex flex-row ${
              menuFocus === "EXPAND" ? "justify-start" : "justify-center"
            } px-2 mt-8 border-b-primary-grey border-b-2 pb-1`}
          >
            <Link
              to={`/${userId}/dashboard`}
              className="flex flex-row items-center mb-4"
            >
              <div className=" p-1 bg-white shadow-md text-charcoal rounded-full">
                <DashboardIcon />
              </div>
              <span
                className={`pl-3 text-white uppercase ${
                  menuFocus === "EXPAND" ? "" : "hidden"
                }`}
              >
                Dashboard
              </span>
            </Link>
          </div>
          <div className="flex p-4 text-white">
            <Switch
              defaultChecked={auth.graphsExpanded}
              onChange={() => {
                console.log("EXPAND GRAPHS: ", auth.graphsExpanded);
                auth.setGraphsExpanded();
              }}
            />
            {menuFocus === "EXPAND" ? (
              <div className="ml-2">
                {auth.graphsExpanded ? "Expanded" : "Slimline"} Graphs
              </div>
            ) : null}
          </div>

          <div className="flex flex-row align-middle mx-4 mt-4 mb-4 border-b-2 border-charcoal space-x-2 ">
            <button className="text-white">
              <SearchIcon />
            </button>
            {menuFocus === "EXPAND" && (
              <input
                type="text"
                name="search"
                id="search"
                onChange={(v) => onSearch(v.target.value)}
                value={loc.current.search.patientSearch as string}
                className="flex-1 bg-charcoal text-white active:border-b-2 border-[1px] rounded-md border-white px-2 "
              />
            )}
          </div>

          <div className="flex px-4 text-white">
            <button
              className="flex justify-center items-center gap-2"
              onClick={() => {
                setLastnameFirst(!lastnameFirst);
              }}
            >
              <span className="flex items-center">
                <UserSwitchOutlined />
              </span>
              {menuFocus === "EXPAND" ? (
                <span>
                  {lastnameFirst ? "Sort By Firstname" : "Sort By Lastname"}
                </span>
              ) : null}
            </button>
          </div>

          <div className="flex px-4 text-white">
            <button
              className="flex justify-center items-center gap-2"
              onClick={() => {
                setSortDesc(!sortDesc);
              }}
            >
              <span className="flex items-center">
                {sortDesc ? (
                  <SortDescendingOutlined />
                ) : (
                  <SortAscendingOutlined />
                )}
              </span>
              {menuFocus === "EXPAND" ? (
                <span>{sortDesc ? "Ascending order" : "Descending order"}</span>
              ) : null}
            </button>
          </div>

          {!subjects ||
            (isLoading && (
              <div className="mt-8">
                <Loader />
              </div>
            ))}
          <div
            className={`bg-charcoal pt-10 pb-16 overflow-auto scrollbar-hide max-h-[1700px]`}
          >
            {subjects &&
              subjects.map((followee, index) => {
                return (
                  <UserMenuItem
                    onClick={() => {
                      setMenuFocus("CONTRACT");
                    }}
                    key={index}
                    lastnameFirst={lastnameFirst}
                    size={menuFocus === "EXPAND" ? "WIDE" : "SMALL"}
                    id={followee.user?.id ?? ""}
                    firstName={followee.user?.firstName ?? ""}
                    lastName={followee.user?.lastName ?? ""}
                    age={followee.user.age}
                    gender={followee.user.gender}
                    accepted={followee.accepted_on !== null}
                  />
                );
              })}
            <div className="bg-primary-red text-white flex text-center justify-center">
              List end
            </div>
          </div>
        </div>
        <div className="w-full min-h-full">
          <Outlet />
        </div>
      </div>
      {/* <DisclaimerModal /> */}
    </div>
  );
};
