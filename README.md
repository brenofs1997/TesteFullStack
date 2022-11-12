# TesteFullStack

<br>

# Sobre o projeto
Um sistema que permite que usuários sejam criados (CRUD)


# Tecnologias utilizadas
- Typescript
- Angular
- Fastify
- Prisma
- SQLite


# Inicialização
## Server
entre na pasta `server` presente no diretório raiz, e rode o comando para instalar as dependências:
```bash
npm i
```
Agora para criar o banco de dados, rode o comando:
```bash 
npx prisma migrate dev
```
Por fim para iniciar o servidor, rode o comando:
```bash
npm run dev
```

## Web
Para rodar o projeto web, entre na pasta `web` presente no diretório raiz, e rode o comando para instalar as dependências:
```bash
npm i
```
Agora para iniciar o projeto, rode o comando:
```bash
ng serve
```
> Atenção: não esqueça de iniciar o servidor antes de iniciar o projeto web
