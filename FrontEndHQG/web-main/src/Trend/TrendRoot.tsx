import { Link, useMatch, useMatchRoute } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";
import { useActor } from "@xstate/react";
import { differenceInYears } from "date-fns";
import { useEffect, useState } from "react";
import { AddiIcon } from "../Common/icons/AddiIcon";
import { Loader } from "../Common/Loader";
import { useGetSubjectDetailsQuery } from "../generated/graphql";
import { LocationGenerics } from "../Router/CustomRouter";
import { compareMachine } from "../Services/CompareRecordingMachine";
import { Trend } from "./Trend";
import { BaseSelectItem, HQData } from "./TrendUtils";
import { developmentFeature } from "../utils/development";
import { useAuth } from "../Hooks/AuthContext";
import { SubjectContextBox } from "../Common/SubjectContextBox";

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      "X-Hasura-Admin-Secret": import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

export const TrendRoot = () => {
  const auth = useAuth();
  const {
    params: { userId, subjectId },
    data: {},
  } = useMatch<LocationGenerics>();
  const queryClient = useQueryClient();

  const matchRoute = useMatchRoute();

  const [openParents, setOpenParents] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const isParentOpen = (path: string, state: string[]) => {
    return state.includes(path);
  };
  const toggleParent = (path: string) => {
    if (openParents.includes(path)) {
      setOpenParents(openParents.filter((p) => p !== path));
    } else {
      setOpenParents([...openParents, path]);
    }
  };

  const toggleChild = (path: string) => {
    if (selectedItems.includes(path)) {
      setSelectedItems(selectedItems.filter((p) => p !== path));
    } else {
      setSelectedItems([...selectedItems, path]);
    }
  };
  const toggleMultipleChildren = (paths: string[]) => {
    if (paths.every((path) => selectedItems.includes(path))) {
      setSelectedItems(selectedItems.filter((p) => !paths.includes(p)));
    } else {
      setSelectedItems([...selectedItems, ...paths]);
    }
  };

  const { data: subject, isLoading: subjectLoading, refetch: subjectRefetch } =
    useGetSubjectDetailsQuery(
      dataSource,
      {
        _eq: subjectId || "",
        id: subjectId,
      },
      {
        enabled: !!subjectId,
      }
    );

  const isCompare = false;
  const isQuestionnaire = matchRoute({ to: "*/questionnaires" });
  const isTrend = false;

  const [_, send] = useActor(compareMachine);

  return (
    <div className="relative h-full ">
      <div className="w-[300px] absolute ml-20 z-10 inset-0 ">
        {subjectLoading ? (
          <div className="flex flex-col justify-center items-center bg-desaturated-grey h-[1080px]">
            <Loader />
            <div className="uppercase mt-2">Loading User</div>
          </div>
        ) : (
          <div className={`transition-all duration-100  `}>
            
          <SubjectContextBox 
            userId={userId}
            subjectId={subjectId}
            />

            {/* Add A Recording */}
            <div className="px-2 mt-8  pb-1">
              <Link
                to={`/${userId}/dashboard/${subjectId}`}
                className="flex flex-row items-center "
              >
                <div className="p-1 bg-primary-red shadow-md text-white rounded-full">
                  <AddiIcon />
                </div>
                <span className="pl-3">Add Recording</span>
              </Link>
            </div>
          </div>
        )}
        <div className="ml-6 mt-8">
          <div className="">
            {HQData.map((item) =>
              item.children.length > 0 ? (
                <ParentContainer
                  key={item.fullPath}
                  fullPath={item.fullPath}
                  path={item.path}
                  label={item.label}
                  toggleParent={toggleParent}
                  toggleChildren={toggleMultipleChildren}
                  isOpen={(path, state) => isParentOpen(path, state)}
                  state={openParents}
                  childrenState={selectedItems}
                  childrenFullPaths={item.children.map(
                    (child) => child.fullPath
                  )}
                >
                  {item.children.map((child) => (
                    <ChildContainer
                      key={child.fullPath}
                      fullPath={child.fullPath}
                      path={child.path}
                      label={child.label}
                      toggleChild={toggleChild}
                      isChecked={(path) => selectedItems.includes(path)}
                      state={selectedItems}
                    />
                  ))}
                </ParentContainer>
              ) : (
                <ChildContainer
                  key={item.fullPath}
                  fullPath={item.fullPath}
                  path={item.path}
                  label={item.label}
                  toggleChild={toggleChild}
                  isChecked={(path) => selectedItems.includes(path)}
                  state={selectedItems}
                />
              )
            )}
            {/* <ParentContainer
              fullPath="data"
              path="chakras"
              label="Chakras"
              toggleParent={toggleParent}
              isOpen={(path) => openParents.includes(path)}
              state={openParents}
            >
              <ChildContainer
                fullPath="data.chakras.ep1"
                path="ep1"
                label="Ep 1"
                toggleChild={toggleChild}
                isChecked={(path) => selectedItems.includes(path)}
                state={selectedItems}
              />
            </ParentContainer> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <Trend selection={selectedItems} />
      </div>
    </div>
  );
};

type ParentProps = {
  toggleChildren: (paths: string[]) => void;
  toggleParent: (path: string) => void;
  isOpen: (path: string, state: string[]) => boolean;
  state: string[];
  children: string | JSX.Element | JSX.Element[] | null;
  childrenFullPaths: string[];
  childrenState: string[];
} & BaseSelectItem;

const ParentContainer = (props: ParentProps) => {
  const [allTicked, setAllTicked] = useState(true);

  useEffect(() => {
    const checked = props.childrenFullPaths.every((path) =>
      props.childrenState.includes(path)
    );
    setAllTicked(checked);
  }, [props.childrenState]);

  return (
    <div
      className={`text-charcoal cursor-pointer`}
      onClick={() => props.toggleParent(props.path)}
    >
      <div className="text-lg bg-light-grey px-2 py-1 flex flex-row justify-between items-center">
        <div>{props.label}</div>
        <div>
          {!props.isOpen(props.path, props.state) ? (
            <ArrowDown />
          ) : (
            <ArrowLeft />
          )}
        </div>
      </div>
      <div
        className={` ${
          props.isOpen(props.path, props.state) ? "h-full" : "h-[0px]"
        } overflow-hidden`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ml-1 py-1">
          <input
            className="mr-2"
            type="checkbox"
            name={props.path}
            id={props.path}
            checked={allTicked}
            onChange={() => props.toggleChildren(props.childrenFullPaths)}
          />
          <label htmlFor={props.path}>Select All</label>
        </div>
        <div className="ml-2">{props.children}</div>
      </div>
    </div>
  );
};

type ChildProps = {
  toggleChild: (path: string) => void;
  isChecked: (path: string) => boolean;
  state: string[];
} & BaseSelectItem;

const ChildContainer = (props: ChildProps) => {
  return (
    <div className="text-red-800">
      <input
        className="mr-2"
        type="checkbox"
        checked={props.isChecked(props.fullPath)}
        onChange={() => props.toggleChild(props.fullPath)}
      />
      <label htmlFor={props.fullPath}>{props.label}</label>
    </div>
  );
};

const ArrowDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
};

const ArrowLeft = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
