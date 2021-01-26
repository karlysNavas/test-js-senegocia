const accounts = require("../utils/accounts");
const clients = require("../utils/clients");
const banks = require("../utils/banks");
/*
  SECCIÓN PROBLEMAS
    - Las siguientes son preguntas básicas de Javascript y manejo de datos. Se evaluará eficiencia, ORDEN y claridad del código entregado.
    - Se debe programar un algoritmo para cada método y que este retorne lo requerido.
    - Debe usar nombres explicativos para sus variables.
    - Usar sintaxis ES6.
*/

// 0 Arreglo con los ids de clientes

console.log("Pregunta 0");
console.log("listClientsIds");
const listClientsIds = clients.map((client) => client.id);
console.log(listClientsIds);

// 1 Arreglo con los ids de clientes ordenados por rut

console.log("Pregunta 1");
console.log("listClientsIdsSortByTaxNumber");
const listClientsIdsSortByTaxNumber = clients
  .sort((ant, next) => ant.taxNumber > next.taxNumber)
  .map((client) => client.id);
console.log(listClientsIdsSortByTaxNumber);

// 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.

console.log("Pregunta 2");
console.log("sortClientsTotalBalances");

const accountsById = accounts.reduce((acc, item) => {
  (acc[item.clientId] = acc[item.clientId] || []).push(item);
  return acc;
}, {});

let group = [];
for (const item in accountsById) {
  account = accountsById[item];
  let totalBalance = 0;
  for (const key in account) {
    totalBalance = account[key].balance + account[key].balance;
  }
  group.push({ clientId: item, totalBalance });
}

const clientsTotalAccount = clients
  .map((item) => {
    const client = group.find((element) => element.clientId == item.id);
    return { name: item.name, balance: client.totalBalance };
  })
  .sort((prev, next) => prev.balance < next.balance);

console.log(clientsTotalAccount);

// 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.

// 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
console.log("Pregunta 4");
console.log("richClientsBalances");

const richClientsBalances = accounts
  .map((item) => {
    const b = banks.find((element) => element.id == item.bankId);
    return { bank: b.name, balance: item.balance, clientId: item.clientId };
  })
  .filter((item) => item.bank === "SANTANDER" && item.balance > 25000)
  .sort((prev, next) => prev.balance < next.balance);
console.log(richClientsBalances);
// 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
console.log("Pregunta 5");
console.log("banksRankingByTotalBalance");
const accountsByBankId = accounts.reduce((acc, item) => {
  (acc[item.bankId] = acc[item.bankId] || []).push(item);
  return acc;
}, {});

let groupBank = [];
for (const item in accountsByBankId) {
  account = accountsByBankId[item];
  let totalBalance = 0;
  for (const key in account) {
    totalBalance = account[key].balance + account[key].balance;
  }
  groupBank.push({ bankId: item, totalBalance });
}

groupBank.sort((prev, next) => prev.totalBalance > next.totalBalance);
console.log(groupBank);
// 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.
// 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.
// 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado.
// Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
