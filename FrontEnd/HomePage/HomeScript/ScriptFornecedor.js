function carregarFornecedores() {
    fetch('/getFornecedores')
        .then(response => response.json())
        .then(fornecedores => {
            const tbody = document.querySelector('tbody');
            tbody.innerHTML = '';

            fornecedores.forEach(fornecedor => {
                const row = document.createElement('tr');

                row.innerHTML = `
                <td>${fornecedor.nmFornecedor}</td>
                <td>${fornecedor.emFornecedor}</td>
                <td>${fornecedor.tlFornecedor}</td>
                <td><button class="btnEditar">Editar</button></td>
                <td><button class="btnExcluirForn">Excluir</button></td>
                `;

                const btnExcluir = row.querySelector('.btnExcluirForn');
                btnExcluir.addEventListener('click', () => {
                    excluirFornecedor(fornecedor.idFornecedor, row);
                });

                tbody.appendChild(row);
            });
        })
        .catch(err => {
            console.error('Erro ao carregar fornecedores:', err);
        });
}

const btnfornecedor = document.getElementById('btnFornecedor')
btnfornecedor.addEventListener('click', () => {
    carregarFornecedores();
});

function excluirFornecedor(id, rowElement) {
    fetch(`/deleteFornecedor/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);

                if (data.message === 'Fornecedor excluído com sucesso!') {
                    rowElement.remove();
                }
            }
        })
        .catch(err => {
            console.error('Erro ao excluir fornecedor:', err);
        });
}

document.getElementById('fornecedorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nmFornecedor = document.getElementById('nmFornecedor').value;
    const emFornecedor = document.getElementById('emFornecedor').value;
    const tlFornecedor = document.getElementById('tlFornecedor').value;

    const userData = {
        nmFornecedor: nmFornecedor,
        emFornecedor: emFornecedor,
        tlFornecedor: tlFornecedor
    };

    fetch('/cdFornecedor', {
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
                if (data.message === 'Fornecedor registrado com sucesso!') {
                    carregarFornecedores(userData);
                    document.getElementById('fornecedorForm').reset();
                }
            }
        })
        .catch(err => {
            console.error('Erro ao adicionar fornecedor:', err);
        });
});
