const form = document.getElementById("form");
const clearBtn = document.getElementById("clear");
const ul = document.getElementById("ul");
/* const saved = []; */
const names = localStorage.getItem("nomiSalvati")
  ? JSON.parse(localStorage.getItem("nomiSalvati"))
  : [];

const createList = function () {
  ul.innerHTML = "";
  names.forEach((nome) => {
    const li = document.createElement("li");
    li.innerText = nome;
    ul.appendChild(li);

    li.onclick = function () {
      const index = names.indexOf(nome);
      console.log(index);
      if (index >= 0) {
        names.splice(index, 1);
        createList();
        localStorage.setItem("nomiSalvati", JSON.stringify(names));
      }
    };
  });
};

form.onsubmit = function (e) {
  e.preventDefault();

  const inputValue = document.querySelector("input").value;
  /* console.log(inputValue); */
  names.push(inputValue);

  localStorage.setItem("nomiSalvati", JSON.stringify(names));

  /* inserimento in lista di inputValue */
  createList();
  /* resettiamo il form */
  form.reset();
};

/* creiamo una funzione per la gestione del bottone clear */
const removeNames = function () {
  localStorage.clear();
  names.length = 0;
  createList();
};

window.addEventListener("DOMContentLoaded", function () {
  createList();

  clearBtn.onclick = removeNames;
});
