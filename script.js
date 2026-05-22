async function listarAlunos(){
    const listaHTML = document.getElementById("lista-alunos");
    listaHTML.innerHTML = "Carregando...";

    const resposta = await fetch('http://localhost:8055/alunos', {
        method: 'GET'
    });
    const alunos = await resposta.json();
    listaHTML.innerHTML = "";

    // Verificar se a listaHTML não está vazia:
    if(alunos.length == 0){
        listaHTML.innerHTML = "<li>Lista vazia: nenhum aluno encontrado.</li>"
        return;
    }

    // Criando a listaHTML:
    let listaGerada = "";
    alunos.forEach(aluno => {
        listaGerada += `
            <li>
                <strong>| ID:</strong> ${aluno.id_aluno} | 
                <strong>Nome:</strong> ${aluno.nome_aluno} | 
                <strong>Matrícula:</strong> ${aluno.matricula_aluno} | 
                <strong>Data de nascimento:</strong> ${aluno.data_nascimento_aluno} | 
                <strong>CPF:</strong> ${aluno.cpf_aluno} | 
                <strong>Email:</strong> ${aluno.email_aluno} |
            </li>
        `;
    });
    listaHTML.innerHTML = listaGerada;
}

async function salvarAlunos(){
    const mensagem = document.getElementById("feedback-message");
    mensagem.innerHTML = "Salvando...";

    // Criando objeto do aluno:
    const novoAluno = {
        nome_aluno: document.getElementById("nome-aluno").value,
        matricula_aluno: document.getElementById("matricula-aluno").value,
        data_nascimento_aluno: document.getElementById("nascimento-aluno").value,
        cpf_aluno: document.getElementById("cpf-aluno").value,
        email_aluno: document.getElementById("email-aluno").value,
        senha_aluno: document.getElementById("senha-aluno").value
    }

    // Enviando aluno para a API:
    const API = await fetch('http://localhost:8055/alunos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Avisa o Spring que estamos enviando um JSON
        },
        body: JSON.stringify(novoAluno)
    });

    // Verificar ação e mostrar feedback:
    if(API.ok){
        const aluno = await API.json();
        mensagem.innerHTML = "Aluno salvo!";
    } else{
        mensagem.innerHTML = "Erro ao salvar o aluno!";
    }
}

async function deletarAlunos(){
    const mensagem = document.getElementById("feedback-message");
    mensagem.innerHTML = "Deletando...";

    // Enviando id_aluno para a API:
    const idAluno = document.getElementById("id-aluno").value;
    const API = await fetch(`http://localhost:8055/alunos/${idAluno}`, {
        method: 'DELETE'
    });

    // Verificar ação e mostrar feedback:
    if(API.ok){
        mensagem.innerHTML = "Aluno apagado!";
    } else{
        mensagem.innerHTML = "Erro ao apagar o aluno!";
    }
}