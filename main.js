class Base {
	constructor(nombre, minutos) {
		this._nombre = nombre;
		this._minutos = minutos;
		this._siguiente = null;
    }
    
	get nombre() {
        return this._nombre;
    }

	get minutos() {
        return this._minutos;
    }
    
	get siguiente() {
        return this._siguiente;
    }
	set siguiente(s){
        this._siguiente = s;
    }
}

class Ruta {
	constructor() {
		this._primero = null;
    }
    
	get primero() {
        return this._primero;
    }
    
    set primero(p) {
        this._primero = p;
    }

	agregar(base){
		if(this._primero) {
			var este = this._primero;
			while(este.siguiente != this._primero) {
				este = este.siguiente;
            }
			este.siguiente = base;
		} else {
			this._primero = base;
		}
		base.siguiente = this._primero;
	}

	buscar(nombre){
		var este = this._primero;
		do {
			if (este.nombre == nombre) {
                return este;
            } else {
                este = este.siguiente;
            }
		} while(este != this._primero);
		return null;
	}

	buscarAnterior(nombre){
		var este = this._primero;
		do {
            if (este.siguiente.nombre == nombre) {
                return este;
            } else {
                este = este.siguiente;
            }
		} while(este != this._primero);
		return null;
	}

	eliminar(nombre){
		var base = this.buscarAnterior(nombre);
		if (base) {
			if (base.siguiente == this._primero) {
				if (base == this._primero) {
					this._primero = null;
				} else {
					this._primero = base.siguiente.siguiente;
					base.siguiente = this._primero;
				}
			} else {
				base.siguiente = base.siguiente.siguiente;
			}
			this.imprimir();
			return true;
		} else {
            return null;
        }
	}

	imprimir() {
		if (this._primero) {
			var este = this._primero;
			do {
				console.log("Base: ", este.nombre,  ", Minutos para llegar: ", este.minutos);
				este = este.siguiente;
            }while (este != this.primero);
            console.log("");
		} else {
            return null;
        }	
	}

	string(minutos){
		var horas = Math.trunc(minutos / 60);
		var minutos = minutos % 60;
		if (minutos < 10) {
			minutos = "0" + minutos;
		}
		return horas + ":" + minutos;
	}

	crearRecorrido(baseInicio, horaInicio, horaFinal){
		var hInicio = Number(horaInicio.split(":")[0]) * 60 + Number(horaInicio.split(":")[1]);
        var hFinal = Number(horaFinal.split(":")[0]) * 60 + Number(horaFinal.split(":")[1]);
		var este = this.buscar(baseInicio);
		while(hInicio <= hFinal) {
			console.log("Base: ", este.nombre, ", Hora: ", this.string(hInicio));
			hInicio += este.siguiente.minutos;
			este = este.siguiente;
		}
	}
}

var ruta1 = new Ruta();

ruta1.agregar(new Base("Sams", 6));
ruta1.agregar(new Base("Walmart", 10));
ruta1.agregar(new Base("Marina", 8));
ruta1.agregar(new Base("Soriana", 15));
ruta1.agregar(new Base("Coppel", 10));
ruta1.agregar(new Base("Elektra", 20));
ruta1.imprimir();

document.querySelector("#btnRecorrido").addEventListener('click', () => {
    let baseInicio = document.querySelector("#baseInicio").value;
    let HoraIncio = document.querySelector("#HoraIncio").value;
    let HoraFinal = document.querySelector("#HoraFinal").value;

    ruta1.crearRecorrido(baseInicio, HoraIncio, HoraFinal);
    console.log("");
});