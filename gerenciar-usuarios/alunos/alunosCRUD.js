// Pegando dados salvos localmente:
const usuarioId = localStorage.getItem("usuarioId");
const tipoUsuario = localStorage.getItem("tipoUsuario");

// Verificando usuário salvo para então mostrar a página:
window.onload = async function userVerification(){
    const main = document.getElementById("main");
    const errorMain = document.getElementById("error-main");
    const feedback = document.getElementById("feedback-message");

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
            feedback.innerHTML = "ERRO: esse usuário não tem permissão para acessar essa página!";
        } else{ // Mostrando erro se não encontrar o usuário:
            feedback.innerHTML = "ERRO: usuário não encontrado!";
        }
    }
}


/* === CONEXÕES COM A API ===*/
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
        listaHTML.innerHTML = "<li>Lista vazia: nenhum aluno encontrado.</li>";
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
                <strong>Data de criação:</strong> ${aluno.data_criacao_aluno} |
            </li>
        `;
    });
    listaHTML.innerHTML = listaGerada;
}

// --------------------------------
async function procurarAlunos(){
    const feedback = document.getElementById("aluno");
    feedback.innerHTML = "Procurando...";

    // Procurar aluno pelo ID:
    const id = document.getElementById("id-aluno").value;
    const API = await fetch(`http://localhost:8055/alunos/${id}`, {
        method: 'GET'
    });
    const procura = await API.json();
    feedback.innerHTML = "";

    // Verificar se a procura não está vazia:
    if(procura.length == 0 || !API.ok){
        feedback.innerHTML = "<li>Nenhum aluno com esse ID foi encontrado.</li>";
        return;
    }

    // Mostrando o aluno pesquisado:
    feedback.innerHTML = `
        <li>
            <strong>| ID:</strong> ${procura.id_aluno} | 
            <strong>Nome:</strong> ${procura.nome_aluno} | 
            <strong>Matrícula:</strong> ${procura.matricula_aluno} | 
            <strong>Data de nascimento:</strong> ${procura.data_nascimento_aluno} | 
            <strong>CPF:</strong> ${procura.cpf_aluno} | 
            <strong>Email:</strong> ${procura.email_aluno} |
            <strong>Data de criação:</strong> ${procura.data_criacao_aluno} |
        </li>
    `;
}

// --------------------------------
async function salvarAlunos(modificar){
    const mensagem = document.getElementById("feedback");
    mensagem.innerHTML = "Salvando...";
    let metodoFetch = 'POST';
    let modificarURL = "";

    // Criando objeto do aluno:
    const novoAluno = {
        nome_aluno: document.getElementById("nome-aluno").value,
        matricula_aluno: document.getElementById("matricula-aluno").value,
        data_nascimento_aluno: document.getElementById("nascimento-aluno").value,
        cpf_aluno: document.getElementById("cpf-aluno").value,
        email_aluno: document.getElementById("email-aluno").value,
        senha_aluno: document.getElementById("senha-aluno").value
    };
    if(modificar){
        novoAluno.id_aluno = document.getElementById("id-alvo").value;
        metodoFetch = 'PUT';
        modificarURL = `/${novoAluno.id_aluno}`;
    }

    // Enviando aluno para a API:
    const API = await fetch(`http://localhost:8055/alunos${modificarURL}`, {
        method: `${metodoFetch}`,
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

// --------------------------------
async function modificarAunos(){
    const mensagem = document.getElementById("search-feedback");
    mensagem.innerHTML = "Procurando...";

    const idAluno = document.getElementById("id-alvo").value;

    // Procurando Aluno:
    const API = await fetch(`http://localhost:8055/alunos/${idAluno}`, {
        method: 'GET'
    });
    mensagem.innerHTML = "";

    if(API.ok){
        const aluno = await API.json();

        document.getElementById("nome-aluno").value = aluno.nome_aluno;
        document.getElementById("matricula-aluno").value = aluno.matricula_aluno;
        document.getElementById("nascimento-aluno").value = aluno.data_nascimento_aluno;
        document.getElementById("cpf-aluno").value = aluno.cpf_aluno;
        document.getElementById("email-aluno").value = aluno.email_aluno;

        document.getElementById("modificar-aluno").style.display = "block";
    } else{
        mensagem.innerHTML = "Aluno com esse ID não encontrado!";
        return;
    }
}

// --------------------------------
async function deletarAlunos(){
    const mensagem = document.getElementById("feedback");
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