import { useAppDispatch, useAppSelector } from './utils/hooks';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { setNotLoading, signInUser } from './redux/user';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './firebase';

import Login from './components/Login';
import Note from './components/Note/Note';
import Profile from './components/Profile';
import NotesList from './components/NotesList';
import ThemesList from './components/ThemesList';

function App() {
	const { isLoading } = useAppSelector(state => state.user);
	const dispatch = useAppDispatch();
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
				dispatch(setNotLoading());
				navigate('/login')
			}
		});
	}, [dispatch, navigate]);

	return (
		<div className='container xl:max-w-7xl overflow-x-hidden mx-auto px-3 min-h-screen relative pb-10 max-lg:text-sm'>
			{
				isLoading ? <h1 className='font-mono font-black text-4xl pt-4 mb-36'>Загрузка данных профиля...</h1> :
					<>
						<Profile />
						<Routes>
							<Route index element={<ThemesList />} />
							<Route path='/theme/:themeID' element={<NotesList />} />
							<Route path='/note/:themeID/:id' element={<Note />} />
							<Route path='/login' element={<Login />} />
						</Routes>
						<p className='absolute bottom-0 left-0 w-full text-center'>
							<span>Develop by </span>
							<a className='text-amber-600' href="https://github.com/Victor-Maznichenko">Victor Maznichenko</a>
						</p>
					</>
			}
		</div>
	);
}

export default App
