import { Link, useLocation } from "@tanstack/react-location";
import React from "react";

interface UserMenuItemProps {
  lastnameFirst: boolean;
  size: "SMALL" | "WIDE";
  id: string;
  firstName: string;
  lastName: string;
  age: number | string;
  gender: string;
  accepted?: boolean;
  onClick?: () => void;
}

export const UserMenuItem = ({
  lastnameFirst,
  size,
  id,
  firstName,
  lastName,
  age,
  gender = "",
  accepted,
  onClick,
}: UserMenuItemProps) => {
  const location = useLocation();
  return (
    <Link
      to={`${id}${location.current.searchStr}`}
      onClick={() => (onClick ? onClick() : null)}
    >
      {(props) =>
        size === "SMALL" ? (
          <div
            className={`
            ${
              props.isActive ? "bg-primary-grey" : ""
            } flex flex-col w-full  pt-2 pb-1  hover:bg-light-grey `}
          >
            <div className="flex h-10 w-10 bg-light-grey rounded-full uppercase justify-center items-center text-2xl ml-4">
              {lastnameFirst
                ? lastName[0] + "" + firstName[0]
                : firstName[0] + "" + lastName[0]}
            </div>
            <div className=" h-[8px] text-xs text-white mt-1 w-20 px-1 text-ellipsis overflow-hidden whitespace-nowrap ">
              {/* {firstName} {lastName} */}
            </div>
          </div>
        ) : (
          <div
            className={` ${
              props.isActive ? "bg-primary-grey " : ""
            } flex flex-row h-16 px-2 pt-1 border-light-grey border-b-[1px] hover:bg-light-grey text-light-grey hover:text-charcoal cursor-pointer `}
          >
            <div className="flex flex-col w-full ">
              <div className="text-lg capitalize">
                {lastnameFirst
                  ? lastName + " " + firstName
                  : firstName + " " + lastName}
              </div>
              <div className=" text-xs ">
                Age: {age} - {gender}
              </div>
            </div>
            <div className=" w-6 flex flex-col justify-center items-center  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        )
      }
    </Link>
  );
};
