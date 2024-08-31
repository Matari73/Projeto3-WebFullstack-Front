import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:3001"

export async function criarPersonagem(data) {
    const token = Cookies.get('auth-token');
    if (!token) {
        throw new Error('Token não encontrado');
    }
    try {
        const response = await axios.post(`${BASE_URL}/personagem`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error('Erro na requisição:', error.message);
        throw error;
    }
}

export async function buscarPersonagem(nome) {
    const token = Cookies.get('auth-token');
    if (!token) {
        throw new Error('Token não encontrado');
    }
    try {
        const response = await axios.get(`${BASE_URL}/personagem`, {
            params: { nome },
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error('Erro na requisição:', error.message);
        throw error;
    }
}
