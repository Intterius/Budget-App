const form = document.querySelector("#form");
const amount = document.getElementById("amount");
const text = document.getElementById("text");
const list = document.getElementById("list");
const balance = document.getElementById("balance");
const income = document.getElementById("money-plus");
const expense = document.getElementById("money-minus");
const container = document.querySelector(".inc-exp-container");
var balance2 = Number(balance.textContent.replace(/[^0-9]/g, ""));
var income2 = Number(income.textContent.replace(/[^0-9]/g, ""));
var expense2 = Number(expense.textContent.replace(/[^0-9]/g, ""));
var final = [];
var inc = Math.round(Math.random() * 1000000);
var exp = Math.round(Math.random() * 1000000);

if (localStorage.getItem("finalChecks") != undefined) {
  final = JSON.parse(localStorage.getItem("finalChecks"));
  balance2 = JSON.parse(localStorage.getItem("balance"));
  income2 =
    JSON.parse(localStorage.getItem("income")) != null
      ? JSON.parse(localStorage.getItem("income"))
      : 0;
  expense2 =
    JSON.parse(localStorage.getItem("expense")) != null
      ? JSON.parse(localStorage.getItem("expense"))
      : 0;
}
form.addEventListener("submit", addItem);
list.addEventListener("click", deleteItem);
function addItem(e) {
  e.preventDefault();
  var amount2 = e.target.amount.value;
  var text2 = e.target.text.value;
  if (text2 === "" || amount2 === "") {
    alert("You missed a field");
  } else {
    if (amount2[0] === "-") {
      balance2 -= Math.abs(Number(amount2));
      expense2 -= Number(amount2);
      let exp = Math.round(Math.random() * 1000000);
      final.push({ text: text2, minus: amount2, code: exp, type: "min" });
      localStorage.setItem("finalChecks", JSON.stringify(final));
      localStorage.setItem("balance", JSON.stringify(balance2));
      localStorage.setItem("expense", JSON.stringify(expense2));
      expense.innerText = `-$${expense2}`;
      if (balance2 < 0) {
        balance.innerText = `-$${String(Math.abs(balance2))}`;
      } else {
        balance.innerText = `$${String(balance2)}`;
      }
      list.innerHTML += `<li class="minus" id="${exp}">
      ${text2}  <span >-$${Math.abs(Number(amount2))}</span>
      <button class="delete-btn">x</button>
    </li>`;
    } else {
      let inc = Math.round(Math.random() * 1000000);
      income2 += Number(amount2);
      income.innerText = `$${income2}`;
      final.push({ text: text2, plus: amount2, code: inc, type: "pls" });
      balance2 = balance2 + Math.abs(Number(amount2));
      balanceS = balance2;
      localStorage.setItem("income", JSON.stringify(income2));
      localStorage.setItem("finalChecks", JSON.stringify(final));
      localStorage.setItem("balance", JSON.stringify(balance2));
      if (balance2 < 0) {
        balance.innerText = `-$${String(Math.abs(balance2))}`;
      } else {
        balance.innerText = `$${String(balance2)}`;
      }
      list.innerHTML += `<li class="plus" id="${inc}">
    ${text2} <span >$${Math.abs(Number(amount2))}</span>
    <button class="delete-btn">x</button>
  </li>`;
    }
    form.reset();
  }
}

/*function deleteItem(e) {
  if (e.target.classList.contains("delete-btn")) {
    let li = e.target.parentElement;
    list.removeChild(li);
    let val = li.textContent;
    let res = val.split(" ");
    let fin = res.filter((e) => e[0] == "$");
   let tot = (Number(fin[0].replace(/[^0-9]/g, "")));
  }
}*/
function deleteItem(e) {
  if (e.target.classList.contains("delete-btn")) {
    let li = e.target.parentElement;
    list.removeChild(li);
    let filtered = final.filter((e) => {
      return e.code != li.id;
    });
    localStorage.setItem("finalChecks", JSON.stringify(filtered));
    if (li.classList.contains("plus")) {
      let valPlus = li.textContent.split(" ").filter((e) => e[0] == "$");
      let totPlus = Number(valPlus[valPlus.length - 1].replace(/[^0-9]/g, ""));
      balance2 -= totPlus;
      income2 -= totPlus;
      localStorage.setItem("income", JSON.stringify(income2));
      localStorage.setItem("balance", JSON.stringify(balance2));
      income.innerText = `$${income2}`;
      balance.innerText = `$${String(balance2)}`;
    } else if (li.classList.contains("minus")) {
      let valMinus = li.textContent
        .split(" ")
        .filter((e) => e.indexOf("-$") >= 0);
      let res = valMinus[valMinus.length - 1];
      let tot = res.replace("-", "");
      let fin = Number(tot.replace(/[^0-9]/g, ""));
      balance2 += fin;
      expense2 -= fin;
      localStorage.setItem("expense", JSON.stringify(expense2));
      localStorage.setItem("balance", JSON.stringify(balance2));
      expense.innerText = `-$${expense2}`;
      balance.innerText = `$${String(balance2)}`;
    }
  }
}

/*
<li class="minus">
          Cash <span>-$400</span><button class="delete-btn">x</button>
        </li>
        */

document.addEventListener("DOMContentLoaded", function () {
  expense.innerText = `-$${expense2}`;
  income.innerText = `$${income2}`;
  if (balance2 < 0) {
    balance.innerText = `-$${String(Math.abs(balance2))}`;
  } else {
    balance.innerText = `$${String(balance2)}`;
  }
  if (final.length > 0) {
    for (let i = 0; i < final.length; i++) {
      if (final[i].type == "pls") {
        list.innerHTML += `<li class="plus" id="${final[i].code}">
        ${final[i].text} <span>$${final[i].plus}</span>
        <button class="delete-btn">x</button>`;
      } else if (final[i].type == "min") {
        list.innerHTML += `<li class="minus" id="${final[i].code}">
        ${final[i].text} <span>-$${Math.abs(Number(final[i].minus))}</span>
        <button class="delete-btn">x</button>`;
      }
    }
  }
});
