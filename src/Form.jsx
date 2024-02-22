/* eslint-disable react/prop-types */
import FormStep from './FormStep';
import FormResult from './Formresult';
import { useFormContext } from './hooks/useFormContext';
import { motion } from 'framer-motion';

const Form = ({ questions }) => {
  const { state } = useFormContext();
  const currentStep = state.currentStep;

  const renderCurrentStep = () => {
    if (currentStep < questions.length) {
      const currentQuestion = questions[currentStep];
      return <FormStep key={currentQuestion.id} question={currentQuestion} />;
    } else {
      return <FormResult />;
    }
  };

  return <motion.div>{renderCurrentStep()}</motion.div>;
};

export default Form;
