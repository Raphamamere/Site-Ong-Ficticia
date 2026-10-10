import { templateInicio, templateProjetos, templateVoluntariado } from "./templates.js";

const rotas = {
  "/inicio": { titulo: "Início", render: templateInicio },
  "/projetos": { titulo: "Projetos", render: templateProjetos },
  "/voluntariado": { titulo: "Seja voluntário", render: templateVoluntariado }
};

export function inicializarRoteador() {
  document.addEventListener("click", event => {
    const link = event.target.closest("a[data-link]");
    if (!link) return;
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (window.location.hash === link.getAttribute("href")) {
      renderizarRota();
    } else {
      window.location.hash = link.getAttribute("href");
    }
  });

  window.addEventListener("hashchange", renderizarRota);
  renderizarRota();
}

export function renderizarRota() {
  const caminho = window.location.hash.replace(/^#/, "") || "/inicio";
  const rota = rotas[caminho] || rotas["/inicio"];
  const main = document.getElementById("conteudo");
  main.innerHTML = rota.render();
  document.title = `${rota.titulo} | Esperança que Transforma`;
  document.querySelectorAll(".nav-list a").forEach(link => {
    const ativo = link.getAttribute("href") === `#${caminho}`;
    if (ativo) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.querySelector(".nav-list")?.classList.remove("active");
  const toggle = document.querySelector(".menu-toggle");
  toggle?.setAttribute("aria-expanded", "false");
  toggle?.setAttribute("aria-label", "Abrir menu");
  main.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "auto" });
  document.dispatchEvent(new CustomEvent("spa:render", { detail: { path: caminho } }));
}
