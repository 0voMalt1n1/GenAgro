document.getElementById('LoginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('lg-user').value;
    const password = document.getElementById('lg-password').value;

    const userData = {
        username: username,
        password: password
    };
    
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect;
            } else {
                alert(data.massage);
            }
        });
});