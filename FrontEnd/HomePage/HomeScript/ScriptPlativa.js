// carregar o plativa

function carregarPlativa() {
    fetch('/getplativa')
        .then(response => response.json())
        .then(plativa => {
            console.log('Dados recebidos:', plativa);
            const tbody = document.querySelector('#plativaTabelaBody');
            console.log('Elemento tbody:', tbody);

            if (!tbody) {
                console.error('Elemento <tbody> não encontrado no DOM!');
                return;
            }

            tbody.innerHTML = '';

            plativa.forEach(item => {
                console.log('Adicionando item:', item); // teste
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${item.nmPlativa}</td>
                    <td>${item.tpCultivo}</td>
                    <td>${item.dtCultivo}</td>
                    <td>${item.dtColheita}</td>
                    <td><button class="btnEditar">Editar</button></td>
                    <td><button class="btnExcluirplat">Excluir</button></td>
                `;

                const btnExcluir = row.querySelector('.btnExcluirplat');
                btnExcluir.addEventListener('click', () => {
                    excluirPlativa(item.idPdEstoque, row);
                });

                tbody.appendChild(row);
            });
        })
        .catch(err => {
            console.error('Erro ao carregar produtos:', err);
        });
}

//btn carregar plativa

document.getElementById('btnPlAtiva').addEventListener('click', () => {
    carregarPlativa();
});

//excluir linha plativa

function excluirPlativa(id, rowElement) {
    //teste
    console.log('ID para exclusão:', id); 
    if (!id) {
        console.error('ID inválido ou indefinido para exclusão.');
        alert('Erro: ID inválido ou indefinido.');
        return;
    }
    //teste

    fetch(`/deletarPlativa/${id}`, {method: `DELETE`})
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message)
                if(data.message === 'Item excluído com sucesso!'){
                    rowElement.remove(); // Remover linha da tabela
                }
            }
        })
        .catch(err => {
            console.error('Erro ao excluir item:', err);
        });
}

document.getElementById('plativaForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const nmPlativa = document.getElementById('nmPlativa').value;
    const tpPlativa = document.getElementById('tpPlativa').value;
    const dtCultivo = document.getElementById('dtCultivo').value;
    const dtColheita = document.getElementById('dtColheita').value;

    const userData = {
        nmPlativa: nmPlativa,
        tpPlativa: tpPlativa,
        dtCultivo: dtCultivo,
        dtColheita: dtColheita
    };

    fetch('/cdPlativa', {
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
                if (data.message === 'Produto registrado com sucesso!') {
                    carregarPlativa();
                    document.getElementById('plativaForm').reset();
                }
            }
        })
});