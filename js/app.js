/** Variables y Selectores */
const formulario = document.querySelector('#agregar-gasto');
const gastListado = document.querySelector('#gastos ul');



/** Eventos */
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
    formulario.addEventListener('submit',agregarGasto);
}


/** Clases */
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);//Porque el restante es el mismo al presupuesto al iniciar
        this.gastos = []
    }
    nuevoGasto(gasto){
        this.gastos = [...this.gastos,gasto];//Spread operator
    }
}

class UI{
    insertarPresupuesto(cantidad){
        const {presupuesto,restante} = cantidad //Destructuring
        //Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');//Este proyecto usa boostrap

        if (tipo==='error') {
            divMensaje.classList.add('alert-danger');
        }
        else{
            divMensaje.classList.add('alert-success');
        }

        //Mnesaje de error
        divMensaje.textContent = mensaje;

        //Insertar en HTML
        document.querySelector('.primario').insertBefore(divMensaje,formulario);

        //Quitar mensaje
        setTimeout(()=>{
            divMensaje.remove();
        },3000);
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

//Añade gastos
function agregarGasto(e){
    e.preventDefault();

    //Leer datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //Validar
    if (nombre==='' || cantidad==='') {
        ui.imprimirAlerta('Ambos campos son obligatorios','error');
        return;
    }
    else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no valida','error');
        return;  
    }

    //Generar un objeto gasto
    const gasto = {nombre,cantidad,id:Date.now()};//Esto es lo contrario a un distructuring, extrae nombre y cantidad de gasto
    
    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta('Gasto añadido correctamente!');//No es necesario pasar success porq va a caer en el else
    //Reinicia el formulario
    formulario.reset();
}