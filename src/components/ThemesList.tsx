import { ITheme, addTheme, getThemes } from "../redux/themes";
import { RootState, useStoreDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import RoundCard from "./RoundCard";
import Card from "./Card"

const ThemesList = () => {
    const dispatch = useStoreDispatch();
    const { user: { uid } } = useSelector((state: RootState) => state.user);
    const themes = useSelector((state: RootState) => state.themes);
    const createNewTheme = () => dispatch(addTheme(uid));

    useEffect(() => {
        dispatch(getThemes(uid))
    }, [dispatch, uid]);


    return (
        <>
            <h1 className='font-mono font-black text-4xl pt-4 mb-36'>Мои конспекты:</h1>
            <div className="flex flex-wrap items-center xl:gap-5 md:gap-[2rem] gap-4 max-xl:justify-between">
                {
                    themes.list.map((theme: ITheme, index) => (
                        <Card card={theme} key={index} />
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