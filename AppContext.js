import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

// Initial state
const initialState = {
  user: null,
  userRole: null, // 'candidate', 'recruiter', 'admin'
  jobs: [],
  applications: [],
  candidates: [],
  recruiters: [],
  isLoading: false,
  error: null
};

// Action types
export const ActionTypes = {
  SET_USER: 'SET_USER',
  SET_USER_ROLE: 'SET_USER_ROLE',
  LOGOUT: 'LOGOUT',
  ADD_JOB: 'ADD_JOB',
  UPDATE_JOB: 'UPDATE_JOB',
  DELETE_JOB: 'DELETE_JOB',
  ADD_APPLICATION: 'ADD_APPLICATION',
  UPDATE_APPLICATION: 'UPDATE_APPLICATION',
  ADD_CANDIDATE: 'ADD_CANDIDATE',
  UPDATE_CANDIDATE: 'UPDATE_CANDIDATE',
  ADD_RECRUITER: 'ADD_RECRUITER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    
    case ActionTypes.SET_USER_ROLE:
      return { ...state, userRole: action.payload };
    
    case ActionTypes.LOGOUT:
      return { ...state, user: null, userRole: null };
    
    case ActionTypes.ADD_JOB:
      return { ...state, jobs: [...state.jobs, action.payload] };
    
    case ActionTypes.UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map(job =>
          job.id === action.payload.id ? { ...job, ...action.payload } : job
        )
      };
    
    case ActionTypes.DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload)
      };
    
    case ActionTypes.ADD_APPLICATION:
      return { ...state, applications: [...state.applications, action.payload] };
    
    case ActionTypes.UPDATE_APPLICATION:
      return {
        ...state,
        applications: state.applications.map(app =>
          app.id === action.payload.id ? { ...app, ...action.payload } : app
        )
      };
    
    case ActionTypes.ADD_CANDIDATE:
      return { ...state, candidates: [...state.candidates, action.payload] };
    
    case ActionTypes.UPDATE_CANDIDATE:
      return {
        ...state,
        candidates: state.candidates.map(candidate =>
          candidate.id === action.payload.id ? { ...candidate, ...action.payload } : candidate
        )
      };
    
    case ActionTypes.ADD_RECRUITER:
      return { ...state, recruiters: [...state.recruiters, action.payload] };
    
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    
    case ActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('hirewise-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        Object.keys(parsedState).forEach(key => {
          if (key === 'jobs') {
            parsedState[key].forEach(job => dispatch({ type: ActionTypes.ADD_JOB, payload: job }));
          } else if (key === 'applications') {
            parsedState[key].forEach(app => dispatch({ type: ActionTypes.ADD_APPLICATION, payload: app }));
          } else if (key === 'candidates') {
            parsedState[key].forEach(candidate => dispatch({ type: ActionTypes.ADD_CANDIDATE, payload: candidate }));
          } else if (key === 'recruiters') {
            parsedState[key].forEach(recruiter => dispatch({ type: ActionTypes.ADD_RECRUITER, payload: recruiter }));
          } else if (key === 'user') {
            dispatch({ type: ActionTypes.SET_USER, payload: parsedState[key] });
          } else if (key === 'userRole') {
            dispatch({ type: ActionTypes.SET_USER_ROLE, payload: parsedState[key] });
          }
        });
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  
  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      user: state.user,
      userRole: state.userRole,
      jobs: state.jobs,
      applications: state.applications,
      candidates: state.candidates,
      recruiters: state.recruiters
    };
    localStorage.setItem('hirewise-state', JSON.stringify(stateToSave));
  }, [state]);

  // Helper functions
  const login = (userData, role) => {
    dispatch({ type: ActionTypes.SET_USER, payload: userData });
    dispatch({ type: ActionTypes.SET_USER_ROLE, payload: role });
  };

  const logout = () => {
    dispatch({ type: ActionTypes.LOGOUT });
  };

  const addJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      applications: [],
      status: 'active'
    };
    dispatch({ type: ActionTypes.ADD_JOB, payload: newJob });
    return newJob;
  };

  const applyToJob = (jobId, candidateData) => {
    const application = {
      id: Date.now().toString(),
      jobId,
      candidateId: candidateData.id,
      candidateName: candidateData.name,
      candidateEmail: candidateData.email,
      resumeUrl: candidateData.resumeUrl,
      matchScore: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      appliedAt: new Date().toISOString(),
      status: 'applied'
    };
    
    dispatch({ type: ActionTypes.ADD_APPLICATION, payload: application });
    
    // Update job with application
    const job = state.jobs.find(j => j.id === jobId);
    if (job) {
      dispatch({
        type: ActionTypes.UPDATE_JOB,
        payload: {
          id: jobId,
          applications: [...(job.applications || []), application]
        }
      });
    }
    
    return application;
  };

  const getJobApplications = (jobId) => {
    return state.applications.filter(app => app.jobId === jobId);
  };

  const getCandidateApplications = (candidateId) => {
    return state.applications.filter(app => app.candidateId === candidateId);
  };

  const value = {
    ...state,
    dispatch,
    login,
    logout,
    addJob,
    applyToJob,
    getJobApplications,
    getCandidateApplications
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
