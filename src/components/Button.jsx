import { BiPlusCircle } from "react-icons/bi"

export default function Button({ text, type, icon }) {
    let IconComponent

    if (!icon) icon = "";
    if (icon === "plus") IconComponent = BiPlusCircle
    return (
        <button
            type={type}
            className="px-4 py-2 rounded w-full font-bold text-white text-2xl bg-gradient-to-r from-[#c29631] to-[#8b6e22] flex items-center justify-center gap-2"
        >
            {IconComponent && <IconComponent />} {text}
        </button>
    )
}