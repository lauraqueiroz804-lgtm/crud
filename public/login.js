function entrar() {
    var cpf = document.getElementById('cpfLogin').value
    var senha = document.getElementById('senha').value

    if (cpf === '' || senha === '') {
        document.getElementById('erro').innerText = 'Preencha o CPF e a senha.'
        return
    }

    fetch('/pessoas')
        .then(resposta => resposta.json())
        .then(dados => {
            var cliente = dados.find(pessoa => pessoa.cpf === cpf && pessoa.senha === senha)

            if (cliente) {
                sessionStorage.setItem('clienteNome', cliente.nome)
                window.location.href = 'pagina.html'
            } else {
                document.getElementById('erro').innerText = 'CPF ou senha incorretos!'
            }
        })
        .catch(() => {
            document.getElementById('erro').innerText = 'Não foi possível conectar ao servidor.'
        })
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        entrar()
    }
})