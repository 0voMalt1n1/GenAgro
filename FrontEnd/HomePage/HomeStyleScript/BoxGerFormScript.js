const atvVolta = document.querySelectorAll('.btnPdCompra, .btnPlAtiva, .btEstoque');

const btnVoltar = document.querySelector('.btnVoltar');
const btnsNavBar = document.querySelector('.btnsNavBar');

atvVolta.forEach(btnAtvVolta => {
    btnAtvVolta.addEventListener('click', () => btnVoltar.classList.add('on'));
    btnsNavBar.addEventListener('click', () => btnsNavBar.classList.add('on'));
});

//Script btnPdCompra
const boxPdCompra = document.getElementById('boxPdCompra');
const btnPdCompraId = document.getElementById('btnPdCompra');

const btnIncPdCompra = document.getElementById('btnIncPdCompra');
const boxNewPdCompra = document.getElementById('boxNewPdCompra');
const btnFecharPdCompra = document.getElementById('btnFecharPdCompra')


btnPdCompraId.addEventListener('click', () => {
    btnIncPdCompra.classList.add('on');
    boxPdCompra.classList.add('on');
});

btnIncPdCompra.addEventListener('click', () => {
    boxNewPdCompra.classList.add('on');
});

btnFecharPdCompra.addEventListener('click', () => {
    boxNewPdCompra.classList.remove('on');
});


//Script btnPlAtiva
const boxPlAtiva = document.getElementById('boxPlAtiva');
const btnPlAtivaId = document.getElementById('btnPlAtiva');

const btnIncPlAtiva = document.getElementById('btnIncPlAtiva');
const boxNewPlAtiva = document.getElementById('boxNewPlAtiva');
const btnFecharPlAtiva = document.getElementById('btnFecharPlAtiva');

btnPlAtivaId.addEventListener('click', () => {
    btnIncPlAtiva.classList.add('on');
    boxPlAtiva.classList.add('on');
});

btnIncPlAtiva.addEventListener('click', () => {
    boxNewPlAtiva.classList.add('on');
});

btnFecharPlAtiva.addEventListener('click', () => {
    boxNewPlAtiva.classList.remove('on');
});

//Script btnVoltar
btnVoltar.addEventListener('click', () => {
    btnVoltar.classList.remove('on');
    btnsNavBar.classList.remove('on');
    //PdCompra
    btnIncPdCompra.classList.remove('on');
    boxPdCompra.classList.remove('on');
    boxNewPdCompra.classList.remove('on');
    //PlAtiva
    btnIncPlAtiva.classList.remove('on');
    boxPlAtiva.classList.remove('on');
    boxNewPlAtiva.classList.remove('on');
});
