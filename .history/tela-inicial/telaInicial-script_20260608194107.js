window.onload = async function admVerification(){
    const main = document.getElementById("main");
    const errorMain = document.getElementById("error-main");

    // Verificando se existe o usuário com o ID salvo:
    if(tipoUsuario == "professor"){ // Procurando na lista de professores:
        const API = await fetch(`http://localhost:8055/professor/${usuarioId}`, {
            method: "GET"
        });

        if(API.ok){
            usuario = await API.json();
            if(usuarioId.adm){ // Verificando se não é ADM, para liberar as funções de ADM
                const admElements = document.querySelectorAll(".adm-feature");
                admElements.forEach(element => {
                    element.style.display = "block";
                });
            }
            main.style.display = "block";
        }
    } else if(tipoUsuario == "aluno"){ // Procurando na lista de alunos:
        const API = await fetch(`http://localhost:8055/alunos/${usuarioId}`, {
            method: "GET"
        });

        if(API.ok){
            main.style.display = "block";
            errorMain.style.display = "none";
        }
    } else{ // Mostrando erro se não encontrar o usuário:
        errorMain.innerHTML = `
            <p class="error-message">ERRO: usuário não encontrado!</p>
        `; // Modificar a classe do 
    }
}