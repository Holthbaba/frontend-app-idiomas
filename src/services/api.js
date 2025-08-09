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

// --- FUNÇÃO ATUALIZADA ---
// Agora recebe fraseId e palavraId para enviar ao backend.
export const checarResposta = (fraseId, palavraId, fraseOriginal, respostaUsuario) => {
  return apiClient.post('/lesson/check', { fraseId, palavraId, fraseOriginal, respostaUsuario });
};

export const deletarPalavra = (id) => {
  // A URL será algo como /api/words/15
  return apiClient.delete(`/${id}`);
};