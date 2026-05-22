async function listarAlunos(){
    const listaHTML = document.getElementById("lista-alunos");
    listaHTML.innerHTML = "Carregando...";

    const resposta = await fetch('http://localhost:8055/alunos', {
        method: 'GET'
    });
    const alunos = await resposta.json();
    console.log("Dados recebidos: \n\n" + alunos);
    listaHTML.innerHTML = "";

    // Verificar se a listaHTML não está vazia:
    if(alunos.length == 0){
        listaHTML.innerHTML = "<li>listaHTML vazia: nenhum aluno encontrado.</li>"
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