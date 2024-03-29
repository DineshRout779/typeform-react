import { useEffect, useRef, useState } from 'react';
import Form from './Form';
import { useFormContext } from './hooks/useFormContext';
import { getRandomImgURL } from './utils/getRandomImgURL';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    state: { questions, currentStep, previewStep },
    setQuestionData,
    setNextQuestion,
    setPreviewStep,
  } = useFormContext();
  const [imgURL, setImgURL] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    const url = getRandomImgURL();
    setImgURL(url);
  }, [questions.length, previewStep]);

  // console.log(questions, currentStep);

  const handleChange = (e) => {
    setQuestionData(e.target.value);
  };

  const handleActivePreview = (id) => {
    setPreviewStep(id);
    inputRef.current.focus();
  };

  const handleNextQuestion = () => {
    setNextQuestion();
    setPreviewStep(currentStep + 1);
    inputRef.current.focus();
  };

  return (
    <div className='min-h-screen '>
      {showForm ? (
        <Form questions={questions} />
      ) : (
        <div className='container max-w-[1200px] mx-auto w-[95%]'>
          <h2 className='text-4xl my-4 font-medium'>Typeform</h2>
          <p className='mb-8'>Build forms seamlessly!</p>
          <div className='flex gap-8 justify-between'>
            {/* form builder */}
            <div className='basis-1/3 border p-4 rounded-md'>
              {/* All questions */}
              <article>
                {questions.length !== 0 && (
                  <h2 className='font-medium text-xl mb-4'>Questions</h2>
                )}
                {questions.map((q) => (
                  <button
                    key={q.id}
                    className={`w-full text-left my-2 p-2 rounded-md ${
                      q.id === previewStep
                        ? 'text-white bg-blue-300'
                        : 'bg-gray-200'
                    }`}
                    onClick={() => handleActivePreview(q.id)}
                  >
                    {q.text}
                  </button>
                ))}
                <button
                  onClick={handleNextQuestion}
                  className='bg-black text-white my-2 p-2 px-4 rounded-md'
                >
                  Add question
                </button>
              </article>
            </div>

            {/* edit question */}
            <div className='basis-2/3 border p-4 rounded-md'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='font-medium text-xl mb-4'>Edit question</h2>

                <button
                  onClick={() => setShowForm(true)}
                  className='bg-black p-2 px-4 rounded-md text-sm text-white'
                >
                  Preview
                </button>
              </div>
              <div className='flex justify-center items-center min-h-[30vh] border shadow-md'>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className='basis-1/2 block p-10'
                >
                  <h3 className='font-medium text-xl'>Typeform</h3>
                  <input
                    type='text'
                    ref={inputRef}
                    autoFocus
                    value={questions.find((q) => q.id === previewStep).text}
                    onChange={handleChange}
                    className='border-b w-full block my-4 outline-none'
                    placeholder='Enter question'
                  />
                  <p className='text-xs w-fit border-b'>
                    Your repsonse goes here
                  </p>
                </form>
                <div className='basis-1/2'>
                  <img src={imgURL} loading='lazy' alt='' />
                </div>
              </div>
            </div>

            {/* form previewer */}
            {/* <div className='basis-1/2 border p-4 rounded-md'>
              <div className='flex justify-end'>
                
              </div>
              {questions.map((q) => {
                if (q.id === previewStep) {
                  return (
                    <div className='p-2' key={q.id} aria-disabled='true'>
                      <p>{q.text}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
