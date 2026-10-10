# Esperança que Transforma — SPA

Projeto educacional de uma ONG convertido para uma Single Page Application (SPA) com HTML, CSS e JavaScript puro (ES Modules).

## Estrutura

- `html/index.html`: documento principal e regiões persistentes da interface.
- `css/style.css`: estilos responsivos, estados de validação e foco acessível.
- `imagens/`: imagens usadas nos conteúdos.
- `js/app.js`: inicialização, menu, modal e ações globais.
- `js/router.js`: roteamento por hash e renderização do conteúdo principal.
- `js/templates.js`: templates HTML e dados dos projetos.
- `js/validation.js`: validação dos campos e feedback do formulário.
- `js/storage.js`: leitura e gravação de cadastros no `localStorage`.

## Executar localmente

Como o projeto usa ES Modules, abra a pasta com um servidor local (por exemplo, Live Server no VS Code) e acesse `html/index.html`. Não abra o arquivo diretamente via `file://`.

## Navegação

As rotas usam fragmentos de URL para funcionar em hospedagem estática:

- `#/inicio`
- `#/projetos`
- `#/voluntariado`

## Persistência e privacidade

Os cadastros são guardados no `localStorage` do navegador e não são enviados a um servidor. Para uma aplicação real, não armazene CPF e outros dados pessoais sensíveis dessa forma sem avaliação de segurança, consentimento e política de privacidade. Este armazenamento serve apenas para demonstração acadêmica.

## Versionamento GitFlow (sugestão)

- `main`: versão estável.
- `develop`: integração das alterações em desenvolvimento.
- `feature/*`: desenvolvimento isolado de funcionalidades.
- `hotfix/*`: correções urgentes na versão publicada.

## Acessibilidade

Foram incluídos rótulos associados aos campos, mensagens com `aria-live`, navegação por teclado, link para pular ao conteúdo, foco visível, texto alternativo nas imagens e suporte a `prefers-reduced-motion`. Isso ajuda a atender boas práticas de acessibilidade; a conformidade WCAG 2.1 AA precisa ser confirmada por testes manuais e automatizados.
