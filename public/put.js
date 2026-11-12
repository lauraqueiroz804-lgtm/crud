var senhaAtual = '' // guarda a senha atual do cliente

function buscarDados() {
    var cpf = document.getElementById('identificadorCPF').value

    fetch('')
        .then(resposta => resposta.json())
        .then(dados => {
            var p = dados.find(pessoa => pessoa.cpf === cpf)

            if (p) {
                document.getElementById('identificador').value = p.id
                document.getElementById('nome').value = p.nome
                document.getElementById('sobrenome').value = p.sobrenome
                document.getElementById('email').value = p.email
                document.getElementById('rua').value = p.rua
                document.getElementById('cep').value = p.cep
                document.getElementById('cidade').value = p.cidade
                document.getElementById('estado').value = p.estado
                document.getElementById('telefone').value = p.telefone
                document.getElementById('senha').value = ''
                senhaAtual = p.senha
            } else {
                alert('Cliente não encontrado')
            }
        })
        .catch(() => alert('Não foi possível conectar ao servidor.'))
}

function atualizarDados() {
    if (!senhaAdminCorreta()) return // bloqueia sem a senha do admin

    var id = document.getElementById('identificador').value
    var cpf = document.getElementById('identificadorCPF').value
    var nome = document.getElementById('nome').value.trim()
    var sobrenome = document.getElementById('sobrenome').value.trim()
    var email = document.getElementById('email').value.trim()
    var senhaNova = document.getElementById('senha').value
    var rua = document.getElementById('rua').value.trim()
    var cep = document.getElementById('cep').value
    var cidade = document.getElementById('cidade').value.trim()
    var estado = document.getElementById('estado').value
    var telefone = document.getElementById('telefone').value

    if (id === '') {
        alert('Busque um cliente antes de atualizar.')
        return
    }
    if (!nome || !sobrenome || !cpf || !email || !rua || !cep || !cidade || !estado || !telefone) {
        alert('Preencha todos os campos obrigatórios.')
        return
    }
    if (cpf.length !== 11 || isNaN(cpf)) {
        alert('O CPF deve ter 11 números.')
        return
    }
    if (cep.length !== 8 || isNaN(cep)) {
        alert('O CEP deve ter 8 números.')
        return
    }
    if (telefone.length < 10 || isNaN(telefone)) {
        alert('Telefone inválido. Use DDD + número, somente números.')
        return
    }
    if (!email.includes('@') || !email.includes('.')) {
        alert('Email inválido.')
        return
    }

    // Se a senha do cliente ficou em branco, mantém a atual
    var senha = senhaNova === '' ? senhaAtual : senhaNova

    fetch(`/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome, sobrenome, cpf, email, senha, rua, cep, cidade, estado, telefone
        })
    })
    .then(resposta => resposta.json())
    .then(() => {
        alert('Cliente atualizado com sucesso!')
        document.getElementById('senhaAdmin').value = ''
    })
    .catch(() => alert('Não foi possível conectar ao servidor.'))
}