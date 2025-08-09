// src/pages/WordDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPalavraDetalhes } from '../services/api';

function WordDetailsPage() {
  const [detalhes, setDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        const response = await getPalavraDetalhes(id);
        setDetalhes(response.data);
      } catch (err) {
        setError('Não foi possível carregar os detalhes da palavra.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalhes();
  }, [id]);

  if (loading) {
    return <p>Carregando detalhes...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <button onClick={() => navigate('/')} style={{ marginBottom: '2rem' }}>
        &larr; Voltar para o Dashboard
      </button>
      {detalhes ? (
        <div>
          <h1>{detalhes.palavra}</h1>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', background: '#f9f9f9', padding: '1rem', borderRadius: '5px' }}>
            {detalhes.detalhes}
          </div>
        </div>
      ) : (
        <p>Nenhum detalhe encontrado.</p>
      )}
    </div>
  );
}

export default WordDetailsPage;