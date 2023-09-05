
# 💵 CUBOS BANK 💵

<img align="center" height="150" width="150" alt="Python" src="./img/cubos bank.png" />




### 🖥️ DESCRIÇÃO
<br>
Servidor Backend para Sistema Bancário em JavaScript.
<br><br>
Versão : 1.0.0
<br><br>

### 🛠️ FERRAMENTAS
<br>
Neste projeto foram utilizadas as seguintes ferramentas:
<br><br>

| Javascript | Node.js | Express | Git  |  GitHub   |
|:--------:|:--------:|:--------:|:--------:|:--------:|
| <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"/>

<br><br>

### 🔧 FUNCIONALIDADES
<br>

- [x] Administrador - Listar Contas 
- [x] Criação de Conta Bancária
- [x] Atualizar dados do Usuário da Conta
- [x] Excluir Conta Bancária
- [x] Depósito em Conta Bancária
- [x] Saque de Conta Bancária
- [x] Transferência entre Contas
- [x] Consultar Saldo de Conta Bancária
- [x] Emitir Extrato/Relatório de Transações da Conta
- [x] Emitir Extrato Cronológico da Conta

<br><br>

### [ADMINISTRADOR] - LISTAR CONTAS BANCÁRIAS

Esta funcionalidade lista todas as contas bancárias cadastradas no sistema.

O acesso é feito por método GET na rota:
```
/contas?senha_banco=***
```
É necessário fornecer a senha do administrador via url através de um query params.
<br><br>

### CRIAR CONTA

Esta funcionalidade cria uma nova conta bancária.

O acesso é feito por método POST na rota:
```
/contas
```
É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:
```
{
    "nome":,
    "cpf":,
    "data_nascimento":,
    "telefone":,
    "email":,
    "senha":
}
```

Se qualquer campo não for fornecido, a conta não será criada e retornará um erro.

Só será possível cadastrar uma conta para cada cpf e email.
<br><br>

### EXCLUIR CONTA

Esta funcionalidade exclui uma nova conta bancária existente.

O acesso é feito por método DELETE na rota:
```
/contas/:numeroConta
```

Não será possível excluir uma conta com saldo positivo.

<br><br>

### ATUALIZAR DADOS DO USUÁRIO

Esta funcionalidade atualiza todos os dados do usuário de uma conta bancária existente.

O acesso é feito por método PUT na rota:
```
/contas/:numeroConta/usuario
```


É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:
```
{
    "nome":,
    "cpf":,
    "data_nascimento":,
    "telefone":,
    "email":,
    "senha":
}
```

Se qualquer campo não for fornecido, os dados do usuário da conta não serão atualizados e retornará um erro.

<br><br>

### TRANSAÇÕES

#### DEPÓSITO

Esta funcionalidade realiza uma transação de depósito em uma conta bancária.

O acesso é feito por método POST na rota:
```
/transacoes/depositar
```

É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:

```
{
    "numero_conta":,
    "valor":
}
```

Se qualquer campo não for fornecido, a transação não será realizada e retornará um erro.

O valor deve ser maior que zero.

<br><br>

#### SAQUE

Esta funcionalidade realiza uma transação de saque em uma conta bancária.

O acesso é feito por método POST na rota:
```
/transacoes/sacar
```

É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:

```
{
    "numero_conta":,
    "valor":,
    "senha":
}
```

Se qualquer campo não for fornecido, a transação não será realizada e retornará um erro.

O valor deve ser maior que zero.

<br><br>

#### TRANSFERÊNCIA

Esta funcionalidade realiza uma transação de transferência entre duas contas bancárias.

O acesso é feito por método POST na rota:
```
/transacoes/transferir
```

É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:

```
{
    "numero_conta_origem":,
    "numero_conta_destino":,
    "valor":,
    "senha":
}
```

Se qualquer campo não for fornecido, a transação não será realizada e retornará um erro.

O valor deve ser maior que zero.
<br><br>

### CONSULTAR SALDO

Esta funcionalidade realiza a consulta do saldo de uma conta bancária existente.

O acesso é feito por método GET na rota:
```
/contas/saldo?numero_conta=***2&senha=***
```
É necessário fornecer o numero da conta e a senha do usuario via url através de um query params.

Será retornada uma mensagem com o saldo da conta.
<br><br>

### EXTRATO DA CONTA

#### RELATÓRIO DE TRANSAÇÕES

Esta funcionalidade imprime um relatório das transações realizadas por uma conta bancária existente.

O acesso é feito por método GET na rota:
```
/contas/extrato?numero_conta=***&senha=***
```
É necessário fornecer o numero da conta e a senha do usuario via url através de um query params.

Será retornada uma mensagem com todos os depósitos, saques e transferências realizados pela conta.

#### EXTRATO CRONOLÓGICO

Esta funcionalidade imprime o extrato cronológico de uma conta bancária existente.

O acesso é feito por método GET na rota:
```
/contas/extrato/cronologico?numero_conta=***&senha=***
```
É necessário fornecer o numero da conta e a senha do usuario via url através de um query params.

Será retornada uma mensagem com todas as transações ralizadas na conta em ordem cronológica.



<br><br>

### 👩🏻‍💻 AUTOR
<br>
Fernanda Pestana [pestanafj]

Projeto criado durante desafio do Módulo 2 do Curso Desenvolvimento de Software BackEnd da Cubos Academy

Agosto 2023.