import { inicializarRoteador } from "./router.js";
import { inicializarValidacao } from "./validation.js";
import { obterDetalheProjeto } from "./templates.js";

function inicializarMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const lista = document.querySelector(".nav-list");
  if (!toggle || !lista) return;
  toggle.addEventListener("click", () => {
    const aberto = lista.classList.toggle("active");
    toggle.setAttribute("aria-expanded", String(aberto));
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
}

function inicializarAcoes() {
  document.addEventListener("click", event => {
    const projetoBotao = event.target.closest("[data-project]");
    if (projetoBotao) {
      const projeto = obterDetalheProjeto(projetoBotao.dataset.project);
      if (!projeto) return;
      document.getElementById("dialog-title").textContent = projeto.titulo;
      document.getElementById("dialog-text").textContent = projeto.detalhe;
      document.getElementById("project-dialog").showModal();
      return;
    }
    if (event.target.closest(".dialog-close")) {
      document.getElementById("project-dialog").close();
      return;
    }
    if (event.target.closest("[data-action='toast']")) mostrarToast("Obrigado por conhecer a Esperança que Transforma!");
  });

  document.getElementById("project-dialog")?.addEventListener("click", event => {
    if (event.target.id === "project-dialog") event.currentTarget.close();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") document.getElementById("project-dialog")?.close();
  });
}

function mostrarToast(texto) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = texto;
  toast.classList.add("show");
  window.clearTimeout(mostrarToast.timer);
  mostrarToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

document.addEventListener("spa:render", () => inicializarValidacao());

inicializarMenu();
inicializarAcoes();
inicializarRoteador();
