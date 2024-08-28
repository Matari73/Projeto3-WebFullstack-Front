export default function Button({ text, type }) {
    return (
        <button
            type={type}
            className="px-3 py-1 rounded w-1/2 mx-auto block font-bold text-white text-xl bg-gradient-to-r from-[#c29631] to-[#8b6e22]"
        >
            {text}
        </button>
    )
}