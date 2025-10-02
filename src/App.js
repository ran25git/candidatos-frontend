import React, { useEffect, useState } from 'react';
import './App.css'; // CSS externo si lo necesitás

function App() {
  const [candidatos, setCandidatos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [escapando, setEscapando] = useState(false);

  useEffect(() => {
    fetch('https://candidatos-backend.onrender.com/api/public/candidatos')



      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCandidatos(data);
        } else if (Array.isArray(data.data)) {
          setCandidatos(data.data);
        } else {
          setCandidatos([]);
        }
      })
      .catch(err => {
        console.error('Error cargando candidatos:', err);
        setCandidatos([]);
      });
  }, []);

  const handleVote = () => {
    if (selectedId === null) {
      alert('Por favor seleccioná un candidato para votar.');
      return;
    }
    const candidato = candidatos.find(c => c.id === selectedId);
    alert(`¡Gracias por votar por ${candidato.NombreCandidato}!`);
  };

  return (
    <div
      style={{
        padding: '40px 20px',
        backgroundColor: '#007bff',
        minHeight: '100vh',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '40px' }}>Encuesta: Elegí a tu candidato</h1>

      {candidatos.length === 0 ? (
        <p>Cargando candidatos...</p>
      ) : (
        <div
          style={{
            display: 'flex',
            gap: '40px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {candidatos.map(c => {
            console.log(
              `Candidato: ${c.NombreCandidato}, tamaño input: ${
                c.NombreCandidato.toLowerCase() === 'sergio' ? '60px' : '20px'
              }`
            );

            const imagen = c.imageCAndidato;
            const imagenUrl = imagen?.url;

            return (
              <div
                key={c.id}
                style={{
                  border: '2px solid white',
                  padding: '20px',
                  borderRadius: '12px',
                  width: '300px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                }}
              >
                <h3 style={{ marginBottom: '20px' }}>{c.NombreCandidato}</h3>

                {imagenUrl && (
                  <img
  src={`https://candidatos-backend.onrender.com${imagenUrl}`}
                    alt={c.NombreCandidato}
                    width="250"
                    style={{ marginBottom: '20px', borderRadius: '8px' }}
                  />
                )}

                <label
                  style={{
                    display: 'inline-block',
                    position: 'relative',
                    height: '40px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    userSelect: 'none',
                    color: 'white',
                  }}
                  onMouseEnter={() => c.id === 2 && setEscapando(true)}
                  onMouseLeave={() => c.id === 2 && setEscapando(false)}
                >
                  <input
                    type="radio"
                    name="voto"
                    checked={selectedId === c.id}
                    onChange={() => setSelectedId(c.id)}
                    style={{
                      position: 'relative',
                      width: c.NombreCandidato.toLowerCase() === 'sergio' ? '60px' : '20px',
                      height: c.NombreCandidato.toLowerCase() === 'sergio' ? '60px' : '20px',
                      marginRight: '10px',
                      verticalAlign: 'middle',
                      left: c.id === 2 && escapando ? '120px' : '0px',
                      transition: 'left 0.3s ease',
                      cursor: 'pointer',
                      border: c.NombreCandidato.toLowerCase() === 'sergio' ? '3px solid yellow' : '1px solid white',
                      borderRadius: '50%',
                    }}
                  />
                  Votar por este candidato
                </label>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={handleVote}
        style={{
          marginTop: '50px',
          padding: '14px 30px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'white',
          color: '#007bff',
          boxShadow: '0 4px 8px rgba(0,123,255,0.4)',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = '#0056b3';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.color = '#007bff';
        }}
      >
        Votar
      </button>
    </div>
  );
}

export default App;
