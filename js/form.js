
var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function (event){
    event.preventDefault();


    var form = document.querySelector("#formulario");
    paciente = obtemPacienteDoFormulario(form);

    var erros = validaPaciente(paciente);
    if(erros.length > 0){
        exibeErros(erros);
        return;
    }
    
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    adicionaPacientesNaTabela(paciente);

    form.reset();
    
})

function obtemPacienteDoFormulario(form){

    var paciente = {
        nome: form.nome.value,
        altura: form.altura.value,
        peso: form.peso.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTrPaciente(paciente){

    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTdPaciente(paciente.nome, 'info-nome'));
    pacienteTr.appendChild(montaTdPaciente(paciente.peso, 'info-peso'));
    pacienteTr.appendChild(montaTdPaciente(paciente.altura, 'info-altura'));
    pacienteTr.appendChild(montaTdPaciente(paciente.gordura, 'info-gordura'));
    pacienteTr.appendChild(montaTdPaciente(paciente.imc, 'info-imc'));

    return pacienteTr;
}

function montaTdPaciente(dado, classe){
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;

    return td
}


function validaPaciente(paciente){
    var erros = [];

    if(paciente.nome.length == 0) erros.push("O nome não pode estar vazio!");

    if(paciente.gordura.length == 0) erros.push("A gordura não pode estar vazia!");

    if(paciente.peso.length == 0){ 
        erros.push("O peso não pode estar vazio!");
    }else if(!validaPeso(paciente.peso)){ 
        erros.push("O peso é inválido!");
    }

    if(paciente.altura.length == 0){
        erros.push("A altura não pode estar vazia!");
    }else if(!validaAltura(paciente.altura)){ 
        erros.push("A altura é inválida!");
    }

    return erros;
}

function adicionaPacientesNaTabela(paciente){
    var pacienteTr = montaTrPaciente(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function exibeErros(erros){
    var ul = document.querySelector("#mensagens-erro");

    ul.innerHTML = "";
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });

}