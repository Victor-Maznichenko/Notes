import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { ITheme, getThemes } from "../redux/themes";
import { useEffect } from "react";

import AddCard from "./AddCard";
import Card from "./Card";

const ThemesList = () => {
    const themes = useAppSelector(state => state.themes);
    const { uid } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getThemes(uid))
    }, [dispatch, uid]);

    console.log(themes);

    return (
        <>
            <h1 className='font-mono font-black text-4xl pt-4 mb-36 text-center'>Темы:</h1>
            <div className="flex flex-wrap items-center xl:gap-5 md:gap-[2rem] gap-4 max-xl:justify-between">
                {
                    themes.list.map((theme: ITheme) => (
                        <Card card={theme} type='theme' key={theme.id} />
                    ))
                }
                <AddCard type='theme' />
            </div>
        </>
    )
}

export default ThemesList