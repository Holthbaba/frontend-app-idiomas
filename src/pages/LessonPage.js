// src/pages/LessonPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarLicao, checarResposta } from '../services/api';

function LessonPage() {
  // O desafio agora armazena o objeto completo retornado pela API: { id, palavra_id, frase_texto }
  const [desafio, setDesafio] = useState(null);
  const [resposta, setResposta] = useState('');
  const [feedback, setFeedback] = useState({ tipo: '', texto: '' });
  const [loading, setLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  const carregarProximoDesafio = useCallback(async () => {
    setLoading(true);
    setFeedback({ tipo: '', texto: '' });
    setResposta('');
    setDesafio(null);
    try {
      const response = await iniciarLicao();
      setDesafio(response.data);
    } catch (error) {
      // Se a API retornar 404 (Nenhuma frase nova), exibe a mensagem e oferece voltar ao Dashboard
      const errorMsg = error.response?.data?.message || 'Erro ao carregar a lição.';
      setFeedback({ tipo: 'info', texto: errorMsg });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarProximoDesafio();
  }, [carregarProximoDesafio]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resposta.trim() || !desafio) return;

    setIsChecking(true);
    try {
      // Passamos os novos IDs (id da frase e palavra_id) para a API
      const res = await checarResposta(
        desafio.id,
        desafio.palavra_id,
        desafio.frase_texto,
        resposta
      );
      
      const { acertou, message } = res.data;

      if (acertou) {
        setFeedback({ tipo: 'sucesso', texto: message });
        // Se acertou, carrega o próximo desafio após um breve intervalo
        setTimeout(() => {
          carregarProximoDesafio();
        }, 2500);
      } else {
        // Se errou, mostra o feedback, mas NÃO carrega um novo desafio. Permite que o usuário tente novamente.
        setFeedback({ tipo: 'erro', texto: message });
      }

    } catch (error) {
      setFeedback({ tipo: 'erro', texto: 'Erro ao processar sua resposta.' });
    } finally {
      setIsChecking(false);
    }
  };

  if (loading) return <p>Preparando seu desafio...</p>;

  // Se não há desafio e há uma mensagem de feedback (ex: "Nenhuma frase nova"), exibe a mensagem.
  if (!desafio && feedback.texto) {
     return (
        <div style={{textAlign: 'center'}}>
            <div style={{padding: '15px', color: 'black', background: '#e2e3e5', borderRadius: '5px' }}>
                {feedback.texto}
            </div>
            <button onClick={() => navigate('/')} style={{marginTop: '1rem'}}>Voltar ao Dashboard</button>
        </div>
     )
  }

  return (
    <div>
      <h2>Lição do Dia</h2>
      <div style={{ background: '#e7f3fe', padding: '20px', borderRadius: '8px', margin: '2rem 0' }}>
        <p>Traduza a seguinte frase para o português:</p>
        <h3 style={{marginTop: '1rem', fontStyle: 'italic'}}>"{desafio.frase_texto}"</h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          placeholder="Digite sua tradução aqui..."
          rows="4"
          disabled={isChecking || feedback.tipo === 'sucesso'} // Desabilita após acertar
        />
        <button type="submit" disabled={isChecking || feedback.tipo === 'sucesso'}>
          {isChecking ? 'Corrigindo...' : 'Corrigir Resposta'}
        </button>
      </form>

      {feedback.texto && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          color: 'white',
          borderRadius: '5px',
          background: feedback.tipo === 'sucesso' ? '#28a745' : '#dc3545'
        }}>
          {feedback.texto}
        </div>
      )}
    </div>
  );
}

export default LessonPage;