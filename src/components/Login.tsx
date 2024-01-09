import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInUser } from "../redux/user";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginWithGoogle = async () => {
        await signInWithPopup(auth, provider).then(data => {
            const sendUser = {
                name: data.user.displayName,
                photoURL: data.user.photoURL,
                email: data.user.email,
                uid: data.user.uid,
            }
            dispatch(signInUser(sendUser))
            navigate('/')

        }).catch((error) => console.log(error.message));
    }

    return (
        <div className='absolute bottom-1/2 translate-y-1/2 w-full'>
            <h1 className="font-mono font-black text-4xl text-center mb-24">Здравствуйте, это мой учебный проект 😁😎 </h1>
            <div className="flex justify-center">
                <h2 className="font-mono font-black text-3xl mr-2">Ввойдите при помощи Google: </h2>
                <button onClick={loginWithGoogle} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Вход
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Login;
