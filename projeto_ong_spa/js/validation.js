import { salvarCadastro } from "./storage.js";

const regras = {
  nome: valor => valor.trim().length >= 3 || "Informe seu nome completo (mínimo de 3 caracteres).",
  cpf: valor => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor) && validarCPF(valor) || "Informe um CPF válido no formato 000.000.000-00.",
  telefone: valor => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(valor) || "Informe um telefone no formato (11) 99999-9999.",
  email: valor => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) || "Informe um e-mail válido.",
  cep: valor => /^\d{5}-\d{3}$/.test(valor) || "Informe o CEP no formato 00000-000.",
  endereco: valor => valor.trim().length >= 4 || "Informe seu endereço.",
  cidade: valor => valor.trim().length >= 2 || "Informe sua cidade.",
  interesse: valor => Boolean(valor) || "Selecione uma área de interesse."
};

export function inicializarValidacao() {
  const form = document.getElementById("volunteer-form");
  if (!form) return;

  form.querySelectorAll("input:not([type=checkbox]), select, textarea").forEach(campo => {
    campo.addEventListener("input", () => validarCampo(campo));
    campo.addEventListener("change", () => validarCampo(campo));
  });
  document.getElementById("consentimento")?.addEventListener("change", event => validarConsentimento(event.target));

  form.addEventListener("submit", event => {
    event.preventDefault();
    let valido = true;
    form.querySelectorAll("[name]").forEach(campo => {
      if (campo.name === "consentimento") {
        if (!validarConsentimento(campo)) valido = false;
      } else if (campo.name in regras && !validarCampo(campo)) {
        valido = false;
      }
    });

    if (!valido) {
      form.querySelector(".campo-invalido")?.focus();
      exibirFeedback("Revise os campos destacados antes de enviar.", "error");
      return;
    }

    const cadastro = Object.fromEntries(new FormData(form).entries());
    delete cadastro.consentimento;
    const salvo = salvarCadastro(cadastro);
    if (!salvo) {
      exibirFeedback("Não foi possível salvar os dados neste navegador. Verifique as configurações de armazenamento.", "error");
      return;
    }
    form.reset();
    form.querySelectorAll(".campo-invalido, .campo-valido").forEach(campo => campo.classList.remove("campo-invalido", "campo-valido"));
    form.querySelectorAll(".field-error").forEach(el => el.textContent = "");
    exibirFeedback("Cadastro salvo neste navegador com sucesso. Obrigado por fazer parte dessa transformação!", "success");
  });
}

function validarCampo(campo) {
  const regra = regras[campo.name];
  if (!regra) return true;
  const resultado = regra(campo.value);
  const valido = resultado === true;
  campo.classList.toggle("campo-invalido", !valido);
  campo.classList.toggle("campo-valido", valido && campo.value.trim() !== "");
  campo.setAttribute("aria-invalid", String(!valido));
  const mensagem = document.getElementById(`${campo.id}-error`);
  if (mensagem) mensagem.textContent = valido ? "" : resultado;
  return valido;
}

function validarConsentimento(campo) {
  const valido = campo.checked;
  campo.setAttribute("aria-invalid", String(!valido));
  const mensagem = document.getElementById("consentimento-error");
  if (mensagem) mensagem.textContent = valido ? "" : "É necessário concordar para continuar.";
  return valido;
}

function exibirFeedback(mensagem, tipo) {
  const feedback = document.getElementById("form-feedback");
  if (!feedback) return;
  feedback.textContent = mensagem;
  feedback.className = `form-feedback ${tipo}`;
  feedback.hidden = false;
}

function validarCPF(cpf) {
  const numeros = cpf.replace(/\D/g, "");
  if (numeros.length !== 11 || /^([0-9])\1{10}$/.test(numeros)) return false;
  for (let tamanho = 9; tamanho <= 10; tamanho++) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(numeros[i]) * ((tamanho + 1) - i);
    const digito = (soma * 10) % 11 % 10;
    if (digito !== Number(numeros[tamanho])) return false;
  }
  return true;
}
