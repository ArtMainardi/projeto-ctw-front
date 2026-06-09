let usuarioId, ;

async function logar(){
    const message = document.getElementById("feedback-message");
    message.innerHTML = "Carregando..";

    // Criando o objeto de requisição:
    const login = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    // Enviando requisição para a API:
    const API = await fetch('http://localhost:8055/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    });

    // Retornando mensagem:
    const resposta = await API.json();
    message.innerHTML = resposta.message;

    if(resposta.tipoUsuario != null){
        window.location.replace("./tela-inicial/telaInicial.html");

    }
}