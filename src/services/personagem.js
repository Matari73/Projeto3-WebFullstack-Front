import axios from 'axios';
import Cookies from 'js-cookie';

export async function criarPersonagem(data) {
    const token = Cookies.get('auth-token');
    if (!token) {
        throw new Error('Token não encontrado');
    }
    try {
        const response = await axios.post('http://localhost:3001/personagem', data, {
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
