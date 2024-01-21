import { useParams } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import { getNote } from "../../redux/note";
import { useEffect, useState } from "react";

import { FONT_FAMILIES, FONT_FAMILIES_NO_SPACE, FONT_SIZES, QUIL_MODULES } from "../../utils/constants";
import WebFont from 'webfontloader';
import 'react-quill/dist/quill.snow.css'
import './NoteEditor.css';
import { useAppDispatch, useAppSelector, useSaveNote } from "../../utils/hooks";

const Note = () => {
    const { isLoading, note } = useAppSelector(state => state.note);
    const { uid } = useAppSelector(state => state.user);
    const [showEditor, setShowEditor] = useState(false);
    const [textHTML, setTextHTML] = useState('');
    const themeID = useParams().themeID ?? '';
    const noteID = useParams().id ?? '';
    const handleSave = useSaveNote(note, textHTML, themeID);
    const dispatch = useAppDispatch();

    const Font = Quill.import('formats/font');
    const Size = Quill.import('attributors/style/size');
    Size.whitelist = FONT_SIZES;
    Font.whitelist = FONT_FAMILIES_NO_SPACE;
    Quill.register(Size, true);
    Quill.register(Font, true);


    useEffect(() => {
        setTextHTML(note.textHTML);
        WebFont.load({
            google: {
                families: FONT_FAMILIES
            }
        });
    }, [note.textHTML]);

    useEffect(() => {
        dispatch(getNote({ uid, themeID, noteID }));
    }, [dispatch, noteID, themeID, uid]);


    /*     
        !!! Не могу пока что реализовать, по какой-то причине вызывается много раз. При каждом новом нажатии количество вызовов увеличивается !!!
        Надо лучше изучить React, углубится в документацию.
    
        useEffect(() => {
    
            window.addEventListener('keydown', (event) => {
                if (event.ctrlKey) {
                    event.preventDefault();
                    handleSave();
                }
            });
    
            window.addEventListener('beforeunload', handleSave);
    
        }, [handleSave]);
     */

    return (
        <section className="pt-24">
            {!isLoading && <div className="flex justify-between gap-8 relative">
                <div className="w-full">
                    <h1 className='font-mono font-black text-2xl sm:text-4xl text-center mb-6'>{note.title}:</h1>
                    {
                        showEditor ?
                            <>
                                <ReactQuill className="pt-6 text-start" modules={QUIL_MODULES} theme='snow' value={textHTML} onChange={setTextHTML} />
                                <button onClick={handleSave} className="py-1 px-2 bg-teal-600 rounded mt-4 shadow-[0px_0px_50px_12px_rgba(13,148,136,0.3)]">Сохранить</button>
                            </> :
                            <div className="ql-snow">
                                <div dangerouslySetInnerHTML={{ __html: textHTML }} className='note text-sm ql-editor'></div>
                            </div>
                    }
                </div>
                <button onClick={() => setShowEditor(!showEditor)} className="absolute top-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 transition-all drop-shadow-[1px_1px_10px_rgba(255,255,255,0.2)] hover:drop-shadow-[1px_1px_10px_rgba(255,255,255,0.4)]" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" fill="inherit" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
            </div>}
        </section>
    )
}

export default Note