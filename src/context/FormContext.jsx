/* eslint-disable react/prop-types */

import { createContext, useReducer } from 'react';

export const FormContext = createContext();

const initialState = {
  questions: JSON.parse(localStorage.getItem('questions')) || [
    {
      id: 0,
      text: 'Enter question 0',
    },
  ],
  currentStep: Number(localStorage.getItem('currentStep')) || 0,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTION_DATA':
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id === state.currentStep) {
            return {
              ...q,
              text: action.payload,
            };
          }
          return q;
        }),
      };
    case 'GOTO_NEXT_STEP':
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
    default:
      return state;
  }
};

const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setQuestionData = (stepData) => {
    dispatch({ type: 'SET_QUESTION_DATA', payload: stepData });
  };

  const setNextQuestion = () => {
    console.log('called');
    dispatch({ type: 'GOTO_NEXT_STEP' });
  };

  return (
    <FormContext.Provider value={{ state, setQuestionData, setNextQuestion }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
