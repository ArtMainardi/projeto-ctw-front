// --------------------------------
async function salvarProfessores(modificar){
    const mensagem = document.getElementById("feedback");
    mensagem.innerHTML = "Salvando...";
    let metodoFetch = 'POST';
    let modificarURL = "";

    // Criando objeto da turma:
    const novaTurma = {
        nome_turma: document.getElementById("nome-turma").value,
        periodo: document.getElementById("periodo").value
    };
    if(modificar){
        novaTurma.id_turma = document.getElementById("id-alvo").value;
        metodoFetch = 'PUT';
        modificarURL = `/${novaTurma.id_professor}`;
    }

    // Enviando aluno para a API:
    const API = await fetch(`http://localhost:8055/professor${modificarURL}`, {
        method: `${metodoFetch}`,
        headers: {
            'Content-Type': 'application/json' // Avisa o Spring que estamos enviando um JSON
        },
        body: JSON.stringify(novaTurma)
    });

    // Verificar ação e mostrar feedback:
    if(API.ok){
        const turma = await API.json();
        mensagem.innerHTML = "Turma salva!";
    } else{
        mensagem.innerHTML = "Erro ao salvar turma!";
    }
}