import { FC } from "react"

interface IRoundBtn {
    children: JSX.Element,
    onClick?: () => void
}

const RoundBtn:FC<IRoundBtn> = ({children, onClick}) => {
    return (
        <button onClick={onClick} className="flex w-[25rem] items-center justify-center rounded-2xl ring-1 ring-inset h-52">
            {children}
        </button>
    )
}

export default RoundBtn