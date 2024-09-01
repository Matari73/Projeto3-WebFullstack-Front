import { useForm } from 'react-hook-form'
import logo from '../assets/logoSW.png'
import Button from '../components/Button'
import Input from '../components/Input'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorInput from '../components/ErrorInput'
import { criarPersonagem } from '../services/personagem'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BiArrowBack } from "react-icons/bi"
import { Link } from 'react-router-dom';

const personagemSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório").trim(),
    altura: z.preprocess((val) => {
        if (val === "" || val === null || val === undefined) return undefined;
        return parseFloat(val);
    }, z.number({ required_error: "A altura é obrigatória" })
        .min(0, "A altura deve ser um valor positivo")
        .max(300, "Altura não pode ser maior que 300 cm")),
    massa: z.preprocess((val) => {
        if (val === "" || val === null || val === undefined) return undefined;
        return parseFloat(val);
    }, z.number({ required_error: "A massa é obrigatória" })
        .min(0, "A massa deve ser um valor positivo")),
    corCabelo: z.string().min(1, "A cor do cabelo é obrigatória"),
    corPele: z.string().min(1, "A cor da pele é obrigatória"),
    corOlhos: z.string().min(1, "A cor dos olhos é obrigatória"),
    genero: z.string().min(1, "O gênero é obrigatório").refine((val) => {
        return ['masculino', 'feminino', 'outro'].includes(val);
    }, {
        message: "Por favor, selecione um gênero válido (masculino, feminino, outro)."
    })
});

export default function Personagem() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(personagemSchema) });
    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState('');

    async function handleSubmitForm(data) {
        try {
            const resposta = await criarPersonagem(data);

            if (resposta.data.token) {
                Cookies.set("auth-token", resposta.data.token, { expires: 1 / 96, sameSite: 'None', secure: true });
            } else {
                console.error("Token não encontrado na resposta.");
            }

            setMensagem('Personagem criado com sucesso!');
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.error("Erro ao criar personagem:", error.message);

            if (error.response && error.response.status === 401) {
                setMensagem("Erro 401: Não autorizado - verifique o token.");
            } else {
                setMensagem(`Erro ao criar personagem: ${error.message}`);
            }
        }
    }

    function validateToken() {
        const token = Cookies.get("auth-token");
        if (!token) navigate("/login");
    }

    useEffect(() => {
        validateToken();
    }, []);

    return (
        <div className="flex flex-col items-center justify-around bg-black relative rounded p-8 w-[35rem]">
            <Link to="/">
                <BiArrowBack className='text-white absolute top-6 left-4 text-2xl' />
            </Link>
            <img src={logo} alt="Logo Star Wars" className='w-44 py-10' />
            <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col justify-center gap-4 w-full text-2xl">
                <Input
                    type="nome"
                    placeholder="Nome"
                    register={register}
                    name="nome"
                />
                {errors.nome && <ErrorInput text={errors.nome.message} />}
                <Input
                    type="altura"
                    placeholder="Altura"
                    register={register}
                    name="altura"
                />
                {errors.altura && <ErrorInput text={errors.altura.message} />}
                <Input
                    type="massa"
                    placeholder="Massa"
                    register={register}
                    name="massa"
                />
                {errors.massa && <ErrorInput text={errors.massa.message} />}
                <Input
                    type="corCabelo"
                    placeholder="Cor do Cabelo"
                    register={register}
                    name="corCabelo"
                />
                {errors.corCabelo && <ErrorInput text={errors.corCabelo.message} />}
                <Input
                    type="corPele"
                    placeholder="Cor da Pele"
                    register={register}
                    name="corPele"
                />
                {errors.corPele && <ErrorInput text={errors.corPele.message} />}
                <Input
                    type="corOlhos"
                    placeholder="Cor dos Olhos"
                    register={register}
                    name="corOlhos"
                />
                {errors.corOlhos && <ErrorInput text={errors.corOlhos.message} />}
                <Input
                    type="genero"
                    placeholder="Genero"
                    register={register}
                    name="genero"
                />
                {errors.genero && <ErrorInput text={errors.genero.message} />}
                <Button text="Criar" type="submit" />
            </form>
            {mensagem && <div className="mt-4 text-lg text-white">{mensagem}</div>}
        </div>
    );
}
