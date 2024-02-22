import { useRef, useState } from 'react';
import Form from './Form';

const questions = [
  { id: 'name', text: 'What is your name?' },
  { id: 'age', text: 'How old are you?' },
  { id: 'city', text: 'Where do you live?' },
];

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState(0);
  const [questions, setQuestions] = useState([]);
  const inputRef = useRef();

  console.log(questions);

  const handleNextQuestion = (e) => {
    e.preventDefault();
    setQuestions([...questions, { id: id, text: inputRef.current.value }]);
    inputRef.current.value = '';
    setId(id + 1);
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

          {/* form builder */}
          <div className='w-1/2'>
            <article>
              {questions.length !== 0 && (
                <h2 className='font-medium text-xl mb-4'>Questions</h2>
              )}
              {questions.map((q) => (
                <p key={q.id} className='bg-gray-200 p-2 rounded-md'>
                  {q.text}
                </p>
              ))}
            </article>

            <form onSubmit={handleNextQuestion}>
              <input
                type='text'
                ref={inputRef}
                className='p-2 border-b w-full block my-4 outline-none'
                placeholder='Enter question'
              />
              <button
                type='submit'
                className='bg-blue-600 text-white p-2 px-4 rounded-md'
              >
                Add Question
              </button>
            </form>
          </div>

          {/* form previewer */}
          <div>
            {questions.map((q) => (
              <div className='p-2' key={q.id} aria-disabled='true'></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
