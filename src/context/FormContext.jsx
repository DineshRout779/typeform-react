/* eslint-disable react/prop-types */

import { createContext, useReducer } from 'react';

export const FormContext = createContext();

const initialState = {
  questions: JSON.parse(localStorage.getItem('questions')) || [
    {
      id: 0,
      text: 'Enter question 0',
    },
  ], // questions that will be added by form creator
  formData: {}, // resposnes from the user
  previewStep: 0,
  currentStep: Number(localStorage.getItem('currentStep')) || 0, // maintain current step
  currentResponseStep: 0,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTION':
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id === state.previewStep) {
            return {
              ...q,
              text: action.payload,
            };
          }
          return q;
        }),
      };
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.id]: action.payload.value,
        },
      };
    case 'GET_NEXT_QUESTION':
      return {
        ...state,
        currentResponseStep: state.currentResponseStep + 1,
      };
    case 'SET_NEXT_QUESTION':
      return {
        ...state,
        questions: [
          ...state.questions,
          {
            id: state.currentStep + 1,
            text: 'Enter question 0',
          },
        ],
        currentStep: state.currentStep + 1,
      };
    case 'SET_PREVIEW_STEP':
      return {
        ...state,
        previewStep: action.payload,
      };
    default:
      return state;
  }
};

const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setQuestionData = (question) => {
    dispatch({ type: 'SET_QUESTION', payload: question });
  };

  const setFormData = (data) => {
    console.log(data);
    dispatch({ type: 'SET_FORM_DATA', payload: data });
  };

  const setNextQuestion = () => {
    console.log('called');
    dispatch({ type: 'SET_NEXT_QUESTION' });
  };

  const getNextQuesion = () => {
    dispatch({ type: 'GET_NEXT_QUESTION' });
  };

  const setPreviewStep = (step) => {
    dispatch({ type: 'SET_PREVIEW_STEP', payload: step });
  };

  return (
    <FormContext.Provider
      value={{
        state,
        setQuestionData,
        setFormData,
        setNextQuestion,
        getNextQuesion,
        setPreviewStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
