
let db = require('../bancodedados/bancodedados');
const controladorDB = require('../bancodedados/funcoes-utilitarias');

const dateFns = require('date-fns');

const listarContas = (requisicao, resposta) => {
    return resposta.status(200).json(db.contas);
}


const criarConta = (requisicao, resposta) => {
    const dadosRecebidos = requisicao.body;

    const novaConta = {
        numero: db.idConta++,
        saldo: 0,
        usuario: {
            nome: dadosRecebidos.nome,
            cpf: dadosRecebidos.cpf,
            data_nascimento: dadosRecebidos.data_nascimento,
            telefone: dadosRecebidos.telefone,
            email: dadosRecebidos.email,
            senha: dadosRecebidos.senha
        }
    }

    db.contas.push(novaConta);
    return resposta.status(201).send(db.contas);

}

const atualizarDadosUsuario = (requisicao, resposta) => {

    const { numeroConta } = requisicao.params;
    const dadosRecebidos = requisicao.body;

    const usuarioAtualizado = {
        nome: dadosRecebidos.nome,
        cpf: dadosRecebidos.cpf,
        data_nascimento: dadosRecebidos.data_nascimento,
        telefone: dadosRecebidos.telefone,
        email: dadosRecebidos.email,
        senha: dadosRecebidos.senha
    }

    const conta = controladorDB.getContaPorNumero(numeroConta);
    conta.usuario = usuarioAtualizado;

    return resposta.status(200).json();

}

const excluirConta = (requisicao, resposta) => {

    const { numeroConta } = requisicao.params;

    db.contas = db.contas.filter((conta) => {
        return conta.numero != numeroConta;
    });

    return resposta.status(200).json();

}

const fazerTransacaoDeposito = (requisicao, resposta) => {

    const { numero_conta, valor } = requisicao.body;

    const index = db.contas.findIndex((conta) => {
        return conta.numero == numero_conta;
    });

    db.contas[index].saldo += valor;

    const deposito = {
        data: dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta: numero_conta,
        valor: valor
    }

    db.depositos.push(deposito);

    return resposta.status(200).json(deposito);
}

const fazerTransacaoSaque = (requisicao, resposta) => {

    const { numero_conta, valor } = requisicao.body;

    const index = db.contas.findIndex((conta) => {
        return conta.numero == numero_conta;
    });

    db.contas[index].saldo -= valor;

    const saque = {
        data: dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta: numero_conta,
        valor: valor
    }

    db.saques.push(saque);

    return resposta.status(200).json(saque);
}

const fazerTransacaoTransferencia = (requisicao, resposta) => {

    const { numero_conta_origem, numero_conta_destino, valor } = requisicao.body;

    const indexOrigem = db.contas.findIndex((conta) => {
        return conta.numero == numero_conta_origem;
    });

    const indexDestino = db.contas.findIndex((conta) => {
        return conta.numero == numero_conta_destino;
    });

    db.contas[indexOrigem].saldo -= valor;
    db.contas[indexDestino].saldo += valor;

    const transferencia = {
        data: dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    db.transferencias.push(transferencia);

    return resposta.status(200).json(transferencia);
}

const consultarSaldoConta = (requisicao, resposta) => {

    const { numero_conta } = requisicao.query;
    const conta = controladorDB.getContaPorNumero(numero_conta);
    return resposta.status(200).json({ "saldo": conta.saldo });

}

const extratoDaConta = (requisicao, resposta) => {

    const { numero_conta } = requisicao.query;

    return resposta.status(200).json(controladorDB.getRelatorioConta(numero_conta));


}

const extratoCronologicoDaConta = (requisicao, resposta) => {

    const { numero_conta } = requisicao.query;
    const extrato = controladorDB.getExtratoCronologicoConta(numero_conta);
    const conta = controladorDB.getContaPorNumero(numero_conta);
    //extrato.saldo = conta.saldo;
    return resposta.status(200).json({ "EXTRATO CRONOLÓGICO": extrato, "SALDO": conta.saldo });

}

module.exports = {
    listarContas,
    criarConta,
    atualizarDadosUsuario,
    excluirConta,
    fazerTransacaoDeposito,
    fazerTransacaoSaque,
    fazerTransacaoTransferencia,
    consultarSaldoConta,
    extratoDaConta,
    extratoCronologicoDaConta
}