// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodasPalavras, deletarPalavra } from '../services/api'; // 1. Importe a função de deletar

function DashboardPage() {
  const [palavras, setPalavras] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const carregarPalavras = async () => {
    setLoading(true);
    try {
      const response = await getTodasPalavras();
      setPalavras(response.data);
    } catch (error) {
      console.error("Erro ao buscar palavras:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPalavras();
  }, []);

  // 2. Crie a função para lidar com a exclusão
  const handleDelete = async (palavraId, palavraTexto) => {
    // Adiciona uma confirmação para evitar exclusões acidentais (BOA PRÁTICA)
    if (window.confirm(`Tem certeza de que deseja excluir a palavra "${palavraTexto}"? Isso não pode ser desfeito.`)) {
      try {
        await deletarPalavra(palavraId);
        // Atualiza o estado local para remover a palavra da lista sem recarregar a página
        setPalavras(palavras.filter(p => p.id !== palavraId));
        alert(`Palavra "${palavraTexto}" excluída com sucesso!`);
      } catch (error) {
        console.error("Erro ao deletar palavra:", error);
        alert("Não foi possível excluir a palavra.");
      }
    }
  };

  if (loading) return <p>Carregando palavras...</p>;

  return (
    <div>
      <h1>Meu Vocabulário</h1>
      <button
        onClick={() => navigate('/licao')}
        disabled={palavras.filter(p => p.status === 'aprendendo').length === 0}
      >
        Iniciar Lição
      </button>

      {palavras.length === 0 && !loading ? (
        <p style={{marginTop: '1rem'}}>Você ainda não adicionou nenhuma palavra. Vá para a aba "Adicionar Palavra".</p>
      ) : (
        <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px' }}>Palavra</th>
              <th style={{ border: '1px solid #ddd', padding: '12px' }}>Status</th>
              <th style={{ border: '1px solid #ddd', padding: '12px' }}>Ações</th> {/* 3. Nova coluna */}
            </tr>
          </thead>
          <tbody>
            {palavras.map((p) => (
              <tr key={p.id}>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{p.palavra}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{p.status}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}> {/* 4. Nova célula com o botão */}
                  <button 
                    onClick={() => handleDelete(p.id, p.palavra)}
                    style={{backgroundColor: '#dc3545', fontSize: '0.8rem', padding: '5px 10px'}}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DashboardPage;