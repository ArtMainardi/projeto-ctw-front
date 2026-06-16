window.addEventListener("load", () => {
    async function carregarTurmas(){
        const listaMI = document.getElementById("lista-mi");

        const API = await fetch("http://localhost:8055/turmas", {
            method: "GET"
        });
        const turmas = await API.json();

        if(turmas.length != 0){
            let listaGeradaMI = "";
            for(let cont = 0; cont < turmas.length; cont++){
                if(turmas[cont].nome_turma.toLowerCase().includes("mi")){
                    listaGeradaMI += `<li>${turmas.nome_turma}  |  <strong>Período:</strong> ${turmas.periodo}</li>`
                }
            }
            listaGeradaMI !== "" ? listaMI.innerHTML = listaGeradaMI : listaMI.innerHTML = "Nenhuma turma desse curso encontrada!";
        }
    }
});