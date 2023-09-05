const express = require('express');
const roteador = express();

const controladorBanco = require('./controladores/banco-controlador');

const { autenticarSenha,
    checarCamposBody,
    checarCamposQuery,
    checarUsuarioRepetido,
    checarExisteConta,
    checarSaldoConta,
    checarValorPositivo,
    validarSenhaUsuario,
    verificarSaldoDisponivel } = require('./intermediarios');


roteador.get('/contas',
    autenticarSenha,
    controladorBanco.listarContas);


roteador.post('/contas', checarCamposBody,
    checarUsuarioRepetido,
    controladorBanco.criarConta);


roteador.put('/contas/:numeroConta/usuario',
    checarExisteConta,
    checarCamposBody,
    checarUsuarioRepetido,
    controladorBanco.atualizarDadosUsuario);


roteador.delete('/contas/:numeroConta',
    checarExisteConta,
    checarSaldoConta,
    controladorBanco.excluirConta);


roteador.post('/transacoes/depositar',
    checarCamposBody,
    checarExisteConta,
    checarValorPositivo,
    controladorBanco.fazerTransacaoDeposito);


roteador.post('/transacoes/sacar',
    checarCamposBody,
    checarExisteConta,
    validarSenhaUsuario,
    verificarSaldoDisponivel,
    controladorBanco.fazerTransacaoSaque);


roteador.post('/transacoes/transferir',
    checarCamposBody,
    checarExisteConta,
    validarSenhaUsuario,
    verificarSaldoDisponivel,
    controladorBanco.fazerTransacaoTransferencia);


roteador.get('/contas/saldo',
    checarCamposQuery,
    checarExisteConta,
    validarSenhaUsuario,
    controladorBanco.consultarSaldoConta);


roteador.get('/contas/extrato',
    checarCamposQuery,
    checarExisteConta,
    validarSenhaUsuario,
    controladorBanco.extratoDaConta);

roteador.get('/contas/extrato/cronologico',
    checarCamposQuery,
    checarExisteConta,
    validarSenhaUsuario,
    controladorBanco.extratoCronologicoDaConta);


module.exports = roteador;