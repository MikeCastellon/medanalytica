import {
  Link,
  MakeGenerics,
  Navigate,
  Outlet,
  ReactLocation,
  Router,
  useLocation,
  useMatch,
  useRouter,
} from '@tanstack/react-location';
import { ReactLocationDevtools } from '@tanstack/react-location-devtools';
import { useQueryClient } from '@tanstack/react-query';
import { Account } from '../Account/Account';
import { useAuth } from '../Hooks/AuthContext';
import { Login } from '../Authentication/Screens/Login';
import { SignUp } from '../Authentication/Screens/SignUp';
import { Dashboard } from '../Dashboard/Dashboard';
import { RecordingLayout } from '../Dashboard/RecordingLayout';
import { SubjectRecordingLayout } from '../Dashboard/SubjectRecordingLayout';
import { Followers } from '../generated/graphql';
import { Cardio } from '../SinglePage/Cardio';
import { Summary } from '../SinglePage/Summary';
import { NervousSystem } from '../SinglePage/NervousSystem';
import { MineralsHormones } from '../SinglePage/MineralsHormones';
import { Ayurvedic } from '../SinglePage/Ayurvedic';
import { Chinese } from '../SinglePage/Chinese';
import { Brain } from '../SinglePage/Brain';
import axios from 'axios';
import { SubjectBase } from '../Dashboard/SubjectBase';
import { VagusNerve } from '../SinglePage/VagusNerve';
import { DashboardBase } from '../Dashboard/DashboardBase';
import { ForgotPassword } from '../Authentication/Screens/ForgotPassword';
import { Solutions } from '../SinglePage/Solutions';
import { SolutionSingle } from '../SinglePage/SolutionSingle';
import { RecordingCompareLayout } from '../Dashboard/RecordingCompareLayout';
import { NervousCompare } from '../ComparePages/NervousCompare';
import { MineralsCompare } from '../ComparePages/MineralsCompare';
import { BrainCompare } from '../ComparePages/BrainCompare';
import { AyurvedicCompare } from '../ComparePages/AyurvedicCompare';
import { ChineseCompare } from '../ComparePages/ChineseCompare';
import { CardioCompare } from '../ComparePages/CardioCompare';
import { UserProvider } from '../Hooks/UserContext';
import { QuestionnaireMain } from '../Questionnaires/QuestionnaireMain';
import { QuestionnairesRoot } from '../Questionnaires/QuestionnairesRoot';
import { ListQuestionnaires } from '../Questionnaires/ListQuestionnaires';
import { ListQuestionSets } from '../Questionnaires/ListQuestionSets';
import { QuestionSetLayout } from '../Questionnaires/QuestionSetLayout';
import { QuestionnaireLayout } from '../Questionnaires/QuestionnaireLayout';
import { QuestionnaireAnswerGroups } from '../Questionnaires/QuestionnaireAnswerGroups';
import { AnswerGroupNotSelected } from '../Questionnaires/AnswerGroupNotSelected';
import { AnswerGroupDisplay } from '../Questionnaires/AnswerGroupDisplay';
import { Tutorials } from '../SinglePage/Tutorials';
import { TutorialSingle } from '../SinglePage/TutorialSingle';
import { QuestionSetView } from '../Questionnaires/QuestionSetView';
import { AnswerSetDisplay } from '../Questionnaires/AnswerSetDisplay';
import { BasicUserRecordingsLayout } from '../basicUser/BasicUserRecordingsLayout';
import { BasicUserRecordingLayout } from '../basicUser/BasicUserRecordingLayout';
import { UserSummaryPage } from '../basicUser/recordingPages/UserSummaryPage';
import { BasicUserQuestionnaireLayout } from '../basicUser/BasicUserQuestionnaireLayout';
import { QuestionnairesQuestionSets } from '../basicUser/questionnairePages/QuestionnairesQuestionSets';
import { ListUserQuestionnaires } from '../basicUser/questionnairePages/ListUserQuestionnaires';
import { ListUserQuestionSets } from '../basicUser/questionnairePages/ListUserQuestionSets';
import { FillQuestionnaireById } from '../basicUser/questionnairePages/FillQuestionnaireById';
import { QuestionnairesWrapper } from '../basicUser/questionnairePages/QuestionnairesWrapper';
import { UserAnswerGroupDisplay } from '../basicUser/questionnairePages/UserAnswerGroupDisplay';
import { QuestionSetWrapper } from '../basicUser/questionnairePages/QuestionSetWrapper';
import { FillQuestionSetById } from '../basicUser/questionnairePages/FillQuestionSetById';
import { UserAnswerDisplay } from '../basicUser/questionnairePages/UserAnswerDisplay';
import { BasicUserEcgRecording } from '../basicUser/BasicUserEcgRecording';
import { RootRedirect } from './RootRedirect';
import { CellDanger } from '../SinglePage/CellDanger';
import { Admin } from '../SuperAdmin/Admin';
import BrainGauge from '../SinglePage/BrainGauge';
import BodyCompAnalysis from '../SinglePage/BodyCompAnalysis';
import { Immune } from '../SinglePage/Immune';
import { TrendRoot } from '../Trend/TrendRoot';
import { TestBioAge } from '../SinglePage/TestBioAge';
import { FollowProvider } from '../Hooks/useFolloweeContext';
import { AdminWrapper } from '../SuperAdmin/AdminWrapper';
import { AdminConnect } from '../SuperAdmin/AdminConnect';
import { RedirectToRecording } from '../Dashboard/RedirectToRecording';
import DashboardMenu from '../Dashboard/DashboardMenu';
import NavigationChangeTooltip from '../Dashboard/NavigationChangeTooltip';
import { useRef } from 'react';
import { AdrenalTestWrapper } from '../AdrenalTest/AdrenalTestWrapper';
import { OxidativeStressWrapper } from '../OxidativeStressTest/OxidativeStressWrapper';

const DashboardLoading = () => {
  return (
    <div className="flex flex-col h-full justify-center items-center mt-4 ">
      <div className="flex flex-col justify-center items-center p-12 border-2 border-desaturated-grey rounded-md shadow-lg">
        <svg
          aria-hidden="true"
          className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-charcoal"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
        <h2 className="mt-4">Getting your HQ data</h2>
      </div>
    </div>
  );
};

const ProtectedRoute = () => {
  const auth = useAuth();
  const location = useLocation();
  const queryClient = useQueryClient();

  const {
    params: { userId },
  } = useMatch<LocationGenerics>();

  const { error } = useMatch();

  if (error) {
    console.log('ERROR CAUGHT in Protected Route: ', error);
  }

  if (auth.status === 'loggedIn' && userId) {
    if (userId !== auth?.user?.id) {
      queryClient.clear();
      return <Navigate to={`/`} />;
    }
    return (
      <UserProvider>
        <FollowProvider>
          <Outlet />
        </FollowProvider>
      </UserProvider>
    );
  } else {
    return <Navigate to={`/login?next=${location.current.href}`} />;
  }
};

// type User = {
//   birthDate: string;
//   firstName: string;
//   email: string;
// };
// type UserByPk = {
//   birth_date: string;
//   data: string;
//   first_name: string;
//   last_name: string;
// };

export type LocationGenerics = MakeGenerics<{
  Params: {
    userId: string;
    subjectId: string;
    recordingId: string;
    questionSetId: string;
    questionnaireId: string;
    answerGroupId: string;
    answerSetId: string;
    tutorialId: string;
  };
  LoaderData: {
    practitioner: {
      followers: Followers[];
      all: {
        aggregate: {
          count: number;
        };
      };
      accpted: {
        aggregate: {
          count: number;
        };
      };
      pending: {
        aggregate: {
          count: number;
        };
      };
    };

    ecgData: any[];
    // currentRecording: Heart_Data | null,
    schemaVersion: string | number | undefined;
  };
}>;

const location = new ReactLocation<LocationGenerics>();

export const CustomRouter = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const navRef = useRef(null);

  return (
    <Router
      //key={Math.random()} // Used for now to update routes on login, otherwise router gets stuck on blank dashboard
      location={location}
      defaultPendingElement={
        <div className="absolute top-52 left-96 z-50 text-red-600">
          Loading...
        </div>
      }
      routes={[
        {
          path: '/',
          element: <RootRedirect />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
        {
          path: '/forgotPassword',
          element: <ForgotPassword />,
        },
        {
          path: ':userId',
          element: <ProtectedRoute />,
          children: [
            {
              path: 'recordings',
              element: <BasicUserRecordingsLayout />,
              loader: async ({ params: { userId } }) => {
                return {
                  userId: userId,
                  schemaVersion: await queryClient.fetchQuery(
                    ['schemaVersion'],
                    () =>
                      axios({
                        url: `${import.meta.env.VITE_API_URL}/schema_version`,
                        method: 'GET',
                      }).then((d) => d.data)
                  ),
                };
              },
              children: [
                {
                  path: ':recordingId',
                  element: <BasicUserRecordingLayout />,
                  children: [
                    {
                      path: '/',
                      element: <UserSummaryPage />,
                    },
                    {
                      path: 'sub',
                      element: <div>Sub Page Here</div>,
                    },
                  ],
                },
                {
                  path: '/',
                  element: <BasicUserEcgRecording />,
                },
              ],
            },
            {
              path: 'questionnaires',
              element: <BasicUserQuestionnaireLayout />,
              children: [
                {
                  path: '/',
                  element: <QuestionnairesQuestionSets />,
                },
                {
                  path: 'questionnaires/:questionnaireId',
                  element: <QuestionnairesWrapper />,
                  children: [
                    {
                      path: ':answerGroupId',
                      element: <UserAnswerGroupDisplay />,
                    },
                    {
                      path: '/',
                      element: <FillQuestionnaireById />,
                    },
                  ],
                },
                {
                  path: 'questionsets/:questionSetId',
                  element: <QuestionSetWrapper />,
                  children: [
                    {
                      path: ':answerSetId',
                      element: <UserAnswerDisplay />,
                    },
                    {
                      path: '/',
                      element: <FillQuestionSetById />,
                    },
                  ],
                },
                {
                  path: 'questionnaires',
                  element: <ListUserQuestionnaires />,
                },
                {
                  path: 'questionsets',
                  element: <ListUserQuestionSets />,
                },
              ],
            },
            {
              path: 'dashboard',
              element: <Dashboard />,
              loader: async ({ params: { userId }, search }) => {
                return {
                  userId: userId,
                  schemaVersion: await queryClient.fetchQuery(
                    ['schemaVersion'],
                    () =>
                      axios({
                        url: `${import.meta.env.VITE_API_URL}/schema_version`,
                        method: 'GET',
                      }).then((d) => d.data)
                  ),
                };
              },
              pendingElement: async () => <DashboardLoading />,
              pendingMs: 0,
              children: [
                {
                  path: ':subjectId',
                  element: (
                    <div className="flex flex-col">
                      <div className="ml-[83px]" ref={navRef}>
                        <DashboardMenu />
                        <NavigationChangeTooltip navRef={navRef} />
                      </div>
                      <Outlet />
                    </div>
                  ),
                  children: [
                    {
                      path: 'adrenal-test',
                      element: <AdrenalTestWrapper />,
                    },
                    {
                      path: 'oxidative-test',
                      element: <OxidativeStressWrapper />,
                    },
                    {
                      path: 'trend',
                      element: <TrendRoot />,
                    },
                    {
                      path: 'questionnaires',
                      element: <QuestionnaireMain />,
                      children: [
                        {
                          path: '/',
                          element: <QuestionnairesRoot />,
                        },
                        {
                          path: 'list/:questionnaireId/fill',
                          element: <QuestionnaireLayout />,
                        },
                        {
                          path: 'list/:questionnaireId/view',
                          element: <QuestionnaireAnswerGroups />,
                          children: [
                            {
                              path: ':answerGroupId',
                              element: <AnswerGroupDisplay />,
                            },
                            {
                              path: '/',
                              element: <AnswerGroupNotSelected />,
                            },
                          ],
                        },
                        {
                          path: 'list',
                          element: <ListQuestionnaires />,
                        },
                        {
                          path: 'question-sets/:questionSetId/fill',
                          element: <QuestionSetLayout />,
                        },
                        {
                          path: 'question-sets/:questionSetId/view',
                          element: <QuestionSetView />,
                          children: [
                            {
                              path: ':answerSetId',
                              element: <AnswerSetDisplay />,
                            },
                            {
                              path: '/',
                              element: <AnswerGroupNotSelected />,
                            },
                          ],
                        },
                        {
                          path: 'question-sets',
                          element: <ListQuestionSets />,
                        },
                      ],
                    },
                    {
                      path: 'r',
                      element: <SubjectRecordingLayout />,
                      children: [
                        {
                          path: 'compare',
                          element: <RecordingCompareLayout />,
                          children: [
                            {
                              path: '/',
                              element: <CardioCompare />,
                            },
                            {
                              path: 'nervous-system',
                              element: <NervousCompare />,
                            },
                            {
                              path: 'minerals-hormones',
                              element: <MineralsCompare />,
                            },
                            {
                              path: 'brain',
                              element: <BrainCompare />,
                            },
                            {
                              path: 'ayurvedic',
                              element: <AyurvedicCompare />,
                            },
                            {
                              path: 'chinese',
                              element: <ChineseCompare />,
                            },
                          ],
                        },
                        {
                          path: 'single/:recordingId',
                          errorElement: async () => (
                            <RedirectOnRecordingError />
                          ),
                          element: <RecordingLayout />,
                          children: [
                            {
                              path: '/',
                              element: <Summary />,
                            },
                            {
                              path: 'cardio',
                              element: <Cardio />,
                            },
                            {
                              path: 'nervous-system',
                              element: <NervousSystem />,
                            },
                            {
                              path: 'minerals-hormones',
                              element: <MineralsHormones />,
                            },
                            {
                              path: 'ayurvedic',
                              element: <Ayurvedic />,
                            },
                            {
                              path: 'chinese',
                              element: <Chinese />,
                            },
                            {
                              path: 'brain',
                              element: <Brain />,
                            },
                            {
                              path: 'immune',
                              element: <Immune />,
                            },
                            {
                              path: 'vagus-nerve',
                              element: <VagusNerve />,
                            },
                            {
                              path: 'cell-danger',
                              element: <CellDanger />,
                            },
                            {
                              path: 'solutions',
                              element: <Solutions />,
                            },
                            {
                              path: 'test-bio',
                              element: <TestBioAge />,
                            },
                          ],
                        },
                        {
                          path: '/',
                          element: <SubjectBase />,
                        },
                      ],
                    },
                    {
                      path: 'tutorials/:tutorialId',
                      element: <TutorialSingle />,
                    },
                    {
                      path: 'tutorials',
                      element: <Tutorials />,
                    },
                    {
                      path: 'solutions/:solutionId',
                      element: <SolutionSingle />,
                    },
                    {
                      path: 'solutions',
                      element: <Solutions />,
                    },

                    {
                      path: 'brain-gauge',
                      element: <BrainGauge />,
                    },
                    {
                      path: 'body-comp',
                      element: <BodyCompAnalysis />,
                    },
                    {
                      path: '/',
                      element: <RedirectToRecording />,
                    },
                  ],
                },
                {
                  path: '/',
                  element: <DashboardBase />,
                },
              ],
            },
            {
              path: 'account',
              element: <Account />,
            },
            {
              path: 'admin',
              element: <AdminWrapper />,
              children: [
                {
                  path: '/',
                  element: <Admin />,
                },
                {
                  path: 'connect',
                  element: <AdminConnect />,
                },
              ],
            },
            {
              path: '/',
              element: <RootRedirect />,
            },
          ],
        },
      ]}
    >
      <Outlet />
      {/* <ReactLocationDevtools initialIsOpen={false} position="bottom-right" /> */}
    </Router>
  );
};

const RedirectOnRecordingError = () => {
  console.log('Got Error');

  return <div>Got Huge Error</div>;
};
