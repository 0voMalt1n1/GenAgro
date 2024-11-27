const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});

// Rota de teste
app.get('/health', (req, res) => {
    res.send('Servidor backend está funcionando!');
});

// Config Arquivo Estático (FrontEnd/Index.html)
app.use(express.static(path.join(__dirname, '..', 'FrontEnd', 'LoginPage')));

// Rota para LoginPage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'LoginPage', 'Index.html'));
});

// Config arquivo estático (Home/Index.html)
app.use(express.static(path.join(__dirname, '..', 'FrontEnd')));

// Rota para a HomePage
app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'FrontEnd', 'HomePage', 'Index.html'));
});;

// Rota de Login (POST)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios!' });
    }

    const query = 'SELECT * FROM tbusuarios WHERE usuario = ? AND senha = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }

        if (results.length > 0) {
            //redirecionamento para /Home
            res.status(200).json({ message: 'Login bem-sucedido!', redirect: '/homepage' });
        } else {
            // Return error
            res.status(401).json({ message: 'Usuário ou senha incorretos!' });
        }
    });
});

// Rota de cadastrarUser (POST)
app.post('/cadastrarUser', (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    const query = 'INSERT INTO tbusuarios (usuario, email, senha) VALUES (?, ?, ?)';

    db.query(query, [username, email, password], (err, results) => {
        if (err) {
            console.error('Erro ao registrar o usuário:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }

        return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    });
});





//Rota CdFornecedor (POST)
app.post('/cdFornecedor', (req, res) => {
    console.log(req.body);
    const { nmFornecedor, emFornecedor, tlFornecedor } = req.body;

    if (!nmFornecedor || !emFornecedor || !tlFornecedor) {
        return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    const query = 'INSERT INTO tbFornecedores (nmFornecedor, emFornecedor, tlFornecedor) VALUES (?, ?, ?)'

    db.query(query, [nmFornecedor, emFornecedor, tlFornecedor], (err, results) => {
        if (err) {
            console.error('Erro ao registrar o usuário:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }

        return res.status(201).json({ message: 'Fornecedor registrado com sucesso!' });
    });
});

// Rota para obter fornecedores
app.get('/getFornecedores', (req, res) => {
    console.log(req.body);

    const query = 'SELECT idFornecedor, nmFornecedor, emFornecedor, tlFornecedor FROM tbFornecedores';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar fornecedores:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }

        return res.status(200).json(results);
    });
});

// Rota para deletar fornecedor
app.delete('/deleteFornecedor/:id', (req, res) => {
    const fornecedorId = req.params.id;
    const query = 'DELETE FROM tbfornecedores WHERE idFornecedor = ?';
    db.query(query, [fornecedorId], (err, results) => {
        if (err) {
            console.error('Erro ao deletar fornecedor:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Fornecedor não encontrado.' });
        }
        return res.status(200).json({ message: 'Fornecedor excluído com sucesso!' });
    });
});





//Rota cdEstoque (POST)
app.post('/cdEstoque', (req, res) => {
    console.log(req.body);
    const { nmProduto, qtProduto } = req.body;
    if (!nmProduto, !qtProduto) {
        return res.status(400).json({ massege: 'Preencha todos os campos!' });
    }
    const query = 'INSERT INTO tbpdestoque (nmProduto, qtProduto) VALUES (?, ?)'
    db.query(query, [nmProduto, qtProduto], (err, results) => {
        if (err) {
            console.error('Erro ao registrar o usuário:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }
        return res.status(201).json({ message: 'Produto registrado com sucesso!' });
    });
});

//Rota obter estoque
app.get('/getEstoque', (req, res) => {
    console.log(req.body);

    const query = 'SELECT idPdEstoque, nmProduto, qtProduto FROM tbpdestoque';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar estoque:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }
        return res.status(200).json(results);
    });
});

// Rota para deletar estoque
app.delete('/deleteEstoque/:id', (req, res) => {
    const estoqueId = req.params.id;

    const query = 'DELETE FROM tbpdestoque WHERE idPdEstoque = ?';
    db.query(query, [estoqueId], (err, results) => {
        if (err) {
            console.error('Erro ao deletar item do estoque:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Item do estoque não encontrado.' });
        }

        return res.status(200).json({ message: 'Item do estoque excluído com sucesso!' });
    });
});





//Rota cdPdCompra (POST)
app.post('/cdPdCompra', (req, res) => {
    console.log(req.body);
    const { nmPdcompra, vlPdcompra } = req.body;
    if (!nmPdcompra, !vlPdcompra) {
        return res.status(400).json({ massege: 'Preencha todos os campos!' });
    }
    const query = 'INSERT INTO tbpdcompra (nmproduto, vlproduto) VALUES (?, ?)'
    db.query(query, [nmPdcompra, vlPdcompra], (err, results) => {
        if (err) {
            console.error('Erro ao registrar o usuário:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }
        return res.status(201).json({ message: 'Produto registrado com sucesso!' });
    });
});

//Rota obter pdcompra
app.get('/getPdcompra', (req, res) => {
    console.log(req.body);

    const query = 'SELECT idPdCompra, nmProduto, vlProduto FROM tbpdcompra';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar Produtos para compra!:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }
        return res.status(200).json(results);
    });
});

// Rota para deletar pdcompra
app.delete('/deletePdcompra/:id', (req, res) => {
    const pdcompraId = req.params.id;

    const query = 'DELETE FROM tbpdcompra WHERE idPdCompra = ?';
    db.query(query, [pdcompraId], (err, results) => {
        if (err) {
            console.error('Erro ao deletar item!:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Item não encontrado.' });
        }

        return res.status(200).json({ message: 'Item excluído com sucesso!' });
    });
});




//Rota plAtiva (POST)
app.post('/cdPlativa', (req, res) => {
    console.log(req.body);
    const { nmPlativa, tpPlativa, dtCultivo, dtColheita } = req.body;
    if (!nmPlativa, !tpPlativa, !dtCultivo, !dtColheita) {
        return res.status(400).json({ massege: 'Preencha todos os campos!' });
    }
    const query = 'INSERT INTO tbplativa (nmPlativa, tpCultivo, dtCultivo, dtColheita) VALUES (?, ?, ?, ?)'
    db.query(query, [nmPlativa, tpPlativa, dtCultivo, dtColheita], (err, results) => {
        if (err) {
            console.error('Erro ao registrar o usuário:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }
        return res.status(201).json({ message: 'Produto registrado com sucesso!' });
    });
});

//Rota obter plativa

app.get('/getplativa', (req, res) => {
    console.log(req.body);

    const query = 'SELECT idPdEstoque, nmPlativa, tpCultivo, dtCultivo, dtColheita FROM tbplativa';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar Produtos para compra!:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }
        return res.status(200).json(results);
    });
});

//rota para deletar plativa

app.delete('/deletarPlativa/:id', (req, res) => {
    const plativaId = req.params.id;

    const query = 'DELETE FROM tbplativa WHERE idPdEstoque = ?';
    db.query(query, [plativaId], (err, results) => {
        if (err) {
            console.error('Erro ao deletar item!:', err);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Item não encontrado.' });
        }

        return res.status(200).json({ message: 'Item excluído com sucesso!' });
    });
});