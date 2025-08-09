// src/pages/AddWordPage.js
import React, { useState } from 'react';
import { adicionarPalavra } from '../services/api';

function AddWordPage() {
  const [palavra, setPalavra] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState(''); // 'sucesso' ou 'erro'
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!palavra.trim()) {
      setMensagem('Por favor, insira uma palavra.');
      setTipoMensagem('erro');
      return;
    }
    try {
      await adicionarPalavra(palavra);
      setMensagem(`Palavra "${palavra}" adicionada com sucesso!`);
      setTipoMensagem('sucesso');
      setPalavra('');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erro ao adicionar a palavra.';
      setMensagem(errorMsg);
      setTipoMensagem('erro');
    }
  };

  return (
    <div>
      <h2>Adicionar Nova Palavra</h2>
      <p>Digite uma palavra em inglês que você deseja aprender.</p>
      <form onSubmit={handleSubmit} style={{ margin: '2rem 0' }}>
        <input
          type="text"
          value={palavra}
          onChange={(e) => setPalavra(e.target.value)}
          placeholder="Ex: ubiquitous"
        />
        <button type="submit">Adicionar</button>
      </form>
      {mensagem && (
        <div style={{
          padding: '10px',
          borderRadius: '5px',
          color: 'white',
          backgroundColor: tipoMensagem === 'sucesso' ? 'green' : 'red'
        }}>
          {mensagem}
        </div>
      )}
    </div>
  );



}

export default AddWordPage;