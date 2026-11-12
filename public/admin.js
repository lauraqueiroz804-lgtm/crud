const SENHA_ADMIN = "admin123" // troque pela senha do administrador

function senhaAdminCorreta() {
    var digitada = document.getElementById('senhaAdmin').value

    if (digitada !== SENHA_ADMIN) {
        alert('Senha do administrador incorreta.')
        return false
    }
    return true
}