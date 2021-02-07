var botao = document.querySelector("#buscar-paciente");

botao.addEventListener("click", function(){
    console.log("clicou");

    var xhr = new XMLHttpRequest();

    xhr.open("GET","https://api-pacientes.herokuapp.com/pacientes");
    xhr.addEventListener("load", function(){
    var erroAjax = document.querySelector("#erro-ajax");
        if(xhr.status == 200){
        erroAjax.classList.add("invisivel");
        var pacientes = JSON.parse(xhr.responseText)
        
        pacientes.forEach(function(paciente){
            adicionaPacientesNaTabela(paciente);    
    
        });
    }else{
        console.log(xhr.status);
        console.log(xhr.responseText);
        
        erroAjax.classList.remove("invisivel");
    }
        
    })
    xhr.send();
})