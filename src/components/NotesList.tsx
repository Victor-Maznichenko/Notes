import { useParams } from "react-router-dom";
import { getNotes } from "../redux/notes";
import { useEffect } from "react";

import AddCard from "./AddCard";
import Card from "./Card";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

const NotesList = () => {
    const { uid } = useAppSelector(state => state.user);
    const notes = useAppSelector(state => state.notes);
    const themeID = useParams().themeID ?? '';
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getNotes({ uid, themeID }))
    }, [dispatch, themeID, uid]);

    return (
        <>
            <h1 className='font-mono font-black text-4xl pt-4 mb-11 xl:mb-36'>Мои конспекты:</h1>
            <div className="flex flex-wrap items-center gap-5">
                {
                    notes.list.map(note => (
                        <Card card={note} type='note' themeID={themeID} key={note.id} />
                    ))
                }
                <AddCard type='note' />
            </div>
        </>
    )
}

export default NotesList