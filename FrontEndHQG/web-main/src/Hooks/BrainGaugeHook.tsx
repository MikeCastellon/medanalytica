import { useEffect, useReducer, useCallback } from "react";
import {
  checkAuth,
  getBrainGaugeData,
  loginToBrainGauge,
  logoutFromBrainGauge,
  getBrainGaugeSubjects,
} from "../Services/BrainGaugeService";

// Type definitions
interface Subject {
  userId: number;
  number: string;
  birthYear: number;
  gender: "male" | "female" | "other" | string;
  handedness: "left" | "right" | "ambidextrous" | string;
  race: string;
  pin: string | null;
  history: any[];
  mongoId: string;
  createdAt: string;
  updatedAt: string;
  lastDataTime: string;
  sessionCount: number;
  isRemote: boolean;
  _id: number;
}

interface BrainGaugeData {
  [key: string]: any;
}

interface WithSubjects {
  subjects: Subject[];
}

type MachineState =
  | { status: "idle" }
  | { status: "authenticating" }
  | { status: "authentication_failed"; error: string }
  | { status: "loading_subjects" }
  | { status: "subjects_error"; error: string }
  | ({ status: "subject_selection" } & WithSubjects)
  | ({ status: "subject_not_found"; searchedNumber: string } & WithSubjects)
  | ({ status: "loading_data"; selectedSubject: Subject } & WithSubjects)
  | ({
      status: "data_error";
      selectedSubject: Subject;
      error: string;
    } & WithSubjects)
  | ({
      status: "ready";
      selectedSubject: Subject;
      data: BrainGaugeData;
    } & WithSubjects);

type MachineEvent =
  | { type: "START_AUTH"; payload: { username: string; password: string } }
  | { type: "AUTH_SUCCESS" }
  | { type: "AUTH_FAILURE"; error: string }
  | { type: "LOAD_SUBJECTS" }
  | { type: "SUBJECTS_LOADED"; subjects: Subject[] }
  | { type: "SUBJECTS_LOAD_ERROR"; error: string }
  | { type: "LOOKUP_SUBJECT_NUMBER"; subjectNumber: string }
  | { type: "KNOWN_SUBJECT"; subject: Subject }
  | { type: "SUBJECT_NOT_FOUND"; searchedNumber: string }
  | { type: "LOAD_SUCCESS"; data: BrainGaugeData }
  | { type: "LOAD_FAILURE"; error: string }
  | { type: "LOGOUT" }
  | { type: "RETRY" };

interface BrainGaugeHook {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  selectSubjectByNumber: (subjectNumber: string) => void;
  setKnownSubject: (subject: Subject) => void;
  refetchData: () => Promise<void>;
  refetchSubjects: () => Promise<void>;
  state: MachineState;
  isLoading: boolean;
  isAuthenticated: boolean;
  data: BrainGaugeData | null;
  error: string | null;
  selectedSubject: Subject | null;
}

const initialState: MachineState = { status: "idle" };

function reducer(state: MachineState, event: MachineEvent): MachineState {
  switch (state.status) {
    case "idle":
      if (event.type === "START_AUTH") {
        return { status: "authenticating" };
      }
      if (event.type === "AUTH_SUCCESS") {
        return { status: "loading_subjects" };
      }
      break;

    case "authenticating":
      if (event.type === "AUTH_SUCCESS") {
        return { status: "loading_subjects" };
      }
      if (event.type === "AUTH_FAILURE") {
        return { status: "authentication_failed", error: event.error };
      }
      break;

    case "authentication_failed":
      if (event.type === "START_AUTH") {
        return { status: "authenticating" };
      }
      if (event.type === "RETRY") {
        return { status: "idle" };
      }
      break;

    case "loading_subjects":
      if (event.type === "SUBJECTS_LOADED") {
        return {
          status: "subject_selection",
          subjects: event.subjects,
        };
      }
      if (event.type === "SUBJECTS_LOAD_ERROR") {
        return { status: "subjects_error", error: event.error };
      }

      break;

    case "subjects_error":
      if (event.type === "RETRY") {
        return { status: "loading_subjects" };
      }
      if (event.type === "LOGOUT") {
        return { status: "idle" };
      }
      break;

    case "subject_selection":
    case "subject_not_found":
      if (event.type === "LOOKUP_SUBJECT_NUMBER") {
        const subject = state.subjects.find(
          (s) => s.number.toLowerCase() === event.subjectNumber.toLowerCase()
        );
        if (subject) {
          return {
            status: "loading_data",
            selectedSubject: subject,
            subjects: state.subjects,
          };
        } else {
          return {
            status: "subject_not_found",
            searchedNumber: event.subjectNumber,
            subjects: state.subjects,
          };
        }
      }
      if (event.type === "KNOWN_SUBJECT") {
        if (event.subject) {
          return {
            status: "loading_data",
            selectedSubject: event.subject,
            subjects: state.subjects,
          };
        }
      }
      if (event.type === "LOGOUT") {
        return { status: "idle" };
      }
      break;

    case "loading_data":
      if (event.type === "LOAD_SUCCESS") {
        return {
          status: "ready",
          selectedSubject: state.selectedSubject,
          data: event.data,
          subjects: state.subjects,
        };
      }
      if (event.type === "LOAD_FAILURE") {
        return {
          status: "data_error",
          selectedSubject: state.selectedSubject,
          error: event.error,
          subjects: state.subjects,
        };
      }
      if (event.type === "LOGOUT") {
        return { status: "idle" };
      }
      break;

    case "data_error":
      if (event.type === "RETRY") {
        return {
          status: "loading_data",
          selectedSubject: state.selectedSubject,
          subjects: state.subjects,
        };
      }
      if (event.type === "LOOKUP_SUBJECT_NUMBER") {
        const subject = state.subjects.find(
          (s) => s.number.toLowerCase() === event.subjectNumber.toLowerCase()
        );
        if (subject) {
          return {
            status: "loading_data",
            selectedSubject: subject,
            subjects: state.subjects,
          };
        } else {
          return {
            status: "subject_not_found",
            searchedNumber: event.subjectNumber,
            subjects: state.subjects,
          };
        }
      }
      if (event.type === "LOGOUT") {
        return { status: "idle" };
      }
      break;

    case "ready":
      if (event.type === "LOOKUP_SUBJECT_NUMBER") {
        const subject = state.subjects.find(
          (s) => s.number.toLowerCase() === event.subjectNumber.toLowerCase()
        );
        if (subject) {
          return {
            status: "loading_data",
            selectedSubject: subject,
            subjects: state.subjects,
          };
        } else {
          return {
            status: "subject_not_found",
            searchedNumber: event.subjectNumber,
            subjects: state.subjects,
          };
        }
      }
      if (event.type === "LOGOUT") {
        return { status: "idle" };
      }
      break;
  }

  return state;
}

export function useBrainGaugeHook(): BrainGaugeHook {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Check authentication on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuthenticated = await checkAuth();

        if (isAuthenticated) {
          dispatch({ type: "AUTH_SUCCESS" });
        }
      } catch (err) {
        console.error("Error during authentication check:", err);
      }
    };

    if (state.status === "idle") {
      verifyAuth();
    }
  }, []);

  // Load subjects after authentication
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const subjects = await getBrainGaugeSubjects();
        dispatch({ type: "SUBJECTS_LOADED", subjects });
      } catch (err) {
        console.error("Error loading subjects:", err);
        dispatch({
          type: "SUBJECTS_LOAD_ERROR",
          error: "Failed to load subjects. Please try again.",
        });
      }
    };

    if (state.status === "loading_subjects") {
      loadSubjects();
    }
  }, [state.status]);

  // Handle data loading when subject changes
  useEffect(() => {
    const loadData = async (subject: Subject) => {
      try {
        const data = await getBrainGaugeData(subject._id.toString());
        dispatch({ type: "LOAD_SUCCESS", data });
      } catch (err) {
        console.error("Error fetching BrainGauge data:", err);
        dispatch({
          type: "LOAD_FAILURE",
          error: "Failed to fetch BrainGauge data.",
        });
      }
    };

    if (state.status === "loading_data") {
      loadData(state.selectedSubject);
    }
  }, [state.status]);

  const login = useCallback(async (username: string, password: string) => {
    dispatch({ type: "START_AUTH", payload: { username, password } });

    try {
      const response = await loginToBrainGauge(username, password);
      if (response.message === "Login successful") {
        dispatch({ type: "AUTH_SUCCESS" });
      } else {
        dispatch({
          type: "AUTH_FAILURE",
          error: response.message || "Login failed.",
        });
      }
    } catch (err) {
      console.error("Login failed:", err);
      dispatch({
        type: "AUTH_FAILURE",
        error: "An error occurred during login. Please check your credentials.",
      });
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutFromBrainGauge();
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.error("Logout failed:", err);
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  const setKnownSubject = useCallback((subject: Subject) => {
    if (subject) {
      dispatch({ type: "KNOWN_SUBJECT", subject: subject });
    }
  }, []);

  const selectSubjectByNumber = useCallback((subjectNumber: string) => {
    dispatch({ type: "LOOKUP_SUBJECT_NUMBER", subjectNumber });
  }, []);

  const refetchData = useCallback(() => {
    dispatch({ type: "RETRY" });
    return Promise.resolve();
  }, []);

  const refetchSubjects = useCallback(() => {
    if (!["idle", "authenticating"].includes(state.status)) {
      dispatch({ type: "LOAD_SUBJECTS" });
    }
    return Promise.resolve();
  }, [state.status]);

  // Compute derived state
  const isLoading = [
    "authenticating",
    "loading_subjects",
    "loading_data",
  ].includes(state.status);
  const isAuthenticated = ![
    "idle",
    "authenticating",
    "authentication_failed",
  ].includes(state.status);
  const data = state.status === "ready" ? state.data : null;
  const error = [
    "authentication_failed",
    "subjects_error",
    "data_error",
    "subject_not_found",
  ].includes(state.status)
    ? state.status === "subject_not_found"
      ? `Subject number "${(state as any).searchedNumber}" not found`
      : (state as any).error
    : null;
  const selectedSubject = ["loading_data", "data_error", "ready"].includes(
    state.status
  )
    ? (state as any).selectedSubject
    : null;

  return {
    login,
    logout,
    selectSubjectByNumber,
    setKnownSubject,
    refetchData,
    refetchSubjects,
    state,
    isLoading,
    isAuthenticated,
    data,
    error,
    selectedSubject,
  };
}
