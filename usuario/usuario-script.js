async function usuario(){
    const nome = document.getElementById("nome-usuario");
    const cpf = document.getElementById("cpf-usuario");
    const email = document.getElementById("email-usuario");
    const nascimento = document.getElementById("nascimento-usuario");
}

function logout(){
    localStorage.setItem("usuarioId", null);
    localStorage.setItem("tipoUsuario", null);

    window.location.replace("../index.html");
}