document.getElementById('RegisterForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('rg-user').value;
    const email = document.getElementById('rg-email').value;
    const password = document.getElementById('rg-senha').value;

    const userData = {
        username: username,
        email: email,
        password: password
    };

    fetch('/cadastrarUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            }
        })
});