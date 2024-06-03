# Projeto de Seleção Itaú

Primeiramente, gostaria de agradecer a oportunidade e expressar minha felicidade por ter tido a chance de mostrar um pouco do meu trabalho, mesmo que não seja selecionado.

## Estrutura do Projeto

O projeto segue uma estrutura de pastas com o objetivo de minimizar a quantidade de dependências entre os componentes.

Todos os arquivos não relacionados à estrutura padrão de um projeto em Angular estão dentro da pasta `src/app`.

### api

Esta pasta contém o acesso ao banco de dados e outras APIs (se existissem), facilitando a troca em caso de mudança de bancos, já que não há dependência direta dos componentes com o banco.

### components

Nesta pasta estão componentes menores, que podem ser reaproveitados em outras telas ou aplicações.

### templates

Aqui ficam algumas "views" padrões, que podem ser utilizadas para estruturar a página de forma mais fácil e com estruturas padrões.

### utils

Algumas funções utilitárias, como formatações, transformações, etc.

### features

Aqui estão as "views" importantes, cada página, neste caso "Registrar item" e "Listar itens".

## Prioridades

Decidi priorizar as funcionalidades e a usabilidade, principalmente na página de registrar item, tentando deixar o visual o mais agradável possível.

### Não realizado

Infelizmente, alguns itens não foram realizados devido ao tempo disponível:

- Máscara de campo monetário
- Separador por vírgula em campos de número no registro
- Testes

A data limite para a entrega seria 03/06/2024, e não gostaria de realizar a entrega além do horário comercial. Devido a isso, acabei não escrevendo os testes de usabilidade. Sei que é uma parte importante de um projeto, inclusive de realizar os testes antes do código na maioria das vezes, mas, devido a algumas intercorrências no feriado, utilizei o tempo disponível para completar o projeto.

## Instalação

Para configurar o projeto, siga os passos abaixo:

1. Clone o repositório:

```bash
git clone https://github.com/AugustoShz/itau-item-register
```

2. Instale as dependências:

```bash
cd itau-item-register
npm install
```

ou

```bash
cd itau-item-register
yarn
```

3. Execute o projeto:

```bash
ng serve 
```
