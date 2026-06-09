// Pegando dados salvos localmente:
const usuarioId = localStorage.getItem("usuarioId");
const tipoUsuario = localStorage.getItem("tipoUsuario");

// Verificando usuário salvo para então mostrar a página:
window.onload = async function userVerification(){
    const main = document.getElementById("main");
    const errorMain = document.getElementById("error-main");
    const feedback = document.getElementById("feedback-message");
    console.log("id: " + usuarioId);

    feedback.innerHTML = "Carregando...";

    // Verificando se existe o usuário com o ID salvo:
    if(tipoUsuario == "professor"){ // Procurando na lista de professores:
        const API = await fetch(`http://localhost:8055/professor/${usuarioId}`, {
            method: "GET"
        });

        if(API.ok){
            usuario = await API.json();
            if(usuario.adm){ // Verificando se não é ADM, para liberar as funções de ADM
                const admElements = document.querySelectorAll(".adm-feature");
                admElements.forEach(element => {
                    element.style.display = "block";
                });
            }
            main.style.display = "block";
            errorMain.style.display = "none";
        }
    } else if(tipoUsuario == "aluno"){ // Procurando na lista de alunos:
        const API = await fetch(`http://localhost:8055/alunos/${usuarioId}`, {
            method: "GET"
        });

        if(API.ok){
            main.style.display = "block";
            errorMain.style.display = "none";
        } else{ // Mostrando erro se não encontrar o usuário:
            feedback.innerHTML = "ERRO: usuário não encontrado!";
        }
    }
}