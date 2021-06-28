/** Variables y Selectores */
const formulario = document.querySelector('#agregar-gasto');
const gastListado = document.querySelector('#gastos ul');



/** Eventos */
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);

}


/** Clases */
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);//Porque el restante es el mismo al presupuesto al iniciar
        this.gastos = []
    }
}

class UI{
    insertarPresupuesto(cantidad){
        const {presupuesto,restante} = cantidad //Destructuring
        //Agregar al HTML
        document.createElement('#total').textContent = presupuesto;
        document.createElement('#restante').textContent = restante;
    }
}

//Instanciar globalmente
const ui = new UI();
let presupuesto;
/** Funciones */
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');
    if(presupuestoUsuario === '' || presupuestoUsuario===null || isNaN(presupuestoUsuario) || presupuestoUsuario<=0){//Cuando da cancelar es null
        window.location.reload();//Recarga la ventana actual
    }
    presupuesto = new Presupuesto(presupuestoUsuario);
    ui.insertarPresupuesto(presupuesto);
}