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
