
// import { useCookies } from 'react-cookie';
// import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import ThemesList from './components/ThemesList';
import NotesList from './components/NotesList';
import Note from './components/Note/Note';
import Login from './components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { notLoading, signInUser } from './redux/user';
import { RootState } from './redux/store';

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        const sendUser = {
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          uid: userData.uid,
        }
        dispatch(signInUser(sendUser));
      } else {
        dispatch(notLoading());
        navigate('/login')
      }
    });
  }, [dispatch, navigate]);

  return (
    <div className='container xl:max-w-7xl mx-auto px-3 min-h-screen relative pb-10 max-lg:text-sm'>
      {
        user.isLoading ? <h1 className='font-mono font-black text-4xl pt-4 mb-36'>Загрузка...</h1> :
          <>
            <Routes>
              <Route index element={<ThemesList />} />
              <Route path='/theme/:themeId' element={<NotesList />} />
              <Route path='/note/:id' element={<Note />} />
              <Route path='/login' element={<Login />} />
            </Routes>
            <p className='absolute bottom-0 left-0 w-full text-center'>Develop by <a className='text-amber-600' href="https://github.com/Victor-Maznichenko">Victor Maznichenko</a></p>

          </>
      }
    </div>
  );
}

export default App
