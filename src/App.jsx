import React, { useState, useEffect } from 'react';

function App() {
  const [joke, setJoke] = useState('');
  const [jokes, setJokes] = useState([]);

  const fetchJoke = () => {
    fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        setJoke(data.joke);
      })
      .catch((error) => {
        console.error('Error fetching joke:', error);
      });
  };

  useEffect(() => {
    fetchJoke();
  }, []); // Se ejecuta una sola vez al cargar la página

  const addJoke = () => {
    setJokes([...jokes, joke]);
    fetchJoke(); // Obtén un nuevo chiste después de agregarlo
  };

  return (
    <div>
      <h1>Chistes</h1>
      <p>{joke}</p>
      <button onClick={addJoke}>Agregar Chiste</button>

      <h2>Chistes Guardados:</h2>
      <ul>
        {jokes.map((j, index) => (
          <li key={index}>{j}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
