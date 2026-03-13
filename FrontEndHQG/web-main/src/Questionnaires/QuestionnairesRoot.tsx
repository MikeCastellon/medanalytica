import { Link } from "@tanstack/react-location";
import React from "react";
import { Book } from "../Common/icons/Book";

export const QuestionnairesRoot = () => {
  return (
    <div className="ml-[380px]">
      <div className="mt-8 ml-8 text-2xl">Questionnaires and Question Sets</div>

      <div className="flex flex-row justify-center h-[700px] items-center gap-4">
        <Link to={`list`} className="basis-1/2 md:basis-1/2 lg:basis-1/4">
          <div className="  rounded-lg shadow-md ">
            <div className=" flex flex-row justify-center items-center h-28 gradient-background rounded-md text-white ">
              <div className="flex flex-row justify-center items-center w-24 h-24 bg-white rounded-full bg-opacity-10 ">
                <Book solid={false} />
              </div>
            </div>
            <div className="p-4">
              <div className="text-lg text-center">{"Full Questionnaires"}</div>
              {/* <div className='flex flex-row flex-wrap gap-2 mt-4'>
                {sol.tags.map((t: string) => {
                  return (
                    <div className='text-sm bg-primary-green px-2 py-1 rounded-md text-white'>{t}</div>
                  )
                })}
              </div> */}
            </div>
          </div>
        </Link>
        <Link
          to={`question-sets`}
          className="basis-1/2 md:basis-1/2 lg:basis-1/4"
        >
          <div className=" rounded-lg shadow-md ">
            <div className=" flex flex-row justify-center items-center h-28 gradient-background rounded-md text-white ">
              <div className="flex flex-row justify-center items-center w-24 h-24 bg-white rounded-full bg-opacity-10 ">
                <Book solid={false} />
              </div>
            </div>
            <div className="p-4">
              <div className="text-lg text-center">{"Question Sets"}</div>
              {/* <div className='flex flex-row flex-wrap gap-2 mt-4'>
                {sol.tags.map((t: string) => {
                  return (
                    <div className='text-sm bg-primary-green px-2 py-1 rounded-md text-white'>{t}</div>
                  )
                })}
              </div> */}
            </div>
          </div>
        </Link>
        {/* <Link to={`list`} className=''>Full Questionnaires</Link>
        <Link to={`question-sets`} className=''>Question Sets</Link> */}
      </div>
    </div>
  );
};
