### Entendendo `useReducer` no React

- **Propósito**: `useReducer` é utilizado para gerenciar regras de negócio e lógica de estado de forma mais centralizada e organizada, especialmente útil para estados complexos ou quando a lógica de atualização é complexa.

#### Configuração Inicial

1. **Criação de um novo arquivo `reducer.js`**:
   - Este arquivo não retorna JSX.
   - Contém uma função `reducer` que manipula o estado e a ação.

```javascript
const reducer = (estado, acao) => {
  // Lógica do reducer
};

export default reducer;
```

2. **Estado e Ação**:
   - O `reducer` tem acesso ao estado atual e à ação que está sendo executada.
   - A ação é um objeto definido pelo desenvolvedor, que pode conter qualquer coisa, mas geralmente tem um tipo (por exemplo, "ADICIONAR_FRASE").

3. **Manipulação de Ações com `switch`**:
   - As validações e lógicas antes presentes no componente (ex.: `App.jsx`) são transferidas para o `reducer` usando um `switch` para tratar diferentes tipos de ações.

#### Exemplo Prático

- **Antes (no `App.jsx`)**:

```javascript
function salvarFrase(evento) {
  evento.preventDefault();
  if (frase.length < 20) {
    alert("Ops... Não são permitidas frases com menos de 20 caracteres!");
    return;
  }

  if (frases.includes(frase)) {
    alert("Não são permitidas frases duplicadas!");
    return;
  }

  setFrases([...frases, frase]);
}
```

- **Depois (no `reducer.js`)**:

```javascript
export const ADICIONAR_FRASE = "ADICIONAR_FRASE";

const reducer = (estado, acao) => {
  switch (acao.tipo) {
    case ADICIONAR_FRASE:
      if (acao.frase.length < 20) {
        alert("Ops... Não são permitidas frases com menos de 20 caracteres!");
        return estado;
      }

      if (estado.includes(acao.frase)) {
        alert("Não são permitidas frases duplicadas!");
        return estado;
      }
      return [...estado, acao.frase];

    default:
      return estado;
  }
};

export default reducer;
```

#### Integração com `useReducer`

- **No `App.jsx`**:
  - Importação do `useReducer` e do reducer criado.
  - Inicialização do estado com `useReducer`.

```javascript
import { useReducer } from "react";
import reducer, { ADICIONAR_FRASE } from "./reducer";

const [frases, dispatch] = useReducer(reducer, []);
```

- **Atualizando a função `salvarFrase`**:

```javascript
function salvarFrase(evento) {
  evento.preventDefault();
  dispatch({
    tipo: ADICIONAR_FRASE,
    frase
  });
}
```

- **Adicionando novas ações** (exemplo: `EXCLUIR_FRASE`):

```javascript
import reducer, { ADICIONAR_FRASE } from "./reducer";
```

```javascript
function excluir(fraseExcluida) {
  dispatch({
    tipo: EXCLUIR_FRASE,
    frase: fraseExcluida
  });
}
```

- **No arquivo reducer.js:**

```javascript
export const ADICIONAR_FRASE = "ADICIONAR_FRASE";
export const EXCLUIR_FRASE = "EXCLUIR_FRASE";

const reducer = (estado, acao) => {
  switch (acao.tipo) {
    case ADICIONAR_FRASE:
      if (acao.frase.length < 20) {
        alert("Ops... Não são permitidas frases com menos de 20 caracteres!");
        return estado; //Se falhar, retorna o estado.
      }

      if (estado.includes(acao.frase)) {
        alert("Não são permitidas frases duplicadas!");
        return estado; //Se falhar, retorna o estado.
      }
      return [...estado, acao.frase]; // Se tudo passar, será feito um return de um novo array passando o estado antigo e adicionando a frase que está na ação.
    
    case EXCLUIR_FRASE:
        return estado.filter(frase => frase !== acao.frase)
    default:
      return estado;
  }
};

export default reducer;
```

#### Observações

- **`useReducer` vs `useState`**: Embora internamente `useReducer` utilize `useState`, oferece uma abordagem mais estruturada e centralizada para gerenciar estados complexos.
- **.StrictMode**: Pode causar duplicidade nas validações em modo de desenvolvimento, mas é benéfico para identificar problemas.