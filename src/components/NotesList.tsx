import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store";
import RoundCard from "./RoundCard"
import { INote, filterNotes } from "../redux/notes";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetNotes } from "../hooks/useGetNotes";

const NotesList = () => {
    const { themeId } = useParams();
    const dispatch = useDispatch();
    const getNotesData = useGetNotes();
    const notes = useSelector((state: RootState) => state.notes);
    const { uid } = useSelector((state: RootState) => state.user);
    const createNewNote = () => console.log('add Note');

    useEffect(() => {
        getNotesData(uid);
        dispatch(filterNotes(Number(themeId)));
    }, [dispatch, getNotesData, themeId, uid]);


    return (
        <>
            <h1 className='font-mono font-black text-4xl pt-4 mb-11 xl:mb-36'>Мои конспекты:</h1>
            <div className="flex flex-wrap items-center gap-5">
                {
                    notes.isLoading ?
                        'СКИЛЕТОН'
                        :
                        notes.list.map((note: INote, i) => (
                            <Card card={note} type={'note'} to={`/note/${note.id}`} key={i} />
                        ))
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