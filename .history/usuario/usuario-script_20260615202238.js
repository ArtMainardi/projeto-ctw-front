window.addEventListener("load", async function() {
    console.log("AAAA");
    // Definindo as variáveis dos elementos do HTML:
    const nome = document.getElementById("nome-usuario");
    const cpf = document.getElementById("cpf-usuario");
    const email = document.getElementById("email-usuario");
    const nascimento = document.getElementById("nascimento-usuario");
    const turma = documen.

    // Buscando o usuário no banco de dados:
    const API = await fetch(`http://localhost:8055/${tipoUsuario}/${usuarioId}`, {
        method: "GET"
    });
    const usuario = await API.json();

    // Colocando os dados do usuário nos elementos:
    nome.innerHTML = "Nome: " + usuario[`nome_${tipoUsuario}`];
    cpf.innerHTML = "CPF: " + usuario[`cpf_${tipoUsuario}`];
    email.innerHTML = "Email: " + usuario[`email_${tipoUsuario}`];
    nascimento.innerHTML = "Data de Nascimento: " + usuario[`data_nascimento_${tipoUsuario}`];
});

function logout(){
    localStorage.setItem("usuarioId", null);
    localStorage.setItem("tipoUsuario", null);

    window.location.replace("../index.html");
}