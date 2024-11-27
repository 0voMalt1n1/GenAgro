const BoxMain = document.querySelector('.BoxMain');

//Fechar BoxPrincipal
const closeBox = document.querySelector('.btnCloseBP');
closeBox.addEventListener('click', () => {
    BoxMain.classList.remove('on');
    BoxFornecedor.classList.remove('on');
    BoxGerForm.classList.remove('on');
    BoxEstoque.classList.remove('on');
});

//Abrir Box - btnFornecedor
const btnFornecedor = document.querySelector('.btnFornecedor');
const BoxFornecedor = document.querySelector('.BoxFornecedor');
btnFornecedor.addEventListener('click', () => {
    if (!BoxMain.classList.contains('on')) {
        BoxMain.classList.add('on');
        BoxFornecedor.classList.add('on');
    }
});

//Abrir Box - btnGerForm
const btnGerForm = document.querySelector('.btnGerForm');
const BoxGerForm = document.querySelector('.BoxGerForm');
btnGerForm.addEventListener('click', () => {
    if (!BoxMain.classList.contains('on')) {
        BoxMain.classList.add('on');
        BoxGerForm.classList.add('on');
    }
});

//Abri Box - btnRelatorio
const btnEstoque = document.querySelector('.btnEstoque');
const BoxEstoque = document.querySelector('.BoxEstoque');
btnEstoque.addEventListener('click', () => {
    if (!BoxMain.classList.contains('on')) {
        BoxMain.classList.add('on');
        BoxEstoque.classList.add('on');
    }
});
