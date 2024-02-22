/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { useFormContext } from './hooks/useFormContext';
import { motion } from 'framer-motion';
import { getRandomImgURL } from './utils/getRandomImgURL';

const FormStep = ({ question }) => {
  const {
    state: { formData, currentResponseStep },
    setFormData,
    getNextQuesion,
  } = useFormContext();
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    const url = getRandomImgURL();
    setImgURL(url);
  }, [currentResponseStep]);

  const handleChange = (e) => {
    setFormData({ id: question.id, value: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    getNextQuesion();
  };

  return (
    <div className='flex w-full justify-center items-center min-h-screen shadow-md'>
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
        className='basis-1/2 p-4 px-20'
        onSubmit={handleNext}
      >
        <h1 className='text-4xl mb-4 font-medium'>Typeform</h1>
        <label className='font-medium' htmlFor={`question-${question.id}`}>
          {question.text}
        </label>
        <input
          type='text'
          autoFocus
          id={`question-${question.id}`}
          value={formData[question.id] || ''}
          onChange={handleChange}
          className='p-2 border-b outline-none  block my-2 w-full'
        />
        <button className='bg-blue-600 my-4 text-white p-2 px-8 rounded-md'>
          Next
        </button>
      </motion.form>
      <div className='basis-1/2'>
        <img
          src={imgURL}
          className='block w-full aspect-square'
          loading='lazy'
          alt=''
        />
      </div>
    </div>
  );
};

export default FormStep;
