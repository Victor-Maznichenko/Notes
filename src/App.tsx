
// import { useCookies } from 'react-cookie';
// import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import ThemesList from './components/ThemesList';
import NotesList from './components/NotesList';
import Note from './components/Note/Note';

function App() {
  return (
    <div className='container xl:max-w-7xl mx-auto px-3 h-screen'>
      <Routes>
        <Route index element={<ThemesList />} />
        <Route path='/theme/:themeId' element={<NotesList/>}/>
        <Route path='/note/:id' element={<Note />} />
      </Routes>
      {/* {isNewUser ? <Popup/> : ''} */}
    </div>
  )
}

export default App
