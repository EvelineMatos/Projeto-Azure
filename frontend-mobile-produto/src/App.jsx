import { useState } from 'react';

function App() {
  const [produto, setProduto] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const verificarProduto = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://<URL-DO-BFF>/produtos/verificar?nome=${produto}`);
      const data = await res.json();
      setResultado(data.produtoCadastrado);
    } catch (err) {
      alert('Erro ao verificar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 400, margin: 'auto' }}>
      <h2>Verificar Produto Bancário</h2>
      <input
        type="text"
        placeholder="Digite o nome do produto"
        value={produto}
        onChange={(e) => setProduto(e.target.value)}
        style={{ padding: '0.5rem', width: '100%' }}
      />
      <button
        onClick={verificarProduto}
        disabled={loading}
        style={{
          marginTop: '1rem',
          padding: '0.5rem',
          width: '100%',
          backgroundColor: '#0078D4',
          color: 'white',
          border: 'none',
        }}
      >
        {loading ? 'Verificando...' : 'Verificar'}
      </button>
      {resultado !== null && (
        <p style={{ marginTop: '1rem' }}>
          Produto {resultado ? 'está cadastrado ✅' : 'NÃO está cadastrado ❌'}
        </p>
      )}
    </div>
  );
}

export default App;
