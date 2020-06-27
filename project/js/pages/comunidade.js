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
});