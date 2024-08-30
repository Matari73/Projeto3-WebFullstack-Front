import { useNavigate } from 'react-router-dom'
import logo from '../assets/logoSW.png'
import Button from '../components/Button'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';


export default function Home() {
    const navigate = useNavigate()

    function validateToken() {
        const token = Cookies.get("auth-token")
        if (!token) navigate("/login")
    }

    useEffect(() => {
        validateToken()
    }, [])

    return (
        <main className="flex flex-col items-center justify-center bg-black 
        rounded p-8 w-[60rem] h-[35rem] text-2xl">
            <header className="flex items-center justify-between w-full pb-4">
                <img src={logo} alt="Logo Star Wars" className='w-32' />
                <div className='flex items-center gap-4 text-white text-2xl'>
                    <input type="text" />
                    <Button type="submit" text="Buscar" icon="search" />
                </div>
            </header>

            <section className='bg-zinc-300 p-4 w-full h-full rounded flex'>

            </section>

            <footer className='w-full pt-10 flex justify-center text-white text-lg font-bold'>
                <Link to="/personagem">
                    <Button type="button" text="Novo personagem" icon="plus" />
                </Link>
            </footer>
        </main>
    )
}