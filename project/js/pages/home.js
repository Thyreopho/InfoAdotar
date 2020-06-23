
$.getJSON("../js/devDataBase.json", function (data) {
let tela = document.getElementById("fArea");
let content="";
data=data.TbFaq;
for(let i=0;i<3;i++)
{ 
    content=content+
    `
    <div style="margin:30px 30px" class="card">
        <div class="card-header" id="heading${i}">
            <h2 class="mb-0">
                <button class="btn  btn-block text-left" type="button" data-toggle="collapse"
                    data-target="#C${i}" aria-expanded="true" aria-controls="C1">
                    ${data[i].titulo}
                </button>
            </h2>
        </div>
        <div id="C${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#fArea">
            <div class="card-body fbody">
            ${data[i].texto}
                </div>
            </div>
        </div>
    `
}
tela.innerHTML=content;
}).done();