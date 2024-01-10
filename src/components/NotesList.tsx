import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { addNote, getNotes } from "../redux/notes";
import { RootState, useStoreDispatch } from "../redux/store";

import Card from "./Card";
import RoundCard from "./RoundCard"

const NotesList = () => {
    const themeID = useParams().themeID ?? '';
    const dispatch = useStoreDispatch();
    const notes = useSelector((state: RootState) => state.notes);
    const { user: {uid} } = useSelector((state: RootState) => state.user);
    const createNewNote = () => dispatch(addNote({ uid, themeID }));
    console.log(notes);

    useEffect(() => {
        dispatch(getNotes({ uid, themeID }))
    }, [dispatch, themeID, uid]);

    return (
        <>
            <h1 className='font-mono font-black text-4xl pt-4 mb-11 xl:mb-36'>Мои конспекты:</h1>
            <div className="flex flex-wrap items-center gap-5">
                {
                    notes.isLoading ?
                        'СКИЛЕТОН'
                        :
                        notes.list.map((note, i) => (
                            <Card card={note} themeID={themeID} key={i} />
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