/* eslint-disable react/prop-types */

import { createContext, useReducer } from 'react';

export const FormContext = createContext();

const initialState = {
  formData: {},
  currentStep: 0,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    default:
      return state;
  }
};

const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setformData = (stepData) => {
    dispatch({ type: 'SET_FORM_DATA', payload: stepData });
  };

  const setCurrentStep = (stepData) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: stepData });
  };

  return (
    <FormContext.Provider value={{ state, setformData, setCurrentStep }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
