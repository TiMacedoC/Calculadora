var listaNumeros = [];

var operacoes = [];

var numero = 0

var result = 0;

var decimal = 1;

var point = "";

var mostraNaTela = document.querySelector('#exibir');

var reset = document.querySelector('#divReset');

function exibeBtnReset() {
  reset.textContent = ""
  reset.insertAdjacentHTML('beforeend', `<button id="reset" onclick="recomecar(3)">RESET</button>`);
}

function recebePonto() {
  if ((numero == 0) && (result == 0) && (decimal == 1) && (operacoes.length == 0)) {
    mostraNaTela.textContent = "0"
  }
  if (point != ".") {
    point = ".";
    mostraNaTela.textContent += point;
  }
  exibeBtnReset()
};

function guardaNumeros(num) {
  if (isNaN(numero) == true) {
    numero = 0;
  };
  if (/*(numero == 0) && */(operacoes.length == 0) && (point != ".")) {
    if (numero == 0) {
      mostraNaTela.textContent = "";
    } else {
      mostraNaTela.textContent = numero
    }
  }

  bloco_1: {
    while (point != ".") {
      numero = (numero * 10) + num;
      mostraNaTela.textContent += num;
      break bloco_1;
    }
    numero += num / (decimal * 10);
    decimal = decimal * 10;
    mostraNaTela.textContent += num;
  }
  exibeBtnReset()
};

//Recebe teclado numerico fisico
window.addEventListener('keydown', (e) => {
  let tecla = e.code;

  if (tecla.endsWith('0')) {
    guardaNumeros(0)
  } else if (tecla.endsWith('1')) {
    guardaNumeros(1)
  } else if (tecla.endsWith('2')) {
    guardaNumeros(2)
  } else if (tecla.endsWith('3')) {
    guardaNumeros(3)
  } else if (tecla.endsWith('4')) {
    guardaNumeros(4)
  } else if (tecla.endsWith('5')) {
    guardaNumeros(5)
  } else if (tecla.endsWith('6')) {
    guardaNumeros(6)
  } else if (tecla.endsWith('7')) {
    guardaNumeros(7)
  } else if (tecla.endsWith('8')) {
    guardaNumeros(8)
  } else if (tecla.endsWith('9')) {
    guardaNumeros(9)
  } else if (tecla.endsWith('Enter') || tecla.endsWith('Equal')) {
    resultado()
  } else if (tecla.endsWith('Comma') || tecla.endsWith('Period') || tecla.endsWith('Decimal')) {
    recebePonto()
  } else if (tecla.endsWith('Escape')) {
    recomecar(3)
  } else if (tecla.endsWith('Multiply')) {
    calculo('x')
  } else if (tecla.endsWith('Divide') || tecla.endsWith('IntlRo')) {
    calculo('÷')
  } else if (tecla.endsWith('Minus') || tecla.endsWith('Subtract')) {
    calculo('-')
  } else if (tecla.endsWith('Add')) {
    calculo('+')
  }

});

function calculo(op) {
  if ((numero == 0) && (operacoes.length == 0) && (point != ".")) {
    mostraNaTela.textContent = "";
  }

  point = "";
  decimal = 1;
  if (numero != NaN) {
    numero = numero + 0;
    listaNumeros.push(numero);
    operacoes.push(op);
    mostraNaTela.textContent += ` ${op} `;
    numero = NaN;
  } else {
    mostraNaTela.textContent = ""
    mostraNaTela.textContent = "error"
    recomecar()
  }
  exibeBtnReset()
};

function resultado() {
  result = result + listaNumeros[0];
  var i = 1;

  for (var j = 0; j < operacoes.length; j++) {
    if (i < listaNumeros.length) {
      if (operacoes[j] == "+") {
        result = result + listaNumeros[i];
      }
      if (operacoes[j] == "-") {
        result = result - listaNumeros[i];
      }
      if (operacoes[j] == "÷") {
        result = result / listaNumeros[i];
      }
      else {
        if (operacoes[j] == "x") {
          result = result * listaNumeros[i];
        }
      }
      i++;
    }
  }

  if (operacoes[operacoes.length - 1] == "-") {
    result = result - numero;
  } else {
    if (operacoes[operacoes.length - 1] == "+") {
      result = result + numero;
    } else {
      if (operacoes[operacoes.length - 1] == "x") {
        result = result * numero;
      } else {
        if (operacoes[operacoes.length - 1] == "÷") {
          result = result / numero;
        }
      }
    }
  }

  if (isNaN(result) == true) {
    mostraNaTela.textContent = ""
    mostraNaTela.textContent = "error"
  } else {
    mostraNaTela.textContent += ` = ${result.toFixed(2)}`;
  }

  numero = result;
  recomecar()
  exibeBtnReset()
};

function recomecar(check) {
  // o botão reset é o único que chama a função e passa o 3 como parametro. Assim limpando a tela.
  if (check == 3) {
    numero = 0;
    mostraNaTela.textContent = "";
  }
  //numero = 0;
  listaNumeros = [];
  operacoes = [];
  result = 0;
  decimal = 1;
  point = "";
  reset.textContent = "";
};

