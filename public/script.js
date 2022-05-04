var bot = document.getElementById("btnCadastrar");
var nome = document.getElementById("nome");
var tipo = document.getElementById("tipo");
var descricao = document.getElementById("descricao");
var altura = document.getElementById("altura");
var peso = document.getElementById("peso");
var categoria = document.getElementById("categoria");
var habilidade = document.getElementById("habilidade");
var img = document.getElementById("imagem");

const closeAlert = () => {
  const close = document.querySelector("#close-message");
  const message = document.querySelector(".message");

  close.addEventListener("click", () => {
    message.style.display = "none";
  });

  setTimeout(() => {
    message.style.display = "none";
  }, 5000);
};
closeAlert()

const viewDropdown = () =>{
  const buttons = document.querySelectorAll(".dropdown-button");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) =>{
      const content = event.path[2].children[1];

      content.classList.toggle("active")

      if(content.classList.contains("active")){
        content.style.display = "block";
      } else {
        content.style.display = "none";
      }

      content.addEventListener("mouseleave", () =>{
        content.classList.remove("active")
        if(!content.classList.contains("active")){
          content.style.display = "none";
        }
      })


    })
  })
};
viewDropdown();

function validarCampos() {
  if (
    nome.value == "" ||
    tipo.value == "" ||
    descricao.value == "" ||
    altura.value == "" ||
    peso.value == "" ||
    categoria.value == "" ||
    habilidade.value == "" ||
    img.value == ""
  ) {
    bot.disabled = true;
  } else {
    bot.disabled = false;
  }
}


