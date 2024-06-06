# API Gateway Application

## Descrição

Esta aplicação é um API Gateway simples que atua como um ponto central para gerenciar e rotear solicitações HTTP para diferentes serviços de backend. Ela fornece um ponto de entrada unificado para clientes externos e lida com a agregação de serviços, autenticação, e balanceamento de carga.

## Recursos

- Roteamento de requisições para diferentes serviços de backend
- Agregação de respostas de múltiplos serviços
- Autenticação e autorização

## Pré-requisitos

- Node.js (v18 ou superior)
- pnpm (v9 ou superior)

## Instalação

1. Clone o repositório para o seu ambiente local:
    ```sh
    git clone https://github.com/joaouriel10/api-gateway.git
    cd api-gateway
    ```

2. Instale as dependências:
    ```sh
    pnpm install
    ```

## Execução

Para iniciar a aplicação em modo de desenvolvimento, utilize o comando:
```sh
pnpm run start:dev
