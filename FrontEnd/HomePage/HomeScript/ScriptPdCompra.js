// Carregar o pdcompra
function carregarPdcompra() {
    fetch('/getPdcompra')
        .then(response => response.json())
        .then(pdcompra => {
            console.log('Dados recebidos:', pdcompra);
            const tbody = document.querySelector('#pdcompraTabelaBody');
            console.log('Elemento tbody:', tbody);

            if (!tbody) {
                console.error('Elemento <tbody> não encontrado no DOM!');
                return;
            }

            tbody.innerHTML = '';

            pdcompra.forEach(item => {
                console.log('Adicionando item:', item); // teste
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${item.nmProduto}</td>
                    <td>${item.vlProduto}</td>
                    <td><button class="btnEditar">Editar</button></td>
                    <td><button class="btnExcluirPdcom">Excluir</button></td>
                `;

                const btnExcluir = row.querySelector('.btnExcluirPdcom');
                btnExcluir.addEventListener('click', () => {
                    console.log('ID do item para exclusão:', item.idPdCompra); // Adicione esse log
                    excluirPdcompra(item.idPdCompra, row);
                });

                tbody.appendChild(row);
            });
        })
        .catch(err => {
            console.error('Erro ao carregar produtos:', err);
        });
}

// Botão de carregar pdcompra
document.getElementById('btnPdCompra').addEventListener('click', () => {
    carregarPdcompra();
});

//Exluir linha pdcompra
function excluirPdcompra(id, rowElement) {
    //teste
    console.log('ID para exclusão:', id);
    if (!id) {
        console.error('ID inválido ou indefinido para exclusão.');
        alert('Erro: ID inválido ou indefinido.');
        return;
    }
    //teste

    fetch(`/deletePdcompra/${id}`, { method: `DELETE` })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message)
                if (data.message === 'Item excluído com sucesso!') {
                    rowElement.remove(); // Remover linha da tabela
                }
            }
        })
        .catch(err => {
            console.error('Erro ao excluir item:', err);
        });
}

document.getElementById('pdcompraForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nmPdcompra = document.getElementById('nmPdcompra').value;
    const vlPdcompra = document.getElementById('vlPdcompra').value;

    const userData = {
        nmPdcompra: nmPdcompra,
        vlPdcompra: vlPdcompra
    };

    fetch('/cdPdCompra', {
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
                carregarPdcompra();
                document.getElementById('pdcompraForm').reset();
            }
        })
});