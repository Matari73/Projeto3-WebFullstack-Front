import { useForm } from 'react-hook-form';
import logo from '../assets/logoSW.png';
import Button from '../components/Button';
import Input from '../components/Input';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorInput from '../components/ErrorInput';
import { login } from '../services/user';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const loginSchema = z.object({
    email: z.string().min(1, "O email é obrigatório").email("Formato de email inválido").toLowerCase(),
    senha: z.string().min(1, "A senha é obrigatória").min(6, 'A senha precisa ter no mínimo 6 caracteres')
});

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });
    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState('');

    async function handleSubmitForm(data) {
        try {
            const resposta = await login(data);
            Cookies.set("auth-token", resposta.data.token, { expires: 1 / 96, sameSite: 'None', secure: true }); // 15 minutos
            navigate("/");
        } catch (error) {
            console.error("Erro ao fazer login:", error.message);
            setMensagem("Erro ao fazer login: Verifique suas credenciais.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-around bg-black rounded p-8 w-[35rem]">
            <img src={logo} alt="Logo Star Wars" className='w-44 py-10' />
            <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col justify-center gap-4 w-full text-2xl">
                <Input
                    type="email"
                    placeholder="Email"
                    register={register}
                    name="email"
                />
                {errors.email && <ErrorInput text={errors.email.message} />}
                <Input
                    type="password"
                    placeholder="Senha"
                    register={register}
                    name="senha"
                />
                {errors.senha && <ErrorInput text={errors.senha.message} />}
                
                <Button text="LOGIN" type="submit" />
            </form>
            {mensagem && <div className="mt-4 text-lg text-white">{mensagem}</div>}
        </div>
    );
}