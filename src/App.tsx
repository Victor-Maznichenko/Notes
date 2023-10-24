import { Route, Routes } from 'react-router-dom';
import ThemesList from './components/ThemesList';
import NotesList from './components/NotesList';
import Note from './components/Note';

function App() {
  return (
    <div className='container xl:max-w-7xl mx-auto px-3'>
      <Routes>
        <Route index element={<ThemesList />} />
        <Route path='/theme/:id' element={<NotesList/>}/>
        <Route path='/note/:id' element={<Note />} />
      </Routes>
    </div>
  )
}

export default App
