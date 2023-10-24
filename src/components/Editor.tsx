import { useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { $getSelection, $isRangeSelection } from 'lexical';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListItemNode, ListNode } from '@lexical/list';
import { $createHeadingNode } from '@lexical/rich-text';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import Dropdown from './Dropdown';

function onError(error: Error) {
    console.error(error);
}

const theme = {
    text: {
        bold: 'editor-textBold',
    }
};

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

function HeadingToolbarPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const headingTags: Array<HeadingTag> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const [selected, setSelected] = useState(headingTags[0]);
    const onClick = (headingTag: HeadingTag): void => {
        setSelected(headingTag);
        editor.update(() => {
            // Забираем выделенный текст и конвертируем его в заголовок.
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(headingTag));
            }
        })
    }
    return <Dropdown selected={selected} onClick={onClick} headingTags={headingTags} />;
}


export type ListTag = 'ul' | 'ol';

function ListToolbarPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const listTags: Array<ListTag> = ['ul', 'ol'];
    const onClick = (tag: ListTag): void => {
        if (tag === 'ol') {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
            return;
        }
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
    return (
        <>
            {
                listTags.map((tag, index) => (
                    <button onClick={() => onClick(tag)} key={index}>{
                        tag === 'ul' ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 h-7" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                                <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
                            </svg>
                    }</button>
                ))
            }
        </>
    );
}

function ToolbarPlugin() {
    return (
        <div>
            <HeadingToolbarPlugin />
            <ListToolbarPlugin />
        </div>
    );
}

export default function Editor() {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [HeadingNode, ListNode, ListItemNode]
    };

    return (
        <div className='relative'>
            <LexicalComposer initialConfig={initialConfig}>
                <ToolbarPlugin />
                <ListPlugin />
                <RichTextPlugin
                    contentEditable={<ContentEditable className='transition-all w-full h-80 border focus-visible:border-emerald-600 outline-none peer px-2 py-3 rounded' />}
                    placeholder={<div className='transition-all peer-focus:opacity-0 absolute top-7 text-neutral-400 left-1'>Введите какой-нибудь текст...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
            </LexicalComposer>
        </div>
    );
}

