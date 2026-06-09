window.onload = async function admVerification(){
    if(tipoUsuario == "professor"){
        const API = await fetch(`http://localhost:8055/professor/${usuarioId}`, {
            method: "GET"
        });
        usuario = await API.json();
    }
}