# Gerenciando o estado com o useReducer: organização e flexibilidade no React.js**

**Resumo:**

O `useReducer` é um hook do React que oferece uma maneira alternativa de gerenciar o estado de seus componentes. Em comparação ao `useState`, o `useReducer` fornece maior flexibilidade para lidar com regras de negócios complexas e estados compartilhados.

**StrictMode:**

* O `StrictMode` pode ser ativado no `main.jsx` para realizar verificações adicionais no código.
* O `useReducer` será chamado duas vezes no `StrictMode`, o que pode ser útil para depuração, mas também pode gerar alertas desnecessários.

**Funcionamento:**

O `useReducer` funciona com base em dois pilares:

* **Função reducer:** Uma função pura que recebe o estado atual e uma ação como parâmetros e retorna o novo estado.
* **Ações:** Objetos que definem o que deve ser feito com o estado.

**Criando um reducer:**

1. Crie um arquivo `reducer.js`.
2. Defina a função `reducer` que recebe `estado` e `acao` como parâmetros:

```javascript
const reducer = (estado, acao) => {
  // ... lógica de atualização do estado
};

export default reducer;
```

**Exemplo:**

Considere um componente que gerencia uma lista de frases. A função `reducer` pode ser definida da seguinte forma:

```javascript
const reducer = (estado, acao) => {
  switch (acao.tipo) {
    case "ADICIONAR_FRASE":
      if (acao.frase.length < 20) {
        alert("Frase muito curta!");
        return estado;
      }
      if (estado.includes(acao.frase)) {
        alert("Frase duplicada!");
        return estado;
      }
      return [...estado, acao.frase];
    case "EXCLUIR_FRASE":
      return estado.filter(frase => frase !== acao.frase);
    default:
      return estado;
  }
};

export default reducer;
```

**Utilizando o `useReducer`:**

1. Importe o hook `useReducer` e o reducer criado:

```javascript
import useReducer from "react";
import reducer from "./reducer";
```

2. Utilize o hook `useReducer` no componente:

```javascript
const [frases, dispatch] = useReducer(reducer, []);
```

O hook retorna um array com duas posições:

* `frases`: O estado atual, neste caso, a lista de frases.
* `dispatch`: Uma função para enviar ações para o reducer.

**Enviando ações:**

Para atualizar o estado, envie uma ação para o reducer usando a função `dispatch`:

```javascript
function salvarFrase(evento) {
  evento.preventDefault();

  const frase = evento.target.value;

  dispatch({
    tipo: "ADICIONAR_FRASE",
    frase,
  });
}
```

**Exemplo completo:**

```javascript
import React, { useState } from "react";
import useReducer from "react";
import reducer from "./reducer";

function App() {
  const [frases, dispatch] = useReducer(reducer, []);

  function salvarFrase(evento) {
    evento.preventDefault();

    const frase = evento.target.value;

    dispatch({
      tipo: "ADICIONAR_FRASE",
      frase,
    });
  }

  function excluirFrase(fraseExcluida) {
    dispatch({
      tipo: "EXCLUIR_FRASE",
      frase: fraseExcluida,
    });
  }

  return (
    <div>
      <h1>Lista de frases</h1>
      <form onSubmit={salvarFrase}>
        <input type="text" name="frase" />
        <button type="submit">Salvar</button>
      </form>
      <ul>
        {frases.map((frase, index) => (
          <li key={index}>
            {frase} - <button onClick={() => excluirFrase(frase)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

**Vantagens do `useReducer`:**

* **Organização:** Centraliza a lógica de negócios em um único lugar.
* **Flexibilidade:** Permite lidar com estados complexos e ações personalizadas.
* **Reusabilidade:** O reducer pode ser reutilizado em diferentes componentes.
* **Teste:** Facilita o teste da lógica de estado.

**Recursos adicionais:**

* Documentação do React sobre o useReducer: [Documentação React useReducer](https://react.dev/reference/react/useReducer)
* Artigo sobre o useReducer vs. useState: [Artigo](https://blog.logrocket.com/react-usereducer-hook-ultimate-guide/)