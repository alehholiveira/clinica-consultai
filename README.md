# Consultai: Clínica de Psicologia

Consultai é um projeto desenvolvido para a matéria de Aplicativos e Banco de Dados. Trata-se de uma aplicação voltada para a gestão de uma clínica de psicólogos.
O sistema também deve ser utilizado pelos profissionais da clínica (psicólogos e
secretária), existindo a possibilidade de consultar e acrescentar informações dos clientes (cada
profissional com sua devida permissão de acesso e visualização).

## Tecnologias Utilizadas

- **Laravel**: Framework PHP backend para desenvolvimento web.
- **Docker**: Plataforma para criação de contêineres.
- **Kubernetes**: Sistema de orquestração de contêineres.
- **Electron**: Forma de criar APPs para Windows, Linux e MacOS.
- **React**: Framework de Javascript para desenvolvimento do FrontEnd.
- **Tailwind**: Framework de CSS para desenvolvimento do FrontEnd.
- **Mailtrap**: Serviço para teste de envio de e-mails.
- **Pusher**: Serviço de notificações em tempo real.

## Requisitos para usar o projeto
- **Node**:  https://nodejs.org/en
- **Docker**: https://www.docker.com/products/docker-desktop/ (é necessário habilitar o kubernetes nas configurações do docker desktop)


## Passo a Passo para Executar o Projeto

Siga os passos abaixo para rodar o projeto no seu computador:

### 1. Clonar o Projeto

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/alehholiveira/clinica-consultai.git
```

### 2. Entrar no repositório clonado

Navegue até o diretório do projeto:

```bash
cd clinica-consultai
```
### 3. Configurar .env

Crie o .env da aplicação:

```bash
cp .env.example .env
```

Crie e configure o pusher e insira as informações (https://pusher.com/):

```bash
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1
```

Crie e configure o mailtrap e insira as informações(https://mailtrap.io/):

```bash
MAIL_MAILER=smtp
MAIL_HOST=
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
```

Insira as informações da key e cluster do pusher:

```bash
VITE_PUSHER_APP_KEY=
VITE_PUSHER_APP_CLUSTER=
```

### 4. Gerar as imagens da aplicação

Utilize o Docker Compose para subir os contêineres da aplicação:

```bash
docker compose up -d
```
### 5. Navegar para o Diretório de Configuração do Kubernetes

Acesse o diretório onde estão os arquivos de configuração do Kubernetes:

```bash
cd kubernetes
```
### 6. Aplicar os Arquivos de Configuração do Kubernetes

Aplique as configurações do Kubernetes:

```bash
kubectl apply -f .
```
### 7. Verificar os Pods em Execução

Verifique quais pods estão em execução e copie o nome do pod consultai-laravel:

```bash
kubectl get pods
```
### 8. Executar um Terminal no Pod

Abra um terminal dentro do pod copiado:

```bash
kubectl exec -it <nome-do-pod> -- /bin/bash
```
### 9. Configurar a Aplicação Dentro do Pod

Dentro do terminal do pod, execute os seguintes comandos para configurar a aplicação:

```bash
composer install
php artisan migrate
php artisan db:seed UserSeeder
npm i
npm run build
php artisan queue:listen
```
### 10. Abrir outro terminal para executar o Electron

Saia do pod e execute o comando abaixo para abrir a aplicação:

```bash
npm i
npm run electron
```
### Integrantes do Grupo
1. Alexandre Augusto Tescaro Oliveira
2. Augusto Guaschi Morato
3. Felipe Dias Konda
4. Hugo Tahara Menegatti
5. Vinicius Henrique Galassi
