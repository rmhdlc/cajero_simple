class Billete {
    constructor(v, c) {
        this.valor = v;
        this.cantidad = c;
        this.nombre = this.valor.toString();

        this.imagen = new Image();
        this.imagen.src = imagenes[this.nombre];
    }

    mostrar() {
        imagenesBilletes.appendChild(this.imagen);
    }
}

function entregarDinero() {
    var t = document.getElementById("dinero");
    var dineroTotal = 0;
    var billetesSobrantes = 0;
    var sobrante = [];
    var entregado = [];
    var dibujado = [];
    resultado.innerHTML = "";
    imagenesBilletes.innerHTML = "";

    dinero = parseInt(t.value);

    for(bi of caja) {
        dineroTotal = dineroTotal + (bi.valor * bi.cantidad);
    }

    console.log("Dinero inicial: " + dineroTotal);
    
    for(bi of caja) {
        if(dinero > 0) {
            div = Math.floor(dinero/bi.valor);

            if(div > bi.cantidad) {
                papeles = bi.cantidad;
            }
            else {
                papeles = div;
            }

            entregado.push( new Billete(bi.valor, papeles) );
            dinero = dinero - (bi.valor * papeles);
        }
        else {
            papeles = 0;
        }

        billetesSobrantes = bi.cantidad - papeles;

        for (var i = 0; i < papeles; i++) {
			dibujado.push ( new Billete(bi.valor, 1) );
        }
                
        sobrante.push( new Billete(bi.valor, billetesSobrantes) );
    }

    if(dinero > 0) {
        resultado.innerHTML = "No puedo darte esa cantidad :(";
    }
    else {
        for(var e of entregado) {
            if(e.cantidad > 0) {
                resultado.innerHTML = "Se ha retirado: <br />";
                //resultado.innerHTML += e.cantidad + " billetes de $" + e.valor + "<br>";
                for(var e of dibujado) {		
				e.mostrar();
			    }
            }
        }
    }

    console.log(sobrante);
    caja = sobrante;
    dineroTotal = 0;
    for(bi of caja) {
        dineroTotal = dineroTotal + (bi.valor * bi.cantidad);
    }

    console.log("Dinero final: " + dineroTotal);
}


var caja = [];
var imagenes = [];
imagenes["100"] = "100.png";
imagenes["50"] = "50.png";
imagenes["20"] = "20.png";
imagenes["10"] = "10.png";
imagenes["5"] = "5.png";

caja.push( new Billete(100,5) );
caja.push( new Billete(50,10) );
caja.push( new Billete(20,5) );
caja.push( new Billete(10,10) );
caja.push( new Billete(5,5) );

var dinero = 0;
var div = 0;
var papeles = 0;

var resultado = document.getElementById("resultado")
var imagenesBilletes = document.getElementById("imagenes")
var b = document.getElementById("extraer");
b.addEventListener("click", entregarDinero);


