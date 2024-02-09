import { useReducer, useState } from "react";
import "./App.css";
import reducer, { ADICIONAR_FRASE, EXCLUIR_FRASE } from "./reducer";

function App() {
  const [frase, setFrase] = useState("");
  const [frases, dispatch] = useReducer(reducer, []) //Receberá como argumento o reducer criado no arquivo reducer.jsx e o estado inicial que é um array vazio

  function salvarFrase(evento) {
    evento.preventDefault();
    dispatch({
      tipo: ADICIONAR_FRASE,
      frase //forma de simplificar a inicialização do objeto. Mesma coisa que frase: frase
    })
  }

  function excluir(fraseExcluida) {
    dispatch({
      tipo: EXCLUIR_FRASE,
      frase: fraseExcluida
    })
  }

  return (
    <div className="App">
      <form onSubmit={salvarFrase}>
        <textarea
          value={frase}
          onChange={(evento) => setFrase(evento.target.value)}
          placeholder="Digite sua frase..."
          required
        />
        <br />
        <button>Salvar frase</button>
      </form>
      {frases.map((fraseAtual, index) => (
        <p key={index}>{fraseAtual} - <button onClick={() => excluir(fraseAtual)}>X</button></p>
      ))}
    </div>
  );
}

export default App;
