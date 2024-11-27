const btnNewFornecedor = document.querySelector('.btnNewFornecedor');
const NewFornecedor = document.querySelector('.NewFornecedor');
const btnFecharFornecedor = document.querySelector('.btnFecharFornecedor');

btnNewFornecedor.addEventListener('click', () => {
    NewFornecedor.classList.add('on');
});

btnFecharFornecedor.addEventListener('click', () => {
    NewFornecedor.classList.remove('on');
});

