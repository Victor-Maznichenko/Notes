import { useCallback, useEffect, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { useSelector } from "react-redux";
import { RootState, useStoreDispatch } from "../../redux/store";
import { useParams } from "react-router-dom";
import { changeNote, getNote } from "../../redux/note";
import { INote } from "../../redux/notes";
import WebFont from 'webfontloader';

import 'react-quill/dist/quill.snow.css'
import './Note.css';

const Note = () => {
    const FONT_SIZES = ['8px', '9px', '10px', '12px', '14px', '16px', '20px', '24px', '32px', '42px', '54px', '68px', '84px', '98px'];
    const FONT_FAMILIES = useMemo(() => ['Roboto', 'Poiret One', 'JetBrains Mono', 'Pixelify Sans', 'Play', 'Amatic SC', 'Ubuntu Mono', 'Advent Pro'], []);
    const FONT_FAMILIES_NO_SPACE = FONT_FAMILIES.map(font => font.replace(' ', ''));
    const note: INote = useSelector((state: RootState) => state.note);
    
    const [showEditor, setShowEditor] = useState(false);
    const [textHTML, setTextHTML] = useState('');
    const dispatch = useStoreDispatch();
    const { id } = useParams();

    const Font = Quill.import('formats/font');
    const Size = Quill.import('attributors/style/size');
    Size.whitelist = FONT_SIZES;
    Font.whitelist = FONT_FAMILIES_NO_SPACE;
    Quill.register(Size, true);
    Quill.register(Font, true);

    const save = useCallback(
        () => {
            const newNote = {
                ...note,
                textHTML
            }
            dispatch(changeNote(newNote))
        },
        [dispatch, note, textHTML],
    )

    useEffect(() => {
        dispatch(getNote(Number(id)));
        setTextHTML(note.textHTML);
        WebFont.load({
            google: {
                families: FONT_FAMILIES
            }
        });
    }, [dispatch, FONT_FAMILIES, id, note.textHTML]);

/*     useEffect(() => {
        window.addEventListener('keydown', function (event) {
            if (event.code == 'KeyS' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                save();
            }
        });
        window.addEventListener('unload', function () {
            save();
        });
    }, [note, save]); */

    const quilModules = {
        toolbar: [
            [{ 'font': FONT_FAMILIES_NO_SPACE }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'size': FONT_SIZES }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ["link", "image", "video"],
            ['clean']
        ]
    }

    return (
        <section className="pt-10">
            <div className="flex justify-between gap-8 relative">
                <div className={`w-full overflow-hidden`}>
                    <h1 className='font-mono font-black text-2xl sm:text-4xl text-center mb-6'>{note.title}:</h1>
                    {
                        showEditor ?
                            <>
                                <ReactQuill className="pt-6 text-start" modules={quilModules} theme='snow' value={textHTML} onChange={setTextHTML} />
                                <button onClick={save} className="py-1 px-2 bg-teal-600 rounded mt-4">Сохранить</button>
                            </>:
                            <div className="ql-snow">
                                <div dangerouslySetInnerHTML={{ __html: textHTML }} className='note text-sm ql-editor'></div>
                            </div>
                    }
                </div>
                <button onClick={() => setShowEditor(!showEditor)} className="absolute top-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
            </div>
        </section>
    )
}

export default Note