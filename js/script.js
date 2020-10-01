alert("Los valores están redondeados a 2 decimales")
function init(){
	let box_matriz = document.getElementById("caja_matriz");
	while (box_matriz.firstChild) {
   		box_matriz.removeChild(box_matriz.lastChild);
  	}
	creaMatriz();
}
function creaMatriz(c = 0) {
	let t = document.getElementById("numero_filas_columnas").value;
	let recursividad = c;
	++recursividad;
	if (t < 4 || t > 10){
		alert("El valor ingresado no es valido (Mayor a 10 o Menor a 4)");
	}
	else{
		let maximo = 1000; //Máximo de rango
		let minimo = 1; //Minimo de rango
		let arreglo = new Array((t*(parseInt(t)+1))/2);
		for (let i = 0; i < (t*(parseInt(t)+1))/2; ++i){
			arreglo[i] = Math.floor((Math.random() * (maximo - minimo + 1)) +  minimo);
			if(arreglo[i] == 0){
				arreglo[i] = 1;
			}
		}
		let matriz = [];
		for (let i = 0; i < t; ++i){
			matriz[i] = new Array(t);
		}
		let contador = 0;
		for (let i = 0; i < t; ++i){
			for (let j = i; j < t; ++j){
				matriz[i][j] = arreglo[contador];
				matriz[j][i] = arreglo[contador];
				contador++;
			}
		}
		if (recursividad < 30000){
			if (!Cholesky(matriz, t)){
				creaMatriz(recursividad);
			}
		}
		else{
			alert("La siguiente matriz generada no puede ser factorizada por Cholesky, trate de nuevo");
			imprimir_matriz(matriz);
		}
	}
}
function Cholesky(matriz, n){
	let lower = [];
	let definida = true;
	for (let i = 0; i < n; ++i){
		lower[i] = new Array(n);
	}
	for (let i = 0; i < n; ++i){
		for (let j = 0; j < n; ++j){
			let sum = 0;
			if (j == i){
				for (let k = 0; k < j; ++k){
					sum += Math.pow(lower[j][k], 2);
				}
				if (matriz[j][j] - sum < 0){
					definida = false;
					return false;
				}
				else lower[j][j] = Math.sqrt(matriz[j][j] - sum);
			}
			else{
				for (let k = 0; k < j; ++k){
					sum += (lower[i][k] * lower[j][k]);
				}
				if ((matriz[i][j] - sum) == 0 || lower[j][j] == 0){
					definida = false;
					return false;
				}
				else{
					lower[i][j] = (matriz[i][j] - sum) / lower[j][j];
				}
			}
		}
	}
	if (definida){
		imprimir_matriz(matriz)
		for (let i = 0; i < n; ++i){
			for(let j = 0; j < n; ++j){
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
function transpose(matriz) {
 return matriz[0].map(
 	function (_, c) { 
 		return matriz.map(function (r) { 
 			return r[c]; }); 
 	}); 
}
