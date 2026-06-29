window.addEventListener("load", async function() {
    const parametro = new URLSearchParams(window.location.search);
    const idTurma = parametro.get("id");

    const API = await fetch(`http://localhost:8055/turmas/${idTurma}`, {
        method: "GET"
    });
    const turma = await API.json();
    console.log(turma)

    document.getElementById("nome").innerHTML = `Turma ${turma.nome_turma}`;
    document.getElementById("id").innerHTML = `<strong>ID:</strong> ${turma.id_turma}`;
    document.getElementById("periodo").innerHTML = `<strong>Período:</strong> ${turma.periodo.periodo}`;

    document.getElementById("deletar").addEventListener("click", async function() {
        const mensagem = document.getElementById("feedback");
        let verify = confirm("Deseja continuar com esta ação?");

        if(verify){
            const API_Deletar = await fetch(`http://localhost:8055/turmas/${idTurma}`, {
                method: "DELETE"
            });

            // Verificar ação e mostrar feedback:
            if(API.ok){
                mensagem.innerHTML = "Turma apagada!";
            } else{
                mensagem.innerHTML = "Erro ao apagar a turma!";
            }
        } else {
            mensagem.innerHTML = `"Deletar Turma" foi cancelado`;
        }
    });
});