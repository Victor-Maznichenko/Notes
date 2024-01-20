import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { useParams } from "react-router-dom";
import { addTheme } from "../redux/themes";
import { addNote } from "../redux/notes";

const AddCard = ({ type }: { type: 'theme' | 'note' }) => {
    const { uid } = useAppSelector(state => state.user);
    const themeID = useParams().themeID ?? '';
    const dispatch = useAppDispatch();

    const createNewCard = () => {
        switch (type) {
            case 'note':
                dispatch(addNote({ uid, themeID }))
                break;
            case 'theme':
                dispatch(addTheme(uid))
                break;
        }
    }

    return (
        <button onClick={createNewCard} className="flex w-full md:w-[calc(100%/2-1rem)] xl:w-[25rem] items-center justify-center rounded-2xl ring-1 ring-inset py-3 h-44 md:h-52">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
    )
}

export default AddCard