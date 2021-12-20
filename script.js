var listaNumeros = [];

var operacoes = [];

var numero = 0

var result = 0;

var decimal = 1;

var point = "";

const mostraNaTela = document.querySelector('#exibir');

const reset = document.querySelector('#divReset');

var deuResultado = false;

var digitouNumero = false;

//Recebe teclado numérico físico
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

function exibeBtnReset() {
  reset.textContent = ""
  reset.insertAdjacentHTML('beforeend', `<button id="reset" onclick="recomecar(3)">RESET</button>`);
}

function recebePonto() {
  if (!digitouNumero) {
    mostraNaTela.textContent += " 0";
    if (deuResultado) {
      deuResultado = false;
      numero = 0;
      mostraNaTela.textContent = "";
      mostraNaTela.textContent += " 0";
    }
  }

  if (point != ".") {
    point = ".";
    mostraNaTela.textContent += ",";
  }
  exibeBtnReset()
};

function guardaNumeros(num) {
  digitouNumero = true;

  if (isNaN(numero) == true) {
    numero = 0;
  };

  if ((operacoes.length == 0) && (point != ".")) {
    if (numero == 0) {
      mostraNaTela.textContent = "";
    }
    if (deuResultado) {
      deuResultado = false;
      numero = 0;
      mostraNaTela.textContent = "";
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

function calculo(op) {

  if (isNaN(numero) == true) {
    numero = 0;
  }

  if ((operacoes.length == 0) && (point != ".")) {
    if (numero == 0) {
      if (!digitouNumero || deuResultado) {
        mostraNaTela.textContent = "";
        mostraNaTela.textContent += " 0";
      }
    } else {
      mostraNaTela.textContent = new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(numero);
    }
  }

  point = "";
  decimal = 1;

  if (numero != NaN) {
    numero = numero + 0;
    listaNumeros.push(numero);
    operacoes.push(op);

    if (digitouNumero || deuResultado) {
      mostraNaTela.textContent += ` ${op} `

    } else { mostraNaTela.textContent += ` 0 ${op} ` }
    numero = NaN;

  } else {
    mostraNaTela.textContent = ""
    mostraNaTela.textContent = "error"
    recomecar()
  }

  digitouNumero = false;
  deuResultado = false;
  exibeBtnReset()
};

function resultado() {

  if (isNaN(numero)) {
    numero = 0;
  }

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
    if (operacoes.length == 0) {
      result = numero + 0
      mostraNaTela.textContent = new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(result);
    } else { mostraNaTela.textContent = "error"; }
  } else {
    if ((result < 0.006) && (result > - 0.006)) {
      result = result * (-1);
    }
    // verificação naquele modelo {variavel ? () : ()}
    {
      digitouNumero ?
        (mostraNaTela.textContent +=
          ` = ${new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(result)} `) :
        (mostraNaTela.textContent +=
          ` 0 = ${new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(result)} `)
    }
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

  digitouNumero = false;
  listaNumeros = [];
  operacoes = [];
  result = 0;
  decimal = 1;
  point = "";
  reset.textContent = "";
  deuResultado = true;
};

