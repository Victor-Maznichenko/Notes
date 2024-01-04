import { ITheme, addTheme, changeTheme, deleteTheme, getThemes } from "../redux/themes";
import Card from "./Card"
import { RootState, useStoreDispatch } from "../redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import RoundCard from "./RoundCard";
import { AVIABLE_COLORS } from "../utils/constants";

const ThemesList = () => {
    const dispatch = useStoreDispatch();
    const { list } = useSelector((state: RootState) => state.themes);
    const newId = list.length + 1;
    const createNewTheme = () => {
        const newTheme = {
            id: newId,
            title: '',
            aviableColors: AVIABLE_COLORS,
            activeColor: AVIABLE_COLORS[0]
        }
        dispatch(addTheme(newTheme))
    }


    useEffect(() => {
        dispatch(getThemes());
    }, [dispatch]);


    return (
        <>
            <h1 className='font-mono font-black text-4xl pt-4 mb-36'>Мои конспекты:</h1>
            <div className="flex flex-wrap items-center gap-5">
                {
                    list.map((theme: ITheme, index) => (
                        <Card card={theme} actionChangeCard={changeTheme} actionDeleteCard={deleteTheme} to={`/theme/${theme.id}`} key={index} />
                    ))
                }
                <RoundCard onClick={createNewTheme}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </RoundCard>
            </div>
        </>
    )
}

export default ThemesList