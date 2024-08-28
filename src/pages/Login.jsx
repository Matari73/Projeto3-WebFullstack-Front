import logo from '../assets/logoSW.png'

export default function Login() {

    return (
        <div className="flex flex-col items-center justify-arount bg-black
         rounded p-8 w-[35rem]">
            <img src={logo} alt=""  className='w-44 py-10'/>
            <form className="flex flex-col justify-center gap-4 w-full text-2xl">
                <input
                    type="email"
                    placeholder="Email"
                    className="rounded p-2 w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="rounded p-2 w-full"
                />

                <button
                    type="submit"
                    className="px-3 py-1 rounded w-1/2 mx-auto block font-bold text-white text-xl bg-[#c29631] hover:bg-[#8b6e22]"
                >
                    Login
                </button>
            </form>
        </div>
    )
}