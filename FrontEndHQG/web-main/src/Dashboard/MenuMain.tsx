import { Link, useMatch } from "@tanstack/react-location";
import { Ayurvedic } from "../Common/icons/Ayurvedic";
import { Book } from "../Common/icons/Book";
import { Brain } from "../Common/icons/Brain";
import { CheckIcon } from "../Common/icons/CheckIcon";
import { Chinese } from "../Common/icons/Chinese";
import { Heart } from "../Common/icons/Heart";
import { Minerals } from "../Common/icons/Minerals";
import { Nerve } from "../Common/icons/Nerve";
import { NervousSystem } from "../Common/icons/NervousSystem";
import { Summary } from "../Common/icons/Summary";
import { useAuth } from "../Hooks/AuthContext";
import { Battery } from "../Common/icons/Battery";
import { CellDangerResp } from "../Common/icons/CellDangerResp";
import { ImmuneIcon } from "../Common/icons/Immune";
import { developmentFeature } from "../utils/development";

export const MenuMain = () => {
  const auth = useAuth();

  const development = developmentFeature(auth);
  return (
    <>
      <div className=" flex flex-col lg:flex-row lg:flex-wrap items-stretch gap-1 py-2 px-2">
        {(
          [
            [".", "Summary", false, Summary, true],
            ["cardio", "Cardio", true, Heart, true],
            ["nervous-system", "Nervous System", false, NervousSystem, true],
            ["minerals-hormones", "Minerals Hormones", false, Minerals, true],
            ["brain", "Brain", false, Brain, true],
            ["ayurvedic", "Ayurvedic", false, Ayurvedic, true],
            ["chinese", "Chinese Medicine", false, Chinese, true],
            ["vagus-nerve", "Vagus Nerve", false, Nerve, true],
            ["cell-danger", "Cell Danger", false, CellDangerResp, true],
            ["immune", "Immune", false, ImmuneIcon, true],
            ["test-bio", "Bio Age", false, Battery, development],
          ] as const
        ).map(([to, label, search, icon, shouldShow]) => {
          return shouldShow ? (
            <Link
              key={to}
              to={to}
              // search={search}
              className={`flex flex-row items-center gap-1 xl:block text-center pt-2 pb-1 px-2  hover:bg-light-grey rounded-md leading-4 whitespace-pre-line font-light`}
              activeOptions={{ exact: to === "." }}
              getActiveProps={() => {
                return { className: `font-bold bg-light-grey ` };
              }}
            >
              <div className="flex justify-center mb-1">
                {icon ? icon() : <CheckIcon />}
              </div>
              <div className="hidden lg:flex text-center justify-center">
                {label.split(" ").join("\n")}
              </div>
              <div className="lg:hidden">{label}</div>
            </Link>
          ) : null;
        })}
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-wrap items-stretch gap-1 py-2 px-2">
        </div>
        {/* <NotesModal /> */}
      </div>
    </>
  );
};
