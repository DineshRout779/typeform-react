/* eslint-disable react/prop-types */

import { useFormContext } from './hooks/useFormContext';
import { motion } from 'framer-motion';

const FormStep = ({ question }) => {
  const { state, setformData, setCurrentStep } = useFormContext();

  console.log('state: ', state);

  const handleChange = (e) => {
    // console.log(e.target);
    // console.log(question.id);
    setformData({ [question.id]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();

    setCurrentStep();
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: {
          ease: 'easeIn',
          duration: 1,
        },
      }}
      className='block w-full py-4'
      onSubmit={handleNext}
    >
      <label className='font-medium' htmlFor={`question-${question.id}`}>
        {question.text}
      </label>
      <input
        type='text'
        autoFocus
        id={`question-${question.id}`}
        value={state.formData[question.id] || ''}
        onChange={handleChange}
        className='p-2 border block my-2 w-full'
      />
      <button className='bg-blue-600 my-4 text-white p-2 px-8 rounded-md'>
        Next
      </button>
    </motion.form>
  );
};

export default FormStep;
