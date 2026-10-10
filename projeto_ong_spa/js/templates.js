const projetos = [
  {
    categoria: "Alimentação",
    titulo: "Alimento para Todos",
    descricao: "Campanha de arrecadação e distribuição de alimentos para famílias em situação de vulnerabilidade.",
    detalhe: "O projeto realiza campanhas de arrecadação e distribuição de alimentos para famílias em situação de vulnerabilidade social.",
    imagem: "../imagens/food.jpg",
    alt: "Doação de alimentos para pessoas necessitadas"
  },
  {
    categoria: "Educação",
    titulo: "Educação para o Futuro",
    descricao: "Projeto voltado ao incentivo à educação, oferecendo apoio e oportunidades de aprendizado.",
    detalhe: "O projeto busca incentivar a educação por meio de apoio, orientação e oportunidades de aprendizado para crianças e jovens.",
    imagem: "../imagens/education.jpg",
    alt: "Ação de educação para crianças"
  },
  {
    categoria: "Doação",
    titulo: "Campanha do Agasalho",
    descricao: "Arrecadação de roupas e cobertores para ajudar pessoas durante os períodos de frio.",
    detalhe: "A campanha arrecada roupas e cobertores para auxiliar pessoas em situação de vulnerabilidade durante os períodos de frio.",
    imagem: "../imagens/coat.jpg",
    alt: "Campanha de arrecadação de agasalhos"
  }
];

export function templateInicio() {
  return `
    <section class="hero"><div class="container hero-grid">
      <div class="hero-text"><p class="eyebrow">Solidariedade que transforma</p><h1>Juntos podemos transformar vidas</h1>
        <p>A Esperança que Transforma atua para promover solidariedade, inclusão e oportunidades para pessoas em situação de vulnerabilidade.</p>
        <a href="#/projetos" class="button" data-link>Conheça nossos projetos</a>
      </div>
      <div class="hero-image"><img src="../imagens/hero.jpg" alt="Pessoas participando de uma ação social"></div>
    </div></section>
    <section><div class="container section-content"><h2>Sobre a ONG</h2><p>Nosso objetivo é desenvolver ações sociais que contribuam para uma sociedade mais justa, solidária e inclusiva.</p></div></section>
    <section class="values-section"><div class="container section-content"><h2>Nossos valores</h2><div class="value-cards">
      <article class="card"><span class="badge">Solidariedade</span><h3>Solidariedade</h3><p>Ações voltadas ao apoio de pessoas em situação de vulnerabilidade.</p></article>
      <article class="card"><span class="badge">Inclusão</span><h3>Inclusão</h3><p>Projetos que promovem oportunidades e participação social.</p></article>
      <article class="card"><span class="badge">Transformação</span><h3>Transformação</h3><p>Iniciativas que buscam gerar impactos positivos na comunidade.</p></article>
    </div></div></section>
    <section><div class="container section-content callout"><h2>Faça parte dessa transformação</h2><p>Você também pode contribuir com nossas ações. Cadastre-se para participar como voluntário.</p><a href="#/voluntariado" class="button" data-link>Quero ser voluntário</a> <button type="button" class="secondary-button" data-action="toast">Conheça nossa iniciativa</button></div></section>`;
}

export function templateProjetos() {
  const cards = projetos.map(projeto => `
    <article class="project-card">
      <img src="${projeto.imagem}" alt="${projeto.alt}" loading="lazy">
      <div class="project-card-content"><span class="badge">${projeto.categoria}</span><h2>${projeto.titulo}</h2>
      <p>${projeto.descricao}</p><button type="button" class="button" data-project="${projeto.titulo}">Ver detalhes</button></div>
    </article>`).join("");
  return `<section><div class="container section-content intro"><p class="eyebrow">Nossas iniciativas</p><h1>Nossos projetos</h1><p>Conheça algumas das iniciativas da Esperança que Transforma.</p></div></section>
    <section class="projects-section"><div class="container project-grid">${cards}</div></section>
    <section><div class="container volunteer-callout"><div><h2>Seja voluntário</h2><p>Participe das nossas ações e ajude a transformar vidas por meio da solidariedade.</p><a href="#/voluntariado" class="button" data-link>Quero ser voluntário</a></div><img src="../imagens/volunteers.jpg" alt="Voluntários participando de uma ação social" loading="lazy"></div></section>`;
}

export function templateVoluntariado() {
  return `<section><div class="container"><div class="form-container">
    <p class="eyebrow">Faça parte da mudança</p><h1>Cadastro de voluntário</h1><p>Preencha os dados abaixo para demonstrar seu interesse em participar.</p>
    <form id="volunteer-form" novalidate>
      <fieldset><legend>Dados do voluntário</legend>
        ${campo("nome", "Nome completo", "text", "Digite seu nome completo", "autocomplete=\"name\"", "100")}
        ${campo("cpf", "CPF", "text", "000.000.000-00", "inputmode=\"numeric\"", "14")}
        ${campo("telefone", "Telefone", "tel", "(11) 99999-9999", "autocomplete=\"tel\"", "15")}
        ${campo("email", "E-mail", "email", "voce@exemplo.com", "autocomplete=\"email\"", "100")}
        ${campo("cep", "CEP", "text", "00000-000", "inputmode=\"numeric\"", "9")}
        ${campo("endereco", "Endereço", "text", "Rua, número e complemento", "autocomplete=\"street-address\"", "150")}
        ${campo("cidade", "Cidade", "text", "Sua cidade", "autocomplete=\"address-level2\"", "80")}
        <div class="form-group"><label for="interesse">Área de interesse <span aria-hidden="true">*</span></label><select id="interesse" name="interesse" required><option value="">Selecione uma opção</option><option>Alimentação</option><option>Educação</option><option>Doações</option><option>Eventos</option><option>Comunicação</option></select><small class="field-error" id="interesse-error"></small></div>
        <div class="form-group"><label for="mensagem">Mensagem (opcional)</label><textarea id="mensagem" name="mensagem" maxlength="500" rows="4" placeholder="Conte um pouco sobre seu interesse"></textarea><small class="field-error" id="mensagem-error"></small></div>
        <div class="checkbox-group"><input type="checkbox" id="consentimento" name="consentimento" required><label for="consentimento">Concordo com o uso dos meus dados para contato. <span aria-hidden="true">*</span></label></div>
        <small class="field-error" id="consentimento-error"></small>
        <p class="form-note">Os dados deste formulário são salvos somente neste navegador para fins demonstrativos. Não são enviados a um servidor.</p>
        <button type="submit" class="button">Enviar cadastro</button>
        <p id="form-feedback" class="form-feedback" role="status" aria-live="polite" hidden></p>
      </fieldset>
    </form>
  </div></div></section>`;
}

function campo(id, label, type, placeholder, extra, maxLength) {
  return `<div class="form-group"><label for="${id}">${label} <span aria-hidden="true">*</span></label>
    <input id="${id}" name="${id}" type="${type}" placeholder="${placeholder}" ${extra} maxlength="${maxLength}" required aria-describedby="${id}-error">
    <small class="field-error" id="${id}-error"></small></div>`;
}

export function obterDetalheProjeto(titulo) {
  return projetos.find(projeto => projeto.titulo === titulo) || null;
}
