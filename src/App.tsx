import { useEffect } from 'react';
import { auth } from './firebase';
import { RootState } from './redux/store';
import { onAuthStateChanged } from 'firebase/auth';
import { notLoading, signInUser } from './redux/user';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Login from './components/Login';
import Note from './components/Note/Note';
import Profile from './components/Profile';
import NotesList from './components/NotesList';
import ThemesList from './components/ThemesList';

function App() {
  const { isLoading } = useSelector((state: RootState) => state.user);
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
    <div className='container xl:max-w-7xl overflow-x-hidden mx-auto px-3 min-h-screen relative pb-10 max-lg:text-sm'>
      {
        isLoading ? <h1 className='font-mono font-black text-4xl pt-4 mb-36'>Загрузка...</h1> :
          <>
            <Profile />
            <Routes>
              <Route index element={<ThemesList />} />
              <Route path='/theme/:themeID' element={<NotesList />} />
              <Route path='/note/:themeID/:id' element={<Note />} />
              <Route path='/login' element={<Login />} />
            </Routes>
            <p className='absolute bottom-0 left-0 w-full text-center'>Develop by <a className='text-amber-600' href="https://github.com/Victor-Maznichenko">Victor Maznichenko</a></p>
          </>
      }
    </div>
  );
}

export default App
