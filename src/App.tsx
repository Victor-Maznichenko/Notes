
// import { useCookies } from 'react-cookie';
// import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import ThemesList from './components/ThemesList';
import NotesList from './components/NotesList';
import Note from './components/Note/Note';
// import { RootState, useStoreDispatch } from './redux/store';
// import { IUserLogin, loginUser } from './redux/user';
// import { useSelector } from 'react-redux';


function App() {
/*   const { isNewUser } = useSelector((state: RootState) => state.user);
  const [cookies, , ] = useCookies<string, IUserLogin>(['user']);
  const dispatch = useStoreDispatch();

  useEffect(() => {
    if (!Object.keys(cookies).length) return
    dispatch(loginUser({
      email: decodeURIComponent(cookies.email),
      password: decodeURIComponent(cookies.password)
    }));
  }, [cookies, dispatch]); */

  return (
    <div className='container xl:max-w-7xl mx-auto px-3 h-screen'>
      <Routes>
        <Route index element={<ThemesList />} />
        <Route path='/theme/:id' element={<NotesList/>}/>
        <Route path='/note/:id' element={<Note />} />
      </Routes>
      {/* {isNewUser ? <Popup/> : ''} */}
    </div>
  )
}

export default App
