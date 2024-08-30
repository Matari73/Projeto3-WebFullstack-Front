import axios from 'axios';
import Cookies from 'js-cookie';

export async function criarPersonagem(data) {
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('Token não encontrado');
    }
    return axios.post('http://localhost:3001/personagem', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

