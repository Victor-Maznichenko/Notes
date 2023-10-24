import { FC, useState } from "react";
import { HeadingTag } from "./Editor";

interface IProps {
    selected: HeadingTag,
    headingTags: Array<HeadingTag>,
    onClick: (headingTag: HeadingTag) => void
}

const Dropdown: FC<IProps> = ({ selected, headingTags, onClick }) => {
    const [isActive, setIsActive] = useState(false);
    const toggleList = () => {
        setIsActive(!isActive);
    }

    return (
        <div className="relative inline-block">
            <div className="flex items-center shadow-inner">
                <button onClick={() => onClick(selected)} className="uppercase">
                    {selected}
                </button>
                <span onClick={toggleList} className={`${isActive ? 'rotate-180' : ''} cursor-pointer`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd" />
                    </svg>
                </span>
            </div>
            <div className={`absolute z-50 w-full float-left m-0 ${isActive ? '' : 'opacity-0 pointer-events-none'} transition-all min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block`}>
                <ul className="select-list">
                    {headingTags.map((headingTag: HeadingTag, index: number) => (
                        <li key={index} className={`${headingTag === selected ? 'hidden' : 'block'} block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600`}>
                            <button onClick={() => onClick(headingTag)} className="uppercase">{headingTag}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Dropdown