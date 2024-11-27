const Wrapper = document.getElementById('BoxMain');
const RegisterLink = document.getElementById('RegisterLink');
const btnVltLogin = document.querySelector('.VltLoginLink');

RegisterLink.addEventListener('click', () => {
    Wrapper.classList.add('on');
});

btnVltLogin.addEventListener('click', () => {
    Wrapper.classList.remove('on');
})