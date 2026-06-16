async function listarTurmas(){
    const listaHTML = document.getElementById("lista-turmas");
    listaHTML.innerHTML = "Carregando...";

    const resposta = await fetch('http://localhost:8055/turmas', {
        method: 'GET'
    });
    const turmas = await resposta.json();
    listaHTML.innerHTML = "";

    // Verificar se a listaHTML não está vazia:
    if(turmas.length == 0){
        listaHTML.innerHTML = "<li>Lista vazia: nenhuma turma encontrada.</li>";
        return;
    }

    // Criando a listaHTML:
    let listaGerada = "";
    turmas.forEach(turma => {
        listaGerada += `
            <li>
                <strong>| ID:</strong> ${turma.id_turma} | 
                <strong> Nome:</strong> ${turma.nome_turma} |
                <strong> Período:</strong> ${turma.periodo.periodo} |
            </li>
        `;
    });
    listaHTML.innerHTML = listaGerada;
}

// --------------------------------
async function procurarTurmas(){
    const feedback = document.getElementById("turma");
    feedback.innerHTML = "Procurando...";

    // Procurar aluno pelo ID:
    const id = document.getElementById("id-turma").value;
    const API = await fetch(`http://localhost:8055/turmas/${id}`, {
        method: 'GET'
    });
    const procura = await API.json();
    feedback.innerHTML = "";

    // Verificar se a procura não está vazia:
    if(procura.length == 0 || !API.ok){
        feedback.innerHTML = "<li>Nenhuma turma com esse ID foi encontrado.</li>";
        return;
    }

    // Mostrando o aluno pesquisado:
    feedback.innerHTML = `
        <li>
            <strong>| ID:</strong> ${procura.id_turma} | 
            <strong> Nome:</strong> ${procura.nome_turma} |
            <strong> Período:</strong> ${procura.periodo.periodo} |
        </li>
    `;
}

// --------------------------------
async function salvarTurmas(modificar){
    const mensagem = document.getElementById("feedback");
    mensagem.innerHTML = "Salvando...";
    let metodoFetch = 'POST';
    let modificarURL = "";

    // Criando objeto da turma:
    const novaTurma = {
        nome_turma: document.getElementById("nome-turma").value,
        periodo: {
            id_periodo: document.getElementById("periodo").value
        }
    };
    if(modificar){
        novaTurma.id_turma = document.getElementById("id-alvo").value;
        metodoFetch = 'PUT';
        modificarURL = `/${novaTurma.id_turma}`;
    }

    // Enviando aluno para a API:
    const API = await fetch(`http://localhost:8055/turmas${modificarURL}`, {
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

// --------------------------------
async function modificarTurmas(){
    const mensagem = document.getElementById("search-feedback");
    mensagem.innerHTML = "Procurando...";

    const idTurma = document.getElementById("id-alvo").value;

    // Procurando Aluno:
    const API = await fetch(`http://localhost:8055/turmas/${idTurma}`, {
        method: 'GET'
    });
    mensagem.innerHTML = "";

    if(API.ok){
        const turma = await API.json();

        document.getElementById("nome-turma").value = turma.nome_turma;
        document.getElementById("periodo").value = turma.periodo.id_periodo;
        document.getElementById("modificar-turma").style.display = "block";
    } else{
        mensagem.innerHTML = "Turma com esse ID não encontrada!";
        return;
    }
}

// --------------------------------
async function deletarTurmas(){
    const mensagem = document.getElementById("feedback");
    mensagem.innerHTML = "Deletando...";

    // Enviando id_aluno para a API:
    const idTurma = document.getElementById("id-turma").value;
    const API = await fetch(`http://localhost:8055/turmas/${idTurma}`, {
        method: 'DELETE'
    });

    // Verificar ação e mostrar feedback:
    if(API.ok){
        mensagem.innerHTML = "Turma apagada!";
    } else{
        mensagem.innerHTML = "Erro ao apagar a turma!";
    }
}