window.onload = async function admVerification(){
    if(tipoUsuario == "professor"){
        const API = await fetch(`http://localhost:8055/professor/${usuarioId}`, {
            method: "GET"
        });

        if(API.ok){
            usuario = await API.json();
            if(usuarioId.adm){
                const admElements = document.querySelectorAll(".")
            }
        }
    }
}