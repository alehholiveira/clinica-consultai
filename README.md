# Consultai: Clínica de Psicólogos

Consultai é um projeto desenvolvido para a matéria de Aplicativos e Banco de Dados. Trata-se de uma aplicação voltada para a gestão de uma clínica de psicólogos.

## Tecnologias Utilizadas

- **Laravel**: Framework PHP para desenvolvimento web.
- **Docker**: Plataforma para criação de contêineres.
- **Kubernetes**: Sistema de orquestração de contêineres.
- **Electron**: Forma de criar APPs para Windows, Linux e MacOS.
- **React**: Framework de Javascript para desenvolvimento do FrontEnd.
- **Tailwind**: Framework de CSS para desenvolvimento do FrontEnd.
- **Mailtrap**: Serviço para teste de envio de e-mails.
- **Pusher**: Serviço de notificações em tempo real.

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
### 3. Gerar as imagens a aplicação

Utilize o Docker Compose para subir os contêineres da aplicação:

```bash
docker compose up -d
```
### 4. Navegar para o Diretório de Configuração do Kubernetes

Acesse o diretório onde estão os arquivos de configuração do Kubernetes:

```bash
cd kubernetes
```
### 5. Aplicar os Arquivos de Configuração do Kubernetes

Aplique as configurações do Kubernetes:

```bash
kubectl apply -f .
```
### 6. Verificar os Pods em Execução

Verifique quais pods estão em execução e copie o nome do pod consultai-laravel:

```bash
kubectl get pods
```
### 7. Executar um Terminal no Pod

Abra um terminal dentro do pod copiado:

```bash
kubectl exec -it <nome-do-pod> -- /bin/bash
```
### 8. Configurar a Aplicação Dentro do Pod

Dentro do terminal do pod, execute os seguintes comandos para configurar a aplicação:

```bash
composer install
npm install
php artisan migrate
php artisan db:seed UserSeeder
php artisan queue:listen
```
### 9. Abrir a Aplicação Fora do Pod

Saia do pod e execute o comando abaixo para abrir a aplicação:

```bash
npm run electron
```
### Integrantes do Grupo
1. Alexandre Augusto Tescaro Oliveira
2. Augusto Guaschi Morato
3. Felipe Dias Konda
4. Hugo Tahara Menegatti
5. Vinicius Henrique Galassi
