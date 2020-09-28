function creaMatriz() {
	var maximo = 100; //Máximo de rango
	var minimo = 1; //Minimo de rango
	var t = document.getElementById("numero_filas_columnas").value;
	console.log(t)
	if (t < 4 || t > 10){
		alert("El valor ingresado no es valido (Mayor a 10 o Menor a 4)");
	} else{
		var arreglo = new Array((t*(t+1))/2);
		for (var i = 0; i < (t*(t+1))/2; ++i){
			arreglo[i] = Math.floor((Math.random() * (maximo - minimo + 1)) +  minimo);
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
		console.log(matriz);
		Cholesky(matriz, t);
	}
}
function Cholesky(matriz, n){
	let lower = [];
	let definida = true;
	for (i = 0; i < n; ++i){
		lower[i] = new Array(n);
	}
	for (i = 0; i < n; ++i){
		for (j = 0; j < n; ++j){
			let sum = 0;
			if (i == j){
				for (k = 0; k < j; ++k){
					sum += Math.pow(lower[j][k], 2);
				}
				if (matriz[j][j] - sum < 0){
					alert("Matriz no definida positivamente");
					definida = false;
				} else {
					lower[j][j] = Math.sqrt(matriz[j][j] - sum);
				}
			} else{
				for (k = 0; k < j; ++k){
					sum += (lower[i][k] * lower[j][k]);
				}
				lower[i][j] = (matriz[i][j] - sum) / lower[j][j];
			}
		}
	}
	if (definida){
		for (i = 0; i < n; ++i){
			for(j = 0; j < n; ++j){
				if (isNaN(lower[i][j])) lower[i][j] = 0;
			}
		}
		return lower
	} else{
		alert("La matriz no es definida positvamente");
	}
}
function imprimir_matriz(mat){
	let box_matriz = document.getElementById("caja_matriz");
	for(i = 0;i<mat.length;i++){
		let div_row = document.createElement("div");
		for(j = 0;j<mat[i].length;j++){
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
function resolver(mat){
	imprimir_matriz(mat)
	let box_matriz = document.getElementById("caja_matriz");
	let matriz_res = Cholesky(mat,mat.length)
	let caja_igual = document.createElement("div")
	let caja_multiplicacion = document.createElement("div")
	caja_igual.innerHTML += "="
	caja_igual.classList.add("caja_igual")
	box_matriz.append(caja_igual)
	imprimir_matriz(matriz_res)
	caja_multiplicacion.innerHTML += "x"
	caja_multiplicacion.classList.add("caja_igual")
	box_matriz.append(caja_multiplicacion)
	imprimir_matriz(transpose(matriz_res))
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