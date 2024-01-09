import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, ChangeEvent } from "react"
import { RootState, useStoreDispatch } from "../redux/store";
import { INote, changeNote, deleteNote } from "../redux/notes";
import { ITheme, changeTheme, deleteTheme } from "../redux/themes";

interface ICard {
    id: string,
    title: string,
    aviableColors: Array<string>,
    activeColor: string,
    textHTML?: string,
}
interface ICardProps {
    card: ICard,
    themeID?: string
}

const Card = ({ card, themeID = card.id }: ICardProps) => {
    const [currentTitle, setCurrentTitle] = useState(card.title);
    const [activeColor, setActiveColor] = useState(card.activeColor);
    const [showEditor, setShowEditor] = useState(!currentTitle);
    const { user: { uid } } = useSelector((state: RootState) => state.user);
    const changeCurrentTitle = (e: ChangeEvent<HTMLInputElement>) => setCurrentTitle(e.target.value);
    const dispatch = useStoreDispatch();
    const isNote = themeID !== card.id;

    const changeCard = () => {
        if (isNote) {
            const newNote: INote = {
                ...card,
                textHTML: card.textHTML ?? '',
                title: currentTitle,
                activeColor: activeColor
            };
            dispatch(changeNote({ uid, themeID, newNote }));
        } else {
            const newTheme: ITheme = {
                ...card,
                title: currentTitle,
                activeColor: activeColor
            }
            dispatch(changeTheme({ uid, newTheme }));
        }

        setShowEditor(false)
    }

    const deleteCard = () => isNote ? dispatch(deleteNote({ uid, themeID, noteID: card.id })) : dispatch(deleteTheme({ uid, themeID}));



    return (
        <div className={`hover:text-inherit text-inherit w-full md:w-[calc(100%/2-1rem)] xl:w-[25rem] rounded-2xl text-center ring-1 ring-inset px-3 py-3 h-44 md:h-52 relative ${activeColor}`}>
            {
                showEditor ?
                    <div className="flex justify-between">
                        <div>
                            <h4 className='font-semibold'>Выберите цвет:</h4>
                            <ul className='grid grid-cols-4 w-24 h-24 gap-1 cursor-pointer'>
                                {
                                    card.aviableColors.map((color: string, index: number) => (
                                        <li key={index}
                                            className={`${color} ${color === card.activeColor ? 'border-green-800' : ''} border-solid border border-white`}
                                            onClick={() => (setActiveColor(color))}
                                        ></li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='flex flex-col items-start justify-between'>
                            <div className='text-left'>
                                <h4 className='font-semibold'>Название:</h4>
                                <input value={currentTitle} onChange={changeCurrentTitle} className={`peer m-0 block h-[30px] w-full rounded border border-solid border-neutral-300 bg-opacity-40 bg-black placeholder:text-transparent focus:border-primary focus:outline-none peer-focus:text-primary dark:focus:border-primary dark:peer-focus:text-primary px-1 ${currentTitle === '' ? 'border-red-600 color-red-300' : ''}`} type="text" />
                            </div>
                            <button className='btn ml-auto inline-block bg-green-950' onClick={changeCard}>Готово</button>
                        </div>
                    </div>
                    :
                    <>
                        <Link to={isNote ? `/note/${themeID}/${card.id}` : `/theme/${themeID}`} className="peer flex w-full items-center h-full justify-center">
                            <h3 className="font-mono text-xl xl:text-2xl font-bold inline-block">{currentTitle}</h3>
                        </Link>
                        <div className="absolute z-10 top-3 right-3 flex items-center pointer-events-none opacity-0 peer-hover:pointer-events-auto peer-hover:opacity-100 transition-all hover:pointer-events-auto hover:opacity-100">
                            <button type="button" className={`flex items-center mr-2 content-center rounded-md bg-red-600 p-1 shadow-sm`} onClick={deleteCard}>
                                <svg className='h-4 w-4 text-white-400' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                            <button type="button" className={`flex items-center content-center rounded-md bg-gray-700 p-1 shadow-sm ring-1 ring-inset ring-gray-700`} onClick={() => setShowEditor(!showEditor)}>
                                <svg className="h-4 w-4 text-white-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                                </svg>
                            </button>
                        </div>
                    </>
            }
        </div>
    )
}

export default Card