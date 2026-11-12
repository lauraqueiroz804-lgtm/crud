function deletarDados() {
    if (!senhaAdminCorreta()) return // bloqueia sem a senha do admin

    var cpf = document.getElementById('identificadorCPF').value

    fetch('')
        .then(response => response.json())
        .then(data => {
            const pessoa = data.find(pessoa => pessoa.cpf === cpf)

            if (pessoa) {
                fetch(`/${pessoa.id}`, {
                    method: 'DELETE'
                })
                .then(() => {
                    alert('Cliente removido com sucesso!')
                    document.getElementById('identificadorCPF').value = ''
                    document.getElementById('senhaAdmin').value = ''
                })
            } else {
                alert('CPF não encontrado.')
            }
        })
        .catch(() => alert('Não foi possível conectar ao servidor.'))
}