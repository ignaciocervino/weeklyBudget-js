/** Variables y Selectores */
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');



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
        this.calcularRestante();
    }
    calcularRestante(){
        const gastado = this.gastos.reduce((total,gasto)=> total + gasto.cantidad, 0);// ,0 porque inicia en 0
        this.restante = this.presupuesto-gastado;
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

    agregarGastoListado(gastos){
        this.limpiarHTML();//Elimina el HTML previo
        //Iterar sobre los gastos
        gastos.forEach(gasto => {
            const {cantidad,nombre,id} = gasto;
            //Crear un li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id;//va a poner data-id

            //Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad}</span>`;

            //Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn','btn-danger','borrar-gasto');//Hace lo mismo que className pero diferente sintaxis
            btnBorrar.innerHTML = 'Borrar &times;';
            nuevoGasto.appendChild(btnBorrar);
            
            //Agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        });
    }
    limpiarHTML(){
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj){
        const {presupuesto,restante} = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');
        //Comprobar 25%
        if (restante <= presupuesto*0.25) {
            console.log("enters");
            restanteDiv.classList.remove('alert-success','alert-warning');
            restanteDiv.classList.add('alert-danger');
        }
        else if (restante <= presupuesto*0.5) {
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }
        
        if (restante<=0) {
            ui.imprimirAlerta('El presupuesto se ha agotado','error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
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
    
    //Imprimir los gastos
    const {gastos,restante} = presupuesto
    ui.agregarGastoListado(gastos);
    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
    
    //Reinicia el formulario
    formulario.reset();
}