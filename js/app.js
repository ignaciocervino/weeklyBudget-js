/** Variables y Selectores */
const formulario = document.querySelector('#agregar-gasto');
const gastListado = document.querySelector('#gastos ul');



/** Eventos */
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);

}


/** Clases */


/** Funciones */
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');
    if(presupuestoUsuario === '' || presupuestoUsuario===null || isNaN(presupuestoUsuario) || presupuestoUsuario<=0){//Cuando da cancelar es null
        window.location.reload();//Recarga la ventana actual
    }
}