//<summary>
//Create a new model instance
//</summary>
function Comunidade(idUser, titulo, descricao, url) {
    this.idUser = idUser;
    this.titulo = titulo;
    this.descricao = descricao;
    this.url = url;
}

class ComunidadeController {

    constructor(table) {
        this.table = table;

        DAL.readAll(
            table,
            function (data) {
                if (!Array.isArray(data))
                    DAL.setTable(table);
            },
            function () {
                DAL.setTable(table);
            }
        );
    }

    isValid(model, trueCallback, falseCallback) {
        let result =
            typeof model.id == 'undefined' ? true : (typeof model.id == 'number' && model.id > 0) &&
                model.idUser && typeof model.idUser == 'number' &&
                model.titulo && typeof model.titulo == 'string' &&
                model.descricao && typeof model.descricao == 'string' &&
                model.url && typeof model.url == 'string';

        //Business Logic
        if (result) {
            if (model.titulo.length < 6)
                falseCallback("\"Título\" não pode ser menor que 6 caracteres");
            else {
                this.filter(
                    function (e) { return e.titulo == model.titulo && e.id != model.id },
                    function (list) {
                        if (list.length > 0)
                            falseCallback("Passo já existente");
                        else
                            trueCallback();
                    },
                    function () {
                        trueCallback("Erro ao buscar dados pela DAL");
                    });
            }
        }
        else falseCallback("Modelo de dados não é compativel");
    }

    create(model, success, error) {
        let table = this.table;
        this.isValid(
            model,
            function () {
                DAL.create(table, model, success, error);
            },
            error);
    }

    update(model, success, error) {
        let table = this.table;
        this.isValid(
            model,
            function () {
                DAL.update(table, model, success, error);
            },
            error);
    }

    read(id, success, error) {
        DAL.read(this.table, id, success, error);
    }

    readAll(success, error) {
        DAL.readAll(this.table, success, error);
    }

    filter(func, success, error) {
        DAL.filter(this.table, func, success, error);
    }

    delete(id, success, error) {
        DAL.delete(this.table, id, success, error);
    }

    //#region Special methods

    createComunidadeCard(model, imagem) {
        let result =
            ('<div class="col-12 card insta">' +
                '<div class="card-header">' +
                '{titulo}' +
                '</div>' +
                '<div class="card-body">' +
                '<a href="{url}">' +
                '<img src="{imagem}" class="imgins">' +
                '</a>' +
                '<p>' +
                '{descricao}' +
                '<small>Local: <a href="{url}">{url}</a></small>' +
                '</p>' +
                '</div>' +
                '</div>')
                .replace(/{titulo}/g, model.titulo)
                .replace(/{url}/g, model.url)
                .replace(/{descricao}/g, model.descricao)
                .replace(/{imagem}/g, model.imagem);

        return result;
    }

    //#endregion
}