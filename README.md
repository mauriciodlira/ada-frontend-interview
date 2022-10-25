# Desafio Técnico - Frontend

O propósito desse desafio é a criação de frontend para um quadro de kanban. Esse quadro possui listas, que contém cards.

## Rodando o projeto

Há dois projetos neste repositório, sendo uma API na pasta BACK e o cliente em Angular no FRONT. Para a otimização, foi montada uma imagem Docker para cada, compostas através do Docker Compose.

### **Pelo Docker/Docker Compose**

Se você tiver o Docker e Docker Compose em sua máquina, rode com o seguinte comando:

```console
> docker-compose build --no-cache
> docker-compose up
```

### **Pelo terminal**

Se não tiver o Docker/Docker Compose, terá que abrir dois processos para rodar o BACK e FRONT.
Para o BACK, faça:

```console
> cd BACK
> npm install
> npm run server
```

Feito isso, a API estará disponível na porta 5000.

Para o FRONT, faça:

```console
> cd FRONT
> npm install
> npm start
```

E o front estará disponível na porta 4201.


## Rodando a API

Uma API de exemplo foi disponibilizada na pasta BACK.

Para rodá-la, faça:

```console
> cd BACK
> npm install
> npm run server
```

Ela responderá na porta 5000.


## Diário de desenvolvimento

O desafio foi realizado, até o momento, durante aprox. 10 horas - inclusos o tempo de estudo, depuração, e efetivamente codificação.
Abaixo, descrevo o que foi feito em cada um dos dias, e por quanto tempo atuei em cada ponto.


### **23/10 - Domingo**

No domingo à tarde (23/10), após ler os requisitos, dei início aos estudos do ferramental de DevOps (_Docker_/_Docker Compose_), que
consegui montar um ambiente funcional containerizado - apesar dos desafios citados na próxima sessão - em aproximadamente 3:30h.

Domingo à noite (23/10), por mais 2h dei início ao desenvolvimento da solução, tendo como prioridade a definição de arquitetura, modelagem de
classes. Após ter isso rascunhado, foquei em garantir a segurança do JWT nas requisições através dos _interceptors_ e _route guards_.


### **24/10 - Segunda-feira**

Segunda à noite (24/10), desenvolvi por mais 4h, desta vez focando em garantir a criação dos cartões, a visualização dos mesmos em suas respectivas
colunas, e a mobilidade dos cartões entre colunas.


### **25/10 - Terça-feira (planejamento)**

Agora, terça (25/10) à noite, escrevi este `README.md`.

Ao longo da noite/madrugada, pretendo implementar a funcionalidade de edição dos cartões, vinculando com a biblioteca de markdown (via `marked`),
e posterior a isso farei os testes unitários dos componentes, de negócio, e dos interceptors.

Também desejo incluir uma biblioteca para interpretar o JWT e obter o tempo de expiração, de forma que seja exibido uma caixa de confirmação
para renovar a sessão com a confirmação do usuário.

Como última prioridade vem a estilização do projeto. Como há uma identidade visual a ser montada e definida via estilos, leva tempo, e creio que é
menos prioritária - dado o tempo que possuo entre trabalho X tempo livre - do que as funcionalidades corretas.


## Desafios no processo

### 1. Docker e docker-compose

Apesar de possuir conhecimento teórico sobre virtualização e conteinerização, não havia aplicado do zero em qualquer projeto.
Decidi iniciar esse projeto, antes de realizar qualquer desenvolvimento de funcionalidades, com os containeres prontos e disponíveis
através do comando `docker-compose up`.

Iniciei a implementação da virtualização através do WSL2 (_Windows Subsystem for Linux_), porém com um tempo configurando o Docker, tentando
fazer os projetos rodarem mas sem sucesso, descobri que o WSL possui algumas limitações no uso do Docker, que impossibilitou o seguimento do
desenvolvimento do desafio dentro do WSL2.

Nesse momento recomecei com o Docker local do Windows e foi assim que dei seguimento ao desenvolvimento.

### 2. Trabalho x Tempo livre

Como possuo um trabalho e também atribuições, meu tempo livre se tornou escasso, mas ainda assim consegui dar uma priorização à este projeto
ao longo das noites. Achei necessário falar disso para que se tenha consciência sobre a relação do que está sendo entregue com relação do
tempo que pude alocar aqui.

## Requisitos - Lista de atendidos

1. [x] A API que provemos deve ser usada para persistência dos cards (ela trabalha com persistência em memória) e não deve ser alterada.

2. [x] A interface gráfica será apenas uma tela, nela deve haver três colunas chamadas "To do", "Doing" e "Done".

3. [x] Os cards deve ser listados nessas colunas de acordo com o valor do campo `lista` presente no card. Os valores de `lista` devem ser "ToDo", "Doing" e "Done", respectivamente.

4. [x] Deve haver um local que permita criar um card passando valores para o `titulo` e `conteudo`, deve haver um botão para adicionar o card.

5. [x] Um novo card deve sempre cair na lista "To Do" após persistido na API.

6. [x] O card deverá ter dois modos: Visualização e Edição. _**R: Sim, mas sem a mudança de estados entre os cards ainda**_

7. [ ] No modo de visualização o card terá um cabeçalho com seu título, o conteúdo e 4 botões _**R: Parcial, ainda sem o botão de Editar**_

8. [ ] O `conteudo` do card pode ser markdown, utilize uma biblioteca para renderizá-lo no modo de visualização (recomendamos uma combinação de `dompurify` e `marked`). Lembre-se de estilizar o html resultante do parse do markdown... [Se quiser usar highlight para campos de código no markdown será um diferencial].

9.  [x]  Um dos botões do card deverá excluí-lo (persistindo pela API)

10. [ ]  O outro colocá-lo em modo de edição.

11. [x] Os dois outros botões devem mudar o card para a lista anterior (se houver) ou para a lista seguinte (se houver). A decisão de desabilitar, esconder ou apenas não gerar o evento desses botões quando não houver a proxima lista ou a anterior é sua.

12. [x] No modo de edição, o card conterá um input para o `titulo`, um textarea para o `conteudo` e dois botões.

13. [ ] No modo de edição, um dos botões cancela a edição, e quando pressionado os campos devem ser resetados para o valor atual e voltar o card ao modo de visualização.

14. [ ] O outro botão salva o card, persistindo as informações pela API. Também volta ao modo de visualização em seguida. _**R: Parcial, ainda sem mudança de estados entre os cards**_

15. [x] Toda decisão de visual, de UI e UX é sua. Apenas utilize uma única tela.

16. [ ] ~~Se estiver usando REACT priorize componentes funcionais e hooks.~~

17. [x] O projeto deve ser colocado em um repositório GITHUB ou equivalente, estar público, e conter um readme.md que explique em detalhes qualquer comando ou configuração necessária para fazer o projeto rodar.

18. [x] A entrega será apenas a URL para clonarmos o repositório.

----
As sessões abaixo foram mantidas para uso durante o desenvolvimento

## Desafio

Você precisa criar um frontend de acordo com os requisitos abaixo, que deve ser desenvolvido na pasta "FRONT".

## Requisitos

**Utilização da API**

A API que provemos nesse projeto utiliza JWT para autenticação, você deve fazer a seguinte requisição antes qualquer outra:

```
(POST) http://0.0.0.0:5000/login/

{ "login":"letscode", "senha":"lets@123"}
```

Feita a requisição você receberá um token em formato json. Esse token deve ser enviado em todas as requisições subsequentes pelo header Authorization de acordo com o padrão JWT.

```
Authorization : 'Bearer <token>'
```

Lembre-se de setar os headers Accept e ContentType para json em todas as requisições...

---

A API tem os seguintes entrypoints:

```
(GET)       http://0.0.0.0:5000/cards/
(POST)      http://0.0.0.0:5000/cards/
(PUT)       http://0.0.0.0:5000/cards/{id}
(DELETE)    http://0.0.0.0:5000/cards/{id}
```

---

**GET** obtém uma lista de cards.

A API retorna um array com o seguinte formato:

```
[
    {
        id:uuid
        titulo : string,
        conteudo: string,
        lista: string
    },
    ...
]
```

---

**POST** adiciona um novo card, passe-o pelo corpo da requisição com o seguinte formato:

```
{
    titulo : string,
    conteudo: string,
    lista: string
}
```

A api retornará o card completo como o id atribuído.

---

**PUT** altera um card existente, passe o id na URL e o card completo pelo corpo da requisição de acordo com o formato:

```
{
    id: uuid (o mesmo passado na URL)
    titulo : string,
    conteudo: string,
    lista: string
}
```

A api retornará o card completo que foi salvo.

---

**DELETE** remove um card existente, passe o id na URL.

A api retornará a lista dos cards que sobraram (igual ao GET).

```
[
    {
        id:uuid
        titulo : string,
        conteudo: string,
        lista: string
    },
    ...
]
```

---

**Atenção**: As rotas tem validações e retornos diferentes dependendo do resultado:

> POST e PUT retornam 400 se titulo, conteudo ou lista forem avaliados como falsy.
>
> PUT também retorna 400 se o id passado na URL não for igual ao do objeto passado no corpo da requisição.
>
> PUT e DELETE retornam 404 se não encontrarem um card com o id passado na URL.
>
> Todas as rotas retornam 401 se o token não for passado, for inválido, mal-formado ou expirado.

## Diferenciais e critérios de avaliação

Qualidade visual levando em conta práticas de UI e UX será considerado um diferencial. Bem como a instalação e bom uso de bibliotecas como styled-components e react-icons ou seus equivalentes para Angular se aplicável.

Arquiteturas que separem responsabilidades, de baixo acoplamento e alta-coesão são preferíveis, sobretudo usando dependências injetadas, que permitam maior facilidade para testes unitários e de integração.

Avaliaremos se o código é limpo (com boa nomenclatura de classes, variáveis, métodos e funções) e dividido em arquivos bem nomeados, de forma coesa e de acordo com boas práticas. Bem como práticas básicas como tratamento de erros.

Desacoplar e testar os componentes e serviços com testes unitários será considerado um diferencial.

O uso de typescript (se não for obrigatório) acompanhado das devidas configurações e tipagens bem feitas, bem como uso de técnicas de abstração usando interfaces (especialmente da lógica de persistência) serão consideradas um deferencial.

O uso de Linter será considerado um diferencial.

A criação de um docker-compose e de dockerfiles que ao rodar `docker-compose up` subam o sistema por completo (front e back) será considerado um diferencial.

**Entregou incompleto, teve dificuldade com algo, ou fez algo meio esquisito para simplificar alguma coisa que não estava conseguindo fazer? Deixe uma observação com a justificativa no readme.md para nós...**
