import logo from '../assets/logoSW.png'
import Button from '../components/Button'
import Input from '../components/Input'

export default function Login() {

    return (
        <div className="flex flex-col items-center justify-arount bg-black
         rounded p-8 w-[35rem]">
            <img src={logo} alt=""  className='w-44 py-10'/>
            <form className="flex flex-col justify-center gap-4 w-full text-2xl">
                <Input type="email" placeholder="Email"/>
                <Input type="password" placeholder="Password"/>
                <Button text="LOGIN" type="submit"/>
            </form>
        </div>
    )
}