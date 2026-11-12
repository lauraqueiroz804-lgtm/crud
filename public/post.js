function enviarDados() {
    var nome = document.getElementById('nome').value.trim()
    var sobrenome = document.getElementById('sobrenome').value.trim()
    var cpf = document.getElementById('identificadorCPF').value
    var email = document.getElementById('email').value.trim()
    var senha = document.getElementById('senha').value
    var rua = document.getElementById('rua').value.trim()
    var cep = document.getElementById('cep').value
    var cidade = document.getElementById('cidade').value.trim()
    var estado = document.getElementById('estado').value
    var telefone = document.getElementById('telefone').value

    if (!nome || !sobrenome || !cpf || !email || !senha || !rua || !cep || !cidade || !estado || !telefone) {
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

    // Impede CPF duplicado
    fetch('/pessoas')
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.find(pessoa => pessoa.cpf === cpf)) {
                alert('Este CPF já está cadastrado.')
                return
            }

            fetch('/pessoas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome, sobrenome, cpf, email, senha, rua, cep, cidade, estado, telefone
                })
            })
            .then(resposta => resposta.json())
            .then(() => {
                alert('Cadastro realizado! Agora você já pode fazer login.')
                document.querySelectorAll('input').forEach(i => i.value = '')
                document.getElementById('estado').value = ''
            })
        })
        .catch(() => alert('Não foi possível conectar ao servidor.'))
}