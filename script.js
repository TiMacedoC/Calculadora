var listaNmeros = [];

var operacoes = [];

var numero = 0

var result = 0;

var decimal = 1;

var point = "";

var mostraNaTela = document.querySelector('#exibir');

 var reset = document.querySelector('#divReset');

function exibeBtnReset(){
  reset.textContent = ""
  reset.insertAdjacentHTML('beforeend', `<button id="reset" onclick="recomecar(3)">RESET</button>`);
}

function recebePonto(){
  if ((numero == 0) && (result == 0) && (decimal == 1) && (operacoes.length == 0)){
     mostraNaTela.textContent = "0"
  }
  if (point != "."){
    point = ".";
    mostraNaTela.textContent += point;
  }
  exibeBtnReset()
};

function guardaNumeros(num){
    if((numero == 0) && (operacoes.length==0) && (point != ".")) {
    mostraNaTela.textContent = "";
  }
  
  bloco_1:{
     while (point != "."){
     numero = (numero*10) + num;
     mostraNaTela.textContent += num;
     break bloco_1;
  }
    numero += num / (decimal * 10);
    decimal = decimal *10;
    mostraNaTela.textContent += num;
    }
exibeBtnReset()
};

function calculo(op){
  point = "";
  decimal = 1;
  if (numero != 0 /*|| ((numero == 0) && (op == "-")) */){
  //   if ((numero == 0) && (result == 0) && (decimal == 1) && (operacoes.length == 0)){
  //    mostraNaTela.textContent = ""
  // }
    listaNmeros.push(numero);
    operacoes.push(op);
    mostraNaTela.textContent += ` ${op} `;
    numero = 0;
  } else{
    mostraNaTela.textContent = ""
    mostraNaTela.textContent = "error"
    recomecar()    
  }
  exibeBtnReset()
};

function resultado(){
  result = result + listaNmeros[0];
  var i = 1; 
  
  for(var j =0; j < operacoes.length; j++){
    if(i < listaNmeros.length){
          if (operacoes[j] == "+"){
          result = result + listaNmeros[i];
          } 
            if (operacoes[j] == "-"){
            result = result - listaNmeros[i];
          }
            if (operacoes[j] == "÷"){
            result = result / listaNmeros[i];
          }
          else {
            if (operacoes[j] == "x"){
            result = result * listaNmeros[i];
          }
          }
      i++;   
          }
  }
     
  if (operacoes[operacoes.length-1] == "-"){
     result = result - numero;
  } else {
    if (operacoes[operacoes.length-1] == "+"){
     result = result + numero;
    } else{
        if (operacoes[operacoes.length-1] == "x"){
     result = result * numero;
      } else{
        if (operacoes[operacoes.length-1] == "÷"){
     result = result / numero;
      }
  }
  } 
  }
  
  if(isNaN(result) == true){
    mostraNaTela.textContent = ""
    mostraNaTela.textContent = "error"
  } else {
      mostraNaTela.textContent += ` = ${result.toFixed(2)}`;
      }
  
  recomecar()
  exibeBtnReset()
};

function recomecar(check){
  if (check == 3){
     mostraNaTela.textContent = ""
  }
  numero = 0;
  listaNmeros = [];
  operacoes = [];
  result = 0;
  decimal = 1;
  point = "";
  reset.textContent = ""
}