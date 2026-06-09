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
async function listarProfessores(){
    const listaHTML = document.getElementById("lista-professores");
    listaHTML.innerHTML = "Carregando...";

    const resposta = await fetch('http://localhost:8055/professor', {
        method: 'GET'
    });
    const professores = await resposta.json();
    listaHTML.innerHTML = "";

    // Verificar se a listaHTML não está vazia:
    if(professores.length == 0){
        listaHTML.innerHTML = "<li>Lista vazia: nenhum professor encontrado.</li>";
        return;
    }

    // Criando a listaHTML:
    let listaGerada = "";
    professores.forEach(professor => {
        listaGerada += `
            <li>
                <strong>| ID:</strong> ${professor.id_professor} | 
                <strong>Nome:</strong> ${professor.nome_professor} | 
                <strong>Cadastro:</strong> ${professor.cadastro_professor} | 
                <strong>Data de nascimento:</strong> ${professor.data_nascimento_professor} | 
                <strong>CPF:</strong> ${professor.cpf_professor} | 
                <strong>Especialidade:</strong> ${professor.especialidade_professor} | 
                <strong>Email:</strong> ${professor.email_professor} |
                <strong>Data de criação:</strong> ${professor.data_criacao_professor} |
                <strong>Tipo de usuário:</strong> ${(professor.adm ? "adm" : "professor")} |
            </li>
        `;
    });
    listaHTML.innerHTML = listaGerada;
}

// --------------------------------
async function procurarProfessores(){
    const feedback = document.getElementById("professor");
    feedback.innerHTML = "Procurando...";

    // Procurar professor pelo ID:
    const id = document.getElementById("id-professor").value;
    const API = await fetch(`http://localhost:8055/professor/${id}`, {
        method: 'GET'
    });
    const procura = await API.json();
    feedback.innerHTML = "";

    // Verificar se a procura não está vazia:
    if(procura.length == 0 || !API.ok){
        feedback.innerHTML = "<li>Nenhum professor com esse ID foi encontrado.</li>";
        return;
    }

    // Mostrando o professor pesquisado:
    feedback.innerHTML = `
        <li>
            <strong>| ID:</strong> ${procura.id_professor} | 
            <strong>Nome:</strong> ${procura.nome_professor} | 
            <strong>Cadastro:</strong> ${procura.cadastro_professor} | 
            <strong>Data de nascimento:</strong> ${procura.data_nascimento_professor} | 
            <strong>CPF:</strong> ${procura.cpf_professor} | 
            <strong>Especialidade:</strong> ${procura.especialidade_professor} | 
            <strong>Email:</strong> ${procura.email_professor} |
            <strong>Data de criação:</strong> ${procura.data_criacao_professor} |
            <strong>Tipo de usuário:</strong> ${(procura.adm ? "adm" : "professor")} |
        </li>
    `;
}

// --------------------------------
async function salvarProfessores(modificar){
    const mensagem = document.getElementById("feedback");
    mensagem.innerHTML = "Salvando...";
    let metodoFetch = 'POST';
    let modificarURL = "";

    // Criando objeto do professor:
    const novoProfessor = {
        nome_professor: document.getElementById("nome-professor").value,
        cadastro_professor: document.getElementById("cadastro-professor").value,
        data_nascimento_professor: document.getElementById("nascimento-professor").value,
        cpf_professor: document.getElementById("cpf-professor").value,
        especialidade_professor: document.getElementById("especialidade-professor").value,
        email_professor: document.getElementById("email-professor").value,
        senha_professor: document.getElementById("senha-professor").value,
        adm: (document.getElementById("adm").value == "true"),
    };
    if(modificar){
        novoProfessor.id_professor = document.getElementById("id-alvo").value;
        metodoFetch = 'PUT';
        modificarURL = `/${novoProfessor.id_professor}`;
    }

    // Enviando aluno para a API:
    const API = await fetch(`http://localhost:8055/professor${modificarURL}`, {
        method: `${metodoFetch}`,
        headers: {
            'Content-Type': 'application/json' // Avisa o Spring que estamos enviando um JSON
        },
        body: JSON.stringify(novoProfessor)
    });

    // Verificar ação e mostrar feedback:
    if(API.ok){
        const professor = await API.json();
        mensagem.innerHTML = "Professor salvo!";
    } else{
        mensagem.innerHTML = "Erro ao salvar o professor!";
    }
}

// --------------------------------
async function modificarProfessores(){
    const mensagem = document.getElementById("search-feedback");
    mensagem.innerHTML = "Procurando...";

    const idProfessor = document.getElementById("id-alvo").value;

    // Procurando Aluno:
    const API = await fetch(`http://localhost:8055/professor/${idProfessor}`, {
        method: 'GET'
    });
    mensagem.innerHTML = "";

    if(API.ok){
        const professor = await API.json();

        document.getElementById("nome-professor").value = professor.nome_professor;
        document.getElementById("cadastro-professor").value = professor.cadastro_professor;
        document.getElementById("nascimento-professor").value = professor.data_nascimento_professor;
        document.getElementById("cpf-professor").value = professor.cpf_professor;
        document.getElementById("especialidade-professor").value = professor.especialidade_professor;
        document.getElementById("email-professor").value = professor.email_professor;
        document.getElementById("senha-professor").value = professor.senha_professor;
        document.getElementById("adm").value = professor.adm;

        document.getElementById("modificar-professor").style.display = "block";
    } else{
        mensagem.innerHTML = "Professor com esse ID não encontrado!";
        return;
    }
}

// --------------------------------
async function deletarProfessores(){
    const mensagem = document.getElementById("feedback");
    mensagem.innerHTML = "Deletando...";

    // Enviando id_aluno para a API:
    const idProfessor = document.getElementById("id-professor").value;
    const API = await fetch(`http://localhost:8055/professor/${idProfessor}`, {
        method: 'DELETE'
    });

    // Verificar ação e mostrar feedback:
    if(API.ok){
        mensagem.innerHTML = "Professor apagado!";
    } else{
        mensagem.innerHTML = "Erro ao apagar o professor!";
    }
}