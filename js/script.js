alert("Los valores están truncados a 2 decimales, para ver los valores originales revise la consola")
function init(){
	let box_matriz = document.getElementById("caja_matriz");
	while (box_matriz.firstChild) {
   		box_matriz.removeChild(box_matriz.lastChild);
  	}
	creaMatriz();
}
function creaMatriz() {
	var t = document.getElementById("numero_filas_columnas").value;
	var dete = -1;
	if (t < 4 || t > 10){
		alert("El valor ingresado no es valido (Mayor a 10 o Menor a 4)");
	}
	else{
		if(t <= 5){
			var maximo = 100; //Máximo de rango
			var minimo = 1; //Minimo de rango
		} else {
			var maximo = 20; 
			var minimo = 1;
		}
		while (dete < 0){
			var arreglo = new Array((t*(parseInt(t)+1))/2);
			for (var i = 0; i < (t*(parseInt(t)+1))/2; ++i){
				arreglo[i] = Math.floor((Math.random() * (maximo - minimo + 1)) +  minimo);
				if(arreglo[i] == 0){
					arreglo[i] = 1;
				}
			}
			var matriz = [];
			for (var i = 0; i < t; ++i){
				matriz[i] = new Array(t);
			}
			var contador = 0;
			for (var i = 0; i < t; ++i){
				for (var j = i; j < t; ++j){
					matriz[i][j] = arreglo[contador];
					matriz[j][i] = arreglo[contador];
					contador++;
				}
			}
			dete = determinante(matriz);
		}
		if(t <= 5){
			if (!Cholesky(matriz, t)) creaMatriz()
		} else {
			Cholesky(matriz,t)
		}
	}
}
function createMatriz(t){
	var matriz = new Array(t);
	for (i = 0; i < t ; i++){ 
		matriz[i]=new Array(t); 
	}
	return matriz;
}
function determinante(matriz){
	if(matriz.length==2){
		var det=(matriz[0][0]*matriz[1][1])-(matriz[1][0]*matriz[0][1]);
		return det;
	}               
	var suma = 0;
	for(var i = 0; i<matriz.length; i++){
		var nm = createMatriz(matriz.length-1);
		for(var j=0; j<matriz.length; j++){
			if(j!=i){
				for(var k=1; k<matriz.length; k++){
					var indice=-1;
					if(j<i) indice=j;
			        else if(j>i) indice=j-1;
			        nm[indice][k-1] = matriz[j][k];
			    }
			}
		}
		if(i%2==0){                            
			suma += matriz[i][0] * determinante(nm);                            
		}                            
		else{                            
			suma -= matriz[i][0] * determinante(nm);
		}                        
	}
	return suma;
}
function Cholesky(matriz, n){
var lower = [];
var definida = true;

	for (var i = 0; i < n; ++i){
		lower[i] = new Array(n);
	}

	for (var i = 0; i < n; ++i){
		for (var j = 0; j < n; ++j){
			var sum = 0;
			if (j == i){
				for (var k = 0; k < j; ++k){
					sum += Math.pow(lower[j][k], 2);
				}
				if (matriz[j][j] - sum < 0){
					definida = false;
				}
				else lower[j][j] = Math.sqrt(matriz[j][j] - sum);
			} else{
				for (var k = 0; k < j; ++k){
					sum += (lower[i][k] * lower[j][k]);
				}
					lower[i][j] = (matriz[i][j] - sum) / lower[j][j];
			}
		}
	}

	if (definida){
		imprimir_matriz(matriz)
		for (var i = 0; i < n; ++i){
			for(var j = 0; j < n; ++j){
				if (isNaN(lower[i][j])) lower[i][j] = 0;
			}
		}
		let box_matriz = document.getElementById("caja_matriz");
		let caja_igual = document.createElement("div")
		let caja_multiplicacion = document.createElement("div")
		caja_igual.innerHTML += "="
		caja_igual.classList.add("caja_igual")
		box_matriz.append(caja_igual)
		imprimir_matriz(lower)
		caja_multiplicacion.innerHTML += "x"
		caja_multiplicacion.classList.add("caja_igual")
		box_matriz.append(caja_multiplicacion)
		imprimir_matriz(transpose(lower))
		return true;
	} else{

		if(n > 5) {
			alert("La matriz no es definida positvamente");	
			imprimir_matriz(matriz)
		}
		return false;
	}
}
function dosDecimales(n) {
  let t=n.toString();
  let regex=/(\d*.\d{0,2})/;
  return t.match(regex)[0];
}
function imprimir_matriz(mat){
	console.log(mat)
	let box_matriz = document.getElementById("caja_matriz");
	for(i = 0;i<mat.length;i++){
		let div_row = document.createElement("div");
		for(j = 0;j<mat[i].length;j++){
			mat[i][j] = dosDecimales(mat[i][j])
			let new_div = document.createElement("div");
			if(i == 0){
				new_div.classList.add("border_left");
			} else if(i == mat.length-1){
				new_div.classList.add("border_right")
			}
			new_div.innerHTML += mat[i][j];
			div_row.append(new_div);
		}
		box_matriz.append(div_row)
	}
	
}

function pruebas(){
	mat = [
	[4, 12, -16],
	[12, 37, -43],
	[-16, -43, 98]];

	mat2 = [
	[4, -4, 6, -6],
	[-4, 20, -22, 26],
	[6, -22, 61, -59],
	[-6, 26, -59, 108]]

	resolver(mat)
	Cholesky(mat, 3)
	console.log(mat2);
	Cholesky(mat2, 4)
}
function transpose(matriz) {
 return matriz[0].map(
 	function (_, c) { 
 		return matriz.map(function (r) { 
 			return r[c]; }); 
 	}); 
}