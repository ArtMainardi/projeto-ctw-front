window.addEventListener("load", async function carregarTurmas(){
    // Criar lista de turmas de acordo com o curso:
    const listaMI = document.querySelector(".lista-mi");

    const API = await fetch("http://localhost:8055/turmas", {
        method: "GET"
    });
    const turmas = await API.json();

    if(turmas.length != 0){
        let listaGeradaMI = "";
        for(let cont = 0; cont < turmas.length; cont++){
            if(turmas[cont].nome_turma.toLowerCase().includes("mi")){
                listaGeradaMI += `
                    <p class="item-lista" data-id="${turmas[cont].id_turma}" style="cursor: pointer;">
                        ${turmas[cont].nome_turma}  |  <strong>Período:</strong> ${turmas[cont].periodo.periodo}
                    </p>
                `;
            }
        }
        listaGeradaMI !== "" ? listaMI.innerHTML = listaGeradaMI : listaMI.innerHTML = "Nenhuma turma desse curso encontrada!";
    } else {
        document.querySelector('.lista-cursos').innerHTML = "Nenhuma turma salva!";
    }


    // Listener para abrir as páginas de detalhes:
    document.querySelectorAll(".item-lista").forEach((item) => {
    item.addEventListener("click", () => {
        console.log("SSSS")
        window.location.href = `./turmaDetalhes.html?id=${item.dataset.id}`;
    });
});
});