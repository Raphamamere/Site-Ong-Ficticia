const CHAVE_CADASTROS = "esperancaTransforma.cadastros";

export function obterCadastros() {
  try {
    const dados = localStorage.getItem(CHAVE_CADASTROS);
    if (!dados) return [];
    const parseados = JSON.parse(dados);
    return Array.isArray(parseados) ? parseados : [];
  } catch (erro) {
    console.error("Não foi possível recuperar os cadastros do navegador.", erro);
    return [];
  }
}

export function salvarCadastro(cadastro) {
  const cadastros = obterCadastros();
  cadastros.push({ ...cadastro, criadoEm: new Date().toISOString() });
  try {
    localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(cadastros));
    return true;
  } catch (erro) {
    console.error("Não foi possível salvar os dados no localStorage.", erro);
    return false;
  }
}
