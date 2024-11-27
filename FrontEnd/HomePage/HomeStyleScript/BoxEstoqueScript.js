const btnNewEstoque = document.getElementById('btnNewEstoque');
const NewEstoque = document.getElementById('NewEstoque');
const btnFecharEstoque = document.querySelector('.btnFecharEstoque');

btnNewEstoque.addEventListener('click', () => {
    NewEstoque.classList.add('on');
});

btnFecharEstoque.addEventListener('click', () => {
    NewEstoque.classList.remove('on');
});