import { useSelector } from "react-redux"
import { RootState, useStoreDispatch } from "../redux/store";
import RoundCard from "./RoundCard"
import { INote, addNote, getNotes } from "../redux/notes";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const NotesList = () => {
    const { themeId } = useParams();
    const dispatch = useStoreDispatch();
    const { list } = useSelector((state: RootState) => state.notes);

    const createNewNote = () => dispatch(addNote(Number(themeId)));

    useEffect(() => {
        dispatch(getNotes(Number(themeId)))
    }, [dispatch, themeId])


    return (
        <>
            <h1 className='font-mono font-black text-4xl pt-4 mb-36'>Мои конспекты:</h1>
            <div className="flex flex-wrap items-center gap-5">
                {
                    list.length === 0 ? '' :
                        list.map((note: INote, index) => {
                            if (note.themeId === Number(themeId)) {
                                return (
                                    <Card card={note} type={'note'} to={`/note/${note.id}`} key={index} />
                                )
                            }
                            return;
                        })
                }
                <RoundCard onClick={createNewNote}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </RoundCard>
            </div>
        </>
    )
}

export default NotesList