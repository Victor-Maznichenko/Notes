import { useState } from "react";
import Editor from "./Editor";

const Note = () => {
  // const { id } = useParams();
  // const notes = useSelector((state: RootState) => state.notes.list)
  const [showEditor, setShowEditor] = useState(false);


  return (
    <div className="flex justify-between gap-8 pt-10">
      <div className={`w-full overflow-hidden`}>
        <h1 className='font-mono font-black text-4xl text-center mb-6'>Конспект:</h1>
        <Editor />
      </div>
      <div className="text-end">
        <button onClick={() => setShowEditor(!showEditor)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Note