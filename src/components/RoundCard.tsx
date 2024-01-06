import { FC } from "react"

interface IRoundBtn {
    children: JSX.Element,
    onClick?: () => void
}

const RoundBtn:FC<IRoundBtn> = ({children, onClick}) => {
    return (
        <button onClick={onClick} className="flex w-full md:w-[calc(100%/2-1rem)] xl:w-[25rem] items-center justify-center rounded-2xl ring-1 ring-inset py-3 h-44 md:h-52">
            {children}
        </button>
    )
}

export default RoundBtn