const SENHA_LOJA = "1234" // senha da loja para ver os clientes

function carregarCadastrados() {
    fetch('/pessoas')
        .then(resposta => resposta.json())
        .then(dados => {
            var tabelaCorpo = document.getElementById('tabela-corpo')
            tabelaCorpo.innerHTML = ''

            dados.forEach(objeto => {
                var tr = document.createElement('tr')
                var valores = [
                    objeto.nome + ' ' + objeto.sobrenome,
                    objeto.cpf,
                    objeto.email,
                    objeto.cidade + '/' + objeto.estado,
                    objeto.telefone
                ]

                valores.forEach(v => {
                    var td = document.createElement('td')
                    td.innerText = v
                    tr.appendChild(td)
                })

                tabelaCorpo.appendChild(tr)
            })
        })
}

function mostrarCadastrados() {
    document.getElementById('areaLogin').style.display = 'none'
    document.getElementById('areaCadastrados').style.display = 'flex'
    carregarCadastrados() // só busca depois de autenticado
}

function verificarSenha() {
    var senha = document.getElementById('senhaLoja').value

    if (senha === SENHA_LOJA) {
        sessionStorage.setItem('autenticado', 'true')
        mostrarCadastrados()
    } else {
        document.getElementById('erro').innerText = 'Senha incorreta!'
    }
}

function sair() {
    sessionStorage.removeItem('autenticado')
    location.reload()
}

document.getElementById('senhaLoja').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        verificarSenha()
    }
})

if (sessionStorage.getItem('autenticado') === 'true') {
    mostrarCadastrados()
}