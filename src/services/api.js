// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // URL base ajustada
});

// --- Rotas de Palavras ---
export const getTodasPalavras = () => {
  return apiClient.get('/words/');
};

export const adicionarPalavra = (palavra) => {
  return apiClient.post('/words/add', { palavra });
};

export const iniciarLicao = () => {
  return apiClient.get('/words/lesson/start');
};

export const checarResposta = (fraseId, palavraId, fraseOriginal, respostaUsuario) => {
  return apiClient.post('/words/lesson/check', { fraseId, palavraId, fraseOriginal, respostaUsuario });
};

export const deletarPalavra = (id) => {
  return apiClient.delete(`/words/${id}`);
};

export const getPalavraDetalhes = (id) => {
  return apiClient.get(`/words/${id}/details`);
};

// --- NOVAS FUNÇÕES PARA LISTENING ---
export const iniciarLicaoListening = () => {
  return apiClient.get('/listening/start');
};

export const checarRespostasListening = (data) => {
  return apiClient.post('/listening/check', data);
};