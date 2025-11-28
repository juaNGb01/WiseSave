# 🛒 WiseSave - Controle de Listas de Compras

WiseSave é uma aplicação de lista de compras desenvolvida com React Native (Frontend) e Node.js/Express (Backend) que permite ao usuário gerenciar suas listas e visualizar métricas de gastos por mês. O projeto implementa filtros de segurança e agregação de dados em tempo real.

---

## 🚀 Como Rodar o Projeto

Este projeto é dividido em dois ambientes independentes (`frontend` e `backend`). Ambos precisam ser inicializados separadamente.

### Pré-requisitos

Certifique-se de ter o **Node.js** (versão LTS recomendada) e o **MongoDB** instalados e funcionando em sua máquina.

### 1. Configuração do Backend (API - Express/Mongoose)

1.  **Instalação de Dependências:**
    Acesse a pasta `backend` e instale todos os pacotes:
    ```bash
    cd backend
    npm install
    ```

2.  **Configuração do Ambiente (`.env`)**
    O arquivo **`.env`** na raiz da pasta `backend` já contem todos os dados necessários para rodar e acessar o banco de dados mongo

3.  **Inicialização:**
    Rode o servidor em modo de desenvolvimento:
    ```bash
    npm start
    ```
    O servidor estará acessível em `http://localhost:3000`.

### 2. Configuração do Frontend (Mobile - React Native)

1.  **Instalação de Dependências:**
    Acesse a pasta `frontend` e instale todas as dependências do React Native:
    ```bash
    cd ../frontend
    npm install
    ```

2.  **Ajuste do Arquivo de Ambiente (`.env`)** ⚠️
    Dentro do arquivo **`.env`** na raiz da pasta `frontend` **ajuste o IP para o da sua máquina** para que o aplicativo móvel possa se comunicar com o seu servidor (Backend).

    | Variável | Exemplo de Valor | Descrição | |
    | :--- | :--- | :--- | :--- |
    | `API_BASE_URL` | `http://xx.xxx.xx.xxx:3000/wisesave` | **TROQUE** o IP pelo **endereço IP da sua máquina** na rede local. |

3.  **Inicialização:**
    Inicie o Expo para rodar o app em um emulador ou dispositivo físico:
    ```bash
    npm start
    ```

---

## 🔐 Estrutura de Autenticação e Segurança

O projeto segue um fluxo de segurança rigoroso:

* **Autenticação JWT:** As rotas que acessam dados privados (listas e métricas) são protegidas pelo **middleware `authenticateToken`**.
* **Filtro por Usuário (Multi-Tenancy):** O `userId` é extraído do token e usado no estágio `$match` do Mongoose Aggregation, garantindo que o usuário visualize **apenas** as listas que ele criou.
* **Modelo de Dados:** Cada lista é referenciada (via `ObjectId`) ao seu criador na coleção `User`.

## 📊 Métricas Chave Implementadas

A tela de métricas é alimentada por um único *Aggregation Pipeline* eficiente que retorna os seguintes dados por mês/usuário:

| Métrica | Descrição |
| :--- | :--- |
| **Total Comprado** | Soma total do valor de todas as listas no mês. |
| **Maior Compra** | O valor total mais alto de uma única lista (`totalPrice`). |
| **Produto Mais Caro** | O item com o maior preço unitário no mês. |
| **Produto Mais Comprado** | O item com a maior quantidade total acumulada no mês. |
| **Gráfico Histórico** | Exibe a evolução dos gastos nos últimos 4 meses em barras dinâmicas. |

---

## 💻 Tecnologias Utilizadas

| Camada | Tecnologia |
| :--- | :--- |
| **Frontend** | React Native (Expo) |
| **Backend** | Node.js + Express |
| **Banco de Dados** | MongoDB + Mongoose |
| **Gráficos** | `react-native-gifted-charts` |