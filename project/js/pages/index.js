$(document).ready(function() {
    $("#loginForm").submit(function(e) {
        e.preventDefault();
        userController.login(
            $("#loginFormEmail").val(),
            $("#loginFormPassword").val(),
            function () {
                window.location.href = "home.html"
            },
            function (msg) {
                alert(msg);
            }
        )
    })
});

$(document).on("setDevDataBase", function () {
    //#region Setting Controllers

    faqController = new FaqController(faqTable);
    passoController = new PassoController(passosTable);

    //#endregion

    let countError = 0;

    $.getJSON("../js/devDataBase.json", function (data) {

        //Criando Usuários
        let createUsers = function () {
            data.TbUser.forEach(function (val) {
                userController.create(val, function () { }, function () { countError++; })
            });
        }

        userController.readAll(
            function (list) {
                if (list.length == 0) {
                    createUsers();
                }
            },
            function (msg) {
                alert("Erro na criação do banco de dados de teste: " + msg)
            });


        //Criando Itens da FAQ
        let createFaq = function () {
            data.TbFaq.forEach(function (val) {
                faqController.create(val, function () { }, function () { countError++; })
            });
        }

        faqController.readAll(
            function (list) {
                if (list.length == 0) {
                    createFaq();
                }
            },
            function (msg) {
                alert("Erro na criação do banco de dados de teste: " + msg)
            });
        
        //Criando Passos
        let createPassos = function () {
            data.TbPasso.forEach(function (val) {
                passoController.create(val, function () { }, function () { countError++; })
            });
        }

        passoController.readAll(
            function (list) {
                if (list.length == 0) {
                    createPassos();
                }
            },
            function (msg) {
                alert("Erro na criação do banco de dados de teste: " + msg)
            });
    }
    ).done(function () {
        if (countError > 0) {
            alert("Ocorreram " + countError + " erro(s) na criação do banco de dados de teste");
        }
    });
});