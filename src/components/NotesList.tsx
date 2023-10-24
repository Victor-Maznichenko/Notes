import { useSelector } from "react-redux"
import { RootState, useStoreDispatch } from "../redux/store";
import RoundCard from "./RoundCard"
import { INote, addNote, changeNote, getNotes } from "../redux/notes";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { AVIABLE_COLORS } from "../utils/constants";
import { useEffect } from "react";

const NotesList = () => {
    const { id } = useParams();
    const dispatch = useStoreDispatch();
    const { list } = useSelector((state: RootState) => state.notes);

    const newNote:INote = {
        themeId: Number(id),
        id: list.length,
        title: '',
        aviableColors: AVIABLE_COLORS,
        activeColor: AVIABLE_COLORS[0],
        textHTML: ''
    }

    useEffect(() => {
      dispatch(getNotes(Number(id)))
    }, [dispatch, id])
    

    return (
        <>
            <h1 className='font-mono font-black text-4xl pt-4 mb-36'>Мои конспекты:</h1>
            <div className="flex flex-wrap items-center gap-5">
                {
                    list.map((note: INote, index) => (
                        <Card card={note} changeCard={changeNote} to={`/note/${note.id}`} key={index} />
                    ))
                }
                <RoundCard onClick={() => dispatch(addNote(newNote))}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </RoundCard>
            </div>
        </>
    )
}

export default NotesList