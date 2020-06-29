//#region Controllers
//Aqui é onde se é adicionado as variaveis 
//para acessar os dados do localstorage

var comunidadeController;

//#endregion

//Espaço que é chamado quando o susário é verificado
$(document).on("userLogged", function () {
    //#region Setting Controllers

        //Variavel comunidadeController permite o acesso aos dados da Comunidade
        //Obs: olhar js/controller/comunidadeController.js
        comunidadeController = new ComunidadeController(comunidadeTable);

    //#endregion

    //Exemplos:
        
        //Usando o comunidadeController
        comunidadeController.readAll(
            function (list) {
                for (let i = 0; i < list.length; i++) {
                    console.log(`${i + 1}ª comunidade: ${list[i].titulo}`);
                }
            },
            function () {
                console.log("Ocorreu um erro ao listar as comunidades");
            }
        );
});