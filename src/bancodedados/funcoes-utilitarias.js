const db = require('./bancodedados');


function getContaPorUsuarioCpf(cpf) {

    return db.contas.find((conta) => {
        return conta.usuario.cpf == cpf;
    });
}

function getContaPorUsuarioEmail(email) {
    return db.contas.find((conta) => {
        return conta.usuario.email == email;
    });
}

function getContaPorNumero(numero_conta) {
    return db.contas.find((conta) => {
        return conta.numero == numero_conta;
    });
}

function getDepositos(numero_conta) {
    if (!numero_conta) {
        return db.depositos;
    }
    return db.depositos.filter((deposito) => {
        return deposito.numero_conta == numero_conta;
    });
}

function getSaques(numero_conta) {
    if (!numero_conta) {
        return db.depositos;
    }
    return db.saques.filter((deposito) => {
        return deposito.numero_conta == numero_conta;
    });
}

function getTransferenciasEnviadas(numero_conta) {
    if (!numero_conta) {
        return db.depositos;
    }
    return db.transferencias.filter((deposito) => {
        return deposito.numero_conta_origem == numero_conta;
    });
}

function getTransferenciasRecebidas(numero_conta) {
    if (!numero_conta) {
        return db.depositos;
    }
    return db.transferencias.filter((deposito) => {
        return deposito.numero_conta_origem == numero_conta;
    });
}

function getRelatorioConta(numero_conta) {
    const transacoes = {};

    transacoes.depositos = getDepositos(numero_conta);
    transacoes.saques = getSaques(numero_conta);
    transacoes.transferenciasEnviadas = getTransferenciasEnviadas(numero_conta);
    transacoes.transferenciasRecebidas = getTransferenciasRecebidas(numero_conta);

    return transacoes;
}

function getExtratoCronologicoConta(numero_conta) {
    const transacoes = getRelatorioConta(numero_conta);

    const extratoCronologico = [];

    for (deposito of transacoes.depositos) {
        extratoCronologico.push({
            data: deposito.data,
            descricao: "DEPÓSITO",
            valor: deposito.valor
        });
    }

    for (saque of transacoes.saques) {
        extratoCronologico.push({
            data: saque.data,
            descricao: "SAQUE",
            valor: - saque.valor
        });
    }

    for (transferencia of transacoes.transferenciasEnviadas) {
        extratoCronologico.push({
            data: transferencia.data,
            descricao: `TRANSFERÊNCIA REALIZADA PARA CONTA:${transferencia.numero_conta_destino}`,
            valor: - transferencia.valor
        });
    }

    for (transferencia of transacoes.transferenciasRecebidas) {
        extratoCronologico.push({
            data: transferencia.data,
            descricao: `TRANSFERÊNCIA RECEBIDA DA CONTA:${transferencia.numero_conta_destino}`,
            valor: transferencia.valor
        });
    }

    extratoCronologico.sort((a, b) => {
        return a.data.localeCompare(b.data);
    });

    return extratoCronologico;
}

module.exports = {
    getContaPorUsuarioCpf,
    getContaPorUsuarioEmail,
    getContaPorNumero,
    getRelatorioConta,
    getExtratoCronologicoConta
}