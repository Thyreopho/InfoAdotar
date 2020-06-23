

//#region Tables Keys

const userTable = "TbUser";
const faqTable = "TbFaq";
const passosTable = "TbPasso";
const userPassosTable = "TbUserPasso";

//#endregion

const userSessionKey = "UserSession";

//#region PublicVariables

var loggedUser;

//#region Controllers

var userController;
var faqController;
var passoController;
var userPassoController;

//#endregion

//#endregion

$(document).ready(function () {

    //#region Setting Controllers

    userController = new UserController(userTable, userSessionKey);

    //#endregion

    //Verify if the current page is not the login page
    if (!window.location.pathname.endsWith("index.html")) {

        if (userController.isLoggedIn()) {
            userLoggedEnvironment();
        } else {
            window.location.href = "index.html";
        }
    }
    else {
        userController.logout();
        $(document).trigger("setDevDataBase");
    }
});

function userLoggedEnvironment() {

    //#region Setting Controllers

    faqController = new FaqController(faqTable);
    passoController = new PassoController(passosTable);
    userPassoController = new UserPassoController(userPassosTable);

    //#endregion

    loggedUser = userController.getLoggedUser();

    $("#pageHeader > .menu-toggle").click(function () {
        $('#menu').animate({ width: 'toggle' });
    });

    $("#profileName").text(loggedUser.nome.split(" ")[0]);

    $(document).trigger("userLogged");
}