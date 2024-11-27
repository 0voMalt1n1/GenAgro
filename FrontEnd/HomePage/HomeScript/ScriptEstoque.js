// Carregar o estoque
function carregarEstoque() {
    fetch('/getEstoque')
        .then(response => response.json())
        .then(estoque => {
            console.log('Dados recebidos:', estoque);
            const tbody = document.querySelector('#estoqueTabelaBody');
            console.log('Elemento tbody:', tbody);

            if (!tbody) {
                console.error('Elemento <tbody> não encontrado no DOM!');
                return;
            }

            tbody.innerHTML = '';

            estoque.forEach(item => {
                console.log('Adicionando item:', item); // teste
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${item.nmProduto}</td>
                    <td>${item.qtProduto}</td>
                    <td><button class="btnEditar">Editar</button></td>
                    <td><button class="btnExcluirEst">Excluir</button></td>
                `;

                const btnExcluir = row.querySelector('.btnExcluirEst');
                btnExcluir.addEventListener('click', () => {
                    excluirEstoque(item.idPdEstoque, row);
                });

                tbody.appendChild(row);
            });
        })
        .catch(err => {
            console.error('Erro ao carregar estoque:', err);
        });
}

// Botão de carregar estoque
document.getElementById('btnEstoque').addEventListener('click', () => {
    carregarEstoque();
});

// Excluir um item do estoque
function excluirEstoque(id, rowElement) {
    fetch(`/deleteEstoque/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);

                if (data.message === 'Item do estoque excluído com sucesso!') {
                    rowElement.remove(); // Remover linha da tabela
                }
            }
        })
        .catch(err => {
            console.error('Erro ao excluir item:', err);
        });
}

// Adicionar item ao estoque
document.getElementById('estoqueForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nmProduto = document.getElementById('nmProduto').value;
    const qtProduto = document.getElementById('qtProduto').value;
    const userData = { nmProduto, qtProduto };

    fetch('/cdEstoque', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                if (data.message === 'Produto registrado com sucesso!') {
                    carregarEstoque();
                    document.getElementById('estoqueForm').reset();
                }
            }
        })
        .catch(err => {
            console.error('Erro ao adicionar item ao estoque:', err);
        });
});
