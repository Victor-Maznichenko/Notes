/* import { useState, MouseEvent, ChangeEvent } from 'react'
import { useStoreDispatch } from '../redux/store';
import { loginUser, registerUser } from '../redux/user';
import { useCookies } from 'react-cookie';

const Popup = () => {
    const dispatch = useStoreDispatch();
    const [, setCookie] = useCookies(['user']);
    const [isRegister, setIsRegister] = useState(true);
    const [inputValues, setInputValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        console.log(target.name)
        setInputValues({ ...inputValues, [target.name]: target.value });
    };

    const handleRegisterSubmit = (event: MouseEvent<HTMLFormElement>) => {
        event.preventDefault();

        isRegister ? dispatch(registerUser(inputValues)) : dispatch(loginUser({email: inputValues.email, password: inputValues.password}));
            for (const key in inputValues) {
                setCookie([key], inputValues[key], { path: '/' });
        }
        dispatch(toggleShowForm());
    };

            const handleLoginSubmit = (event: MouseEvent<HTMLFormElement>) => {
                event.preventDefault();

        // isRegister ? dispatch(createUser(values)) : dispatch(loginUser({email: values.email, password: values.password}));
        // for (const key in values) {
                    //     setCookie([key], values[key], {path: '/'});
                    // }
                    // dispatch(toggleShowForm());
                };


                return (
                <div className="absolute z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80">
                    <div className="w-1/4 min-h-1/3 bg-blue-950 py-6 px-4 text-gray-300">
                        <p className="font-mono text-sm mb-6">
                            Привет, это сайт для моих конспектов. Если захочешь что-нибудь добавить или заметил баг, пиши в телегу: <span><a className="text-cyan-400 underline" href="https://t.me/One_twwo_three">@One_twwo_three</a></span>
                        </p>
                        <form action="#" onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}>
                            <label>
                                <span>Почта:</span>
                                <input onChange={handleChange} type="email" name="email" className='block w-full mb-3 px-1 py-2 text-black' value={inputValues.email} />
                            </label>
                            <label>
                                <span>Пароль:</span>
                                <input onChange={handleChange} type="password" name="password" className='block w-full mb-3 px-1 py-2 text-black' value={inputValues.password} />
                            </label>
                            <div className="flex justify-between items-center">
                                <button type="submit" className='py-2 px-4 bg-amber-600 rounded text-white font-medium'>{isRegister ? 'Зарегистрироваться' : 'Ввойти'}</button>
                                <button className='underline text-white font-medium' onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Ввойти' : 'Зарегистрироваться'}?</button>
                            </div>
                        </form>
                    </div>
                </div>
                )
}

                export default Popup */