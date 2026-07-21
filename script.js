// ==========================
// VARIABLES
// ==========================

const form = document.querySelector("#form");
const description = document.querySelector("#description");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");

const balance = document.querySelector("#balance");
const income = document.querySelector("#income");
const expense = document.querySelector("#expense");

const all = document.querySelector("#all");
const incomeFilter = document.querySelector("#incomeFilter");
const expenseFilter = document.querySelector("#expenseFilter");
const contador = document.querySelector("#contador");

const transactions = document.querySelector("#transactions");


// ==========================
// ARREGLO DE TRANSACCIONES
// ==========================

let movimientos = [];
let filtro = "all";

// ==========================
// EVENTO DEL FORMULARIO
// ==========================

form.addEventListener("submit", agregarMovimiento);


// ==========================
// AGREGAR MOVIMIENTO
// ==========================

function agregarMovimiento(event){

    event.preventDefault();

    const movimiento = {

        id: Date.now(),

        descripcion: description.value,

        valor: Number(amount.value),

        tipo: type.value,

        fecha: new Date().toLocaleString("es-CO",{

            dateStyle:"short",

            timeStyle:"short"

        })

    };

    movimientos.push(movimiento);

    guardarMovimientos();
    actualizarResumen();
    mostrarMovimientos();
    form.reset();
    description.focus();

}


// ==========================
// MOSTRAR MOVIMIENTOS
// ==========================

function mostrarMovimientos(){

    transactions.innerHTML = "";

    let lista = movimientos;

    if(filtro === "income"){

        lista = movimientos.filter(function(movimiento){

            return movimiento.tipo === "income";

        });

    }

    if(filtro === "expense"){

        lista = movimientos.filter(function(movimiento){

            return movimiento.tipo === "expense";

        });

    }

    contador.textContent = `Total Transactions: ${lista.length}`;

    for(let i = 0; i < lista.length; i++){

        const movimiento = lista[i];


        transactions.innerHTML += `

        <div class="transaction ${movimiento.tipo}">

            <div>

                <h4>${movimiento.descripcion}</h4>

                <p>${formatearDinero(movimiento.valor)}</p>

                <small>${movimiento.fecha}</small>

            </div>

            <button class="delete-btn" onclick="eliminarMovimiento(${movimiento.id})">

                🗑

            </button>

        </div>

        `;

    }
    contador.textContent = `Total Transactions: ${lista.length}`;

}


// ==========================
// ACTUALIZAR BALANCE
// ==========================

function actualizarResumen(){

    let totalIngresos = 0;

    let totalGastos = 0;

    for(const movimiento of movimientos){

        if(movimiento.tipo === "income"){

            totalIngresos += movimiento.valor;

        }else{

            totalGastos += movimiento.valor;

        }

    }


    income.textContent = formatearDinero(totalIngresos);

    expense.textContent = formatearDinero(totalGastos);

    const saldo = totalIngresos - totalGastos;

    balance.textContent = formatearDinero(saldo);

    balance.classList.remove("positive", "negative");

    if(saldo >= 0){

        balance.classList.add("positive");

    }else{

        balance.classList.add("negative");

    }

}

function eliminarMovimiento(id){

    const indice = movimientos.findIndex(function(movimiento){

        return movimiento.id === id;

    });

    if(indice !== -1){

        movimientos.splice(indice,1);

        guardarMovimientos();

        actualizarResumen();

        mostrarMovimientos();

    }

}

function guardarMovimientos(){

    localStorage.setItem(

        "movimientos",

        JSON.stringify(movimientos)

    );

}

function cargarMovimientos(){

    const datos = localStorage.getItem("movimientos");

    if(datos){

        movimientos = JSON.parse(datos);

        mostrarMovimientos();

        actualizarResumen();

    }

}

cargarMovimientos();

const reset = document.querySelector("#reset");

reset.addEventListener("click", borrarTodo);

function borrarTodo(){

    const confirmar = confirm("¿Seguro que deseas eliminar todas las transacciones?");

    if(!confirmar){
        return;
    }

    movimientos = [];

    localStorage.removeItem("movimientos");

    mostrarMovimientos();

    actualizarResumen();

}

function formatearDinero(valor){

    return valor.toLocaleString("es-CO",{

        style:"currency",

        currency:"COP"

    });

}

all.addEventListener("click",function(){

    filtro="all";

    mostrarMovimientos();

});

incomeFilter.addEventListener("click",function(){

    filtro="income";

    mostrarMovimientos();

});

expenseFilter.addEventListener("click",function(){

    filtro="expense";

    mostrarMovimientos();

});