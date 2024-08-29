import { useForm } from 'react-hook-form'
import logo from '../assets/logoSW.png'
import Button from '../components/Button'
import Input from '../components/Input'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
    email: z.string().min(1, "O email é obrigatório").email("Formato de email inválido").toLowerCase(),
    password: z.string().min(1, "A senha é obrigatória").min(6, 'A senha precisa ter no mínimo 6 caracteres')
})

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })

    function handleSubmitForm(data) {
        console.log(data)
    }

    return (
        <div className="flex flex-col items-center justify-arount bg-black
         rounded p-8 w-[35rem]">
            <img src={logo} alt="" className='w-44 py-10' />
            <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col justify-center gap-4 w-full text-2xl">
                <Input
                    type="email"
                    placeholder="Email"
                    register={register}
                    name="email"
                />
                {errors.email && <span className='text-white'>{errors.email.message}</span>}
                <Input
                    type="password"
                    placeholder="Password"
                    register={register}
                    name="password"
                />
                {errors.password && <span className='text-white'>{errors.password.message}</span>}

                <Button text="LOGIN" type="submit" />
            </form>
        </div>
    )
}