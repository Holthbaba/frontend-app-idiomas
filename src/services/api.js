// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api/words',
});

export const getTodasPalavras = () => {
  return apiClient.get('/');
};

export const adicionarPalavra = (palavra) => {
  return apiClient.post('/add', { palavra });
};

export const iniciarLicao = () => {
  return apiClient.get('/lesson/start');
};

export const checarResposta = (fraseId, palavraId, fraseOriginal, respostaUsuario) => {
  return apiClient.post('/lesson/check', { fraseId, palavraId, fraseOriginal, respostaUsuario });
};

export const deletarPalavra = (id) => {
  return apiClient.delete(`/${id}`);
};

// NOVA FUNÇÃO
export const getPalavraDetalhes = (id) => {
  return apiClient.get(`/${id}/details`);
};