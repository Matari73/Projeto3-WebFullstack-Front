import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import logo from '../assets/logoSW.png';
import Button from '../components/Button';
import ErrorInput from '../components/ErrorInput';
import Input from '../components/Input';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buscarPersonagem } from '../services/personagem';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const personagemSchemaHome = z.object({
    nome: z.string().min(1, "O nome é obrigatório").trim(),
});


export default function Home() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(personagemSchemaHome) });
    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState('');
    const [personagens, setPersonagens] = useState([]);

    async function handleSubmitForm(data) {
        try {
            const resposta = await buscarPersonagem(data.nome);
            setPersonagens(resposta.data);
            console.log("Resposta do backend:", resposta);
            if (resposta.data.token) {
                Cookies.set("auth-token", resposta.data.token, { expires: 1 / 96, sameSite: 'None', secure: true });
            } else {
                console.error("Token não encontrado na resposta.");
            }
        } catch (error) {
            console.error("Erro ao listar personagens:", error.message);
            if (error.response && error.response.status === 401) {
                console.error("Erro 401: Não autorizado - verifique o token.");
            }
            setMensagem(`Erro ao listar personagens: ${error.message}`);
        }
    }
    


    function validateToken() {
        const token = Cookies.get("auth-token");
        if (!token) navigate("/login");
    }

    useEffect(() => {
        validateToken();
    }, [navigate]);

    return (
        <main className="flex flex-col items-center justify-center bg-black rounded p-8 w-[60rem] h-[35rem] text-2xl">
            <header className="flex items-center justify-between w-full pb-4">
                <img src={logo} alt="Logo Star Wars" className='w-32' />
                <form onSubmit={handleSubmit(handleSubmitForm)} className='flex items-center gap-4 text-black text-2xl'>
                    <Input
                        type="text"
                        placeholder="Nome"
                        register={register}
                        name="nome"
                    />
                    {errors.nome && <ErrorInput text={errors.nome.message} />}
                    <Button type="submit" text="Buscar" icon="search" />
                </form>
            </header>

            <section className='bg-zinc-300 p-4 w-full h-[400px] rounded flex flex-col gap-4 overflow-y-auto'>
                {personagens.length > 0 ? (
                    personagens.map((personagem) => (
                        <div key={personagem._id} className='p-4 bg-white rounded'>
                            <h3 className='text-xl font-bold'>{personagem.nome}</h3>
                            <p>Altura: {personagem.altura}</p>
                            <p>Massa: {personagem.massa}</p>
                            <p>Cor do Cabelo: {personagem.corCabelo}</p>
                            <p>Cor da Pele: {personagem.corPele}</p>
                            <p>Cor dos Olhos: {personagem.corOlhos}</p>
                            <p>Gênero: {personagem.genero}</p>
                        </div>
                    ))
                ) : (
                    <p className='text-center text-lg text-gray-700'>Nenhum personagem encontrado.</p>
                )}
            </section>

            {mensagem && <div className="mt-4 text-lg text-white">{mensagem}</div>}

            <footer className='w-full pt-10 flex justify-center text-white text-lg font-bold'>
                <Link to="/personagem">
                    <Button type="button" text="Novo personagem" icon="plus" />
                </Link>
            </footer>
        </main>
    );
}
