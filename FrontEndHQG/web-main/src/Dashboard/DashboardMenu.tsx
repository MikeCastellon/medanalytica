import { useState } from 'react';
import { Summary } from '../Common/icons/Summary';
import { Link, useLocation, useMatch } from '@tanstack/react-location';
import { BodyComp } from '../Common/icons/BodyComp';
import { BrainGauge } from '../Common/icons/BrainGauge';
import { SolutionsyIcon } from '../Common/icons/Solutions';
import { RecordingsPageIcon } from '../Common/icons/RecordingsPageIcon';
import { CompareRecordingsIcon } from '../Common/icons/CompareRecordingsIcon';
import { TrendPageIcon } from '../Common/icons/TrendPageIcon';
import { AdrenalTestPageIcon } from '../Common/icons/AdrenalTestPageIcon';
import { OxidativeTestPageIcon } from '../Common/icons/OxidativeTestPageIcon';
import { QuestionnairesPageIcon } from '../Common/icons/QuestionnairesPageIcon';
import { developmentFeature } from '../utils/development';
import { useAuth } from '../Hooks/AuthContext';

const HorizontalMenu = () => {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const match = useMatch();
  const userid = match.params.userId;
  const subjectid = match.params.subjectId;
  const rootPath = `/${userid}/dashboard/${subjectid}/`;

  // Menu items
  const menuItems = [
    {
      id: 1,
      title: 'Recordings',
      url: `${rootPath}/r`,
      icon: RecordingsPageIcon,
      shouldShow: true,
    },
    {
      id: 2,
      title: 'Compare',
      url: `${rootPath}/r/compare`,
      icon: CompareRecordingsIcon,
      shouldShow: true,
    },
    {
      id: 3,
      title: 'Trend',
      url: `${rootPath}/trend`,
      icon: TrendPageIcon,
      shouldShow: true,
    },
    {
      id: 4,
      title: 'Questionnaires',
      url: `${rootPath}/questionnaires`,
      icon: QuestionnairesPageIcon,
      shouldShow: true,
    },
    {
      id: 5,
      title: 'Solutions',
      url: `${rootPath}/solutions`,
      icon: SolutionsyIcon,
      shouldShow: true,
    },
    {
      id: 6,
      title: 'Brain Gauge',
      url: `${rootPath}/brain-gauge`,
      icon: BrainGauge,
      shouldShow: true,
    },
    {
      id: 7,
      title: 'BIA',
      url: `${rootPath}/body-comp`,
      icon: BodyComp,
      shouldShow: true,
    },
    {
      id: 8,
      title: 'Tutorials',
      url: `${rootPath}/tutorials`,
      icon: Summary,
      shouldShow: true,
    },
    {
      id: 9,
      title: 'Adrenal Test',
      url: `${rootPath}/adrenal-test`,
      icon: AdrenalTestPageIcon,
      shouldShow: true,
    },
    {
      id: 10,
      title: 'Oxidative Test',
      url: `${rootPath}/oxidative-test`,
      icon: OxidativeTestPageIcon,
      shouldShow: true,
    },
  ];

  return (
    <div className="flex flex-row ">
      <div className="w-[297px]  border-gray-200 border-r "></div>
      <nav className="flex-1 bg-white border-b border-gray-200  relative pl-2 ">
        <div className="w-full">
          <div className="flex flex-row items-start">
            <div className="hidden xl:flex items-stretch gap-1 pr-2">
              {menuItems.map((item) => (
                <>
                  {item.shouldShow ? (
                    <Link
                      key={item.id}
                      to={item.url}
                      activeOptions={{ exact: item.url === `${rootPath}` }}
                      getActiveProps={() => {
                        return { className: `font-bold bg-light-grey` };
                      }}
                      className=" text-gray-700 hover:text-blue-600 font-medium transition duration-300 border-b-2 border-transparent hover:border-blue-600 flex items-center"
                    >
                      <div className="w-8 ">
                        {item.icon ? item.icon() : null}
                      </div>
                      <span className="pr-2 text-sm">{item.title}</span>
                    </Link>
                  ) : null}
                </>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-end mt-1 mb-1">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="outline-none p-2 focus:outline-none z-50"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`xl:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto pt-16 px-3 pb-4 flex flex-col gap-2">
            {menuItems.map((item) => (
              <>
                {item.shouldShow ? (
                  <Link
                    key={item.id}
                    to={item.url}
                    onClick={() => setIsOpen(false)}
                    activeOptions={{ exact: item.url === `${rootPath}/r` }}
                    getActiveProps={() => {
                      return { className: `font-bold bg-light-grey` };
                    }}
                    className="py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium rounded-md transition duration-300 flex items-center"
                  >
                    <div className="mr-3">{item.icon ? item.icon() : null}</div>
                    <span>{item.title}</span>
                  </Link>
                ) : null}
              </>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HorizontalMenu;
