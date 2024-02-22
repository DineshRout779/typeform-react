import { useRef, useState } from 'react';
import Form from './Form';
import { useFormContext } from './hooks/useFormContext';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    state: { questions, currentStep },
    setQuestionData,
    setNextQuestion,
  } = useFormContext();
  const [previewId, setPreviewId] = useState(0);

  const inputRef = useRef();

  console.log(questions, currentStep);

  const handleChange = (e) => {
    setQuestionData(e.target.value);
  };

  const handleActivePreview = (id) => {
    setPreviewId(id);
  };

  const handleNextQuestion = () => {
    setNextQuestion();
    setPreviewId(previewId + 1);
  };

  return (
    <div className='min-h-screen '>
      {showForm ? (
        <div className='container max-w-[480px] mx-auto w-[90%]'>
          <h2 className='text-4xl my-4 font-medium'>Typeform</h2>

          <Form questions={questions} />
        </div>
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
                      q.id === previewId
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
            <div className='basis-1/3 border p-4 rounded-md'>
              <h2 className='font-medium text-xl mb-4'>Edit question</h2>

              <form onSubmit={handleNextQuestion}>
                <input
                  type='text'
                  ref={inputRef}
                  value={questions.find((q) => q.id === previewId).text}
                  onChange={handleChange}
                  className='p-2 border-b w-full block my-4 outline-none'
                  placeholder='Enter question'
                />
              </form>
            </div>

            {/* form previewer */}
            <div className='basis-1/2 border p-4 rounded-md'>
              <div className='flex justify-end'>
                <button
                  onClick={() => setShowForm(true)}
                  className='bg-black p-2 px-4 rounded-md text-sm text-white'
                >
                  Preview
                </button>
              </div>
              {questions.map((q) => {
                if (q.id === previewId) {
                  return (
                    <div className='p-2' key={q.id} aria-disabled='true'>
                      <p>{q.text}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
