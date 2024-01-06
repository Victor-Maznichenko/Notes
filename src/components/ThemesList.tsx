import { ITheme } from "../redux/themes";
import Card from "./Card"
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import RoundCard from "./RoundCard";
import { useEffect } from "react";
import { useGetThemes } from "../hooks/useGetThemes";

const ThemesList = () => {
    const { uid } = useSelector((state: RootState) => state.user);
    const themes = useSelector((state: RootState) => state.themes);
    const createNewTheme = () => console.log;
    const getThemesData = useGetThemes();

    useEffect(() => {
        getThemesData(uid);
    }, [getThemesData, uid]);
    

    // function writeThemeData(userId, name, email, imageUrl) {
    //     const db = getDatabase();
    //     set(ref(db, 'users/' + userId), {
    //         username: name,
    //         email: email,
    //         profile_picture: imageUrl
    //     });
    // }



    return (
        <>
            <h1 className='font-mono font-black text-4xl pt-4 mb-36'>Мои конспекты:</h1>
            <div className="flex flex-wrap items-center xl:gap-5 md:gap-[2rem] gap-4 max-xl:justify-between">
                {
                    themes.list.map((theme: ITheme, index) => (
                        <Card card={theme} type={'theme'} to={`/theme/${theme.id}`} key={index} />
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