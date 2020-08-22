const form = document.querySelector("#form");
const amount = document.getElementById("amount");
const text = document.getElementById("text");
const list = document.getElementById("list");
const balance = document.getElementById("balance");
const income = document.getElementById("money-plus");
const expense = document.getElementById("money-minus");
const container = document.querySelector(".inc-exp-container");
const form2 = document.getElementById("inputs");
const filter = document.querySelector(".look");
var balance2 = Number(balance.textContent.replace(/[^0-9]/g, ""));
var income2 = Number(income.textContent.replace(/[^0-9]/g, ""));
var expense2 = Number(expense.textContent.replace(/[^0-9]/g, ""));
var final = [];
var inc = Math.round(Math.random() * 1000000);
var exp = Math.round(Math.random() * 1000000);
var inp1 = document.getElementById("text2");
var inp2 = document.getElementById("value2");

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
filter.addEventListener("keyup", filterItems);
function addItem(e) {
  e.preventDefault();
  var amount2 = e.target.amount.value;
  var text2 = e.target.text.value;
  if (text2 === "" || amount2 === "") {
    form.reset();
    alert("You missed a field");
  } else {
    if (amount2[0] === "-") {
      balance2 -= Math.abs(Number(amount2));
      expense2 -= Number(amount2);
      let exp = Math.round(Math.random() * 1000000);
      final.push({ text: text2, quantity: amount2, code: exp, type: "min" });
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
      <button class="delete-btn">x</button><a href="#inputs" class='edit-btn'><i class="fas fa-pencil-alt"></i></a>
    </li>`;
    } else {
      let inc = Math.round(Math.random() * 1000000);
      income2 += Number(amount2);
      income.innerText = `$${income2}`;
      final.push({ text: text2, quantity: amount2, code: inc, type: "pls" });
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
    <button class="delete-btn">x</button><a href="#inputs" class='edit-btn'><i class="fas fa-pencil-alt"></i></a>
  </li>`;
    }
    form.reset();
  }
}

function deleteItem(e) {
  if (e.target.classList.contains("delete-btn")) {
    let li = e.target.parentElement;
    list.removeChild(li);
    let filtered = final.filter((e) => {
      return e.code != li.id;
    });
    final = filtered;
    localStorage.setItem("finalChecks", JSON.stringify(final));
    if (li.classList.contains("plus")) {
      let valPlus = li.textContent.split(" ").filter((e) => e[0] == "$");
      let totPlus = Number(valPlus[valPlus.length - 1].replace(/[^0-9]/g, ""));
      balance2 -= totPlus;
      income2 -= totPlus;
      localStorage.setItem("income", JSON.stringify(income2));
      localStorage.setItem("balance", JSON.stringify(balance2));
      income.innerText = `$${income2}`;
      if (balance2 < 0) {
        balance.innerText = `-$${String(Math.abs(balance2))}`;
      } else {
        balance.innerText = `$${String(balance2)}`;
      }
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
      if (balance2 < 0) {
        balance.innerText = `-$${String(Math.abs(balance2))}`;
      } else {
        balance.innerText = `$${String(balance2)}`;
      }
    }
  }
  editItem(e);
}

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
        ${final[i].text} <span>$${final[i].quantity}</span>
        <button class="delete-btn">x</button><a href="#inputs" class='edit-btn'><i class="fas fa-pencil-alt"></i></a></li>`;
      } else if (final[i].type == "min") {
        list.innerHTML += `<li class="minus" id="${final[i].code}">
        ${final[i].text} <span>-$${Math.abs(Number(final[i].quantity))}</span>
        <button class="delete-btn">x</button><a href="#inputs" class='edit-btn'><i class="fas fa-pencil-alt"></i></a></li>`;
      }
    }
  }
});
function editItem(e) {
  let li = e.target.parentElement.parentElement;
  let active = [...document.getElementsByTagName("li")];
  active.forEach((e) => {
    if (e.classList.contains("active")) {
      e.classList.remove("active");
    }
  });
  li.classList.add("active");
  let filt = final.filter((e) => {
    return e.code == li.id;
  });
  if (e.target.classList.contains("fa-pencil-alt")) {
    inp1.value = filt[0].text;
    inp2.value = filt[0].quantity;
  }
}
window.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-pencil-alt")) {
    inp1.style.border = "1px solid black";
    inp2.style.border = "1px solid black";
  } else {
    inp1.style.cssText = `border: 1px solid #dedede;
    border-radius: 2px;`;
    inp2.style.cssText = `border: 1px solid #dedede;
    border-radius: 2px;`;
  }
});

form2.addEventListener("submit", function (e) {
  e.preventDefault();
  let li;
  let values;
  let active = [...document.getElementsByTagName("li")];
  active.forEach((e) => {
    if (e.classList.contains("active")) {
      li = e;
    }
  });
  final.map((e) => {
    if (e.code == li.id) {
      values = Math.abs(e.quantity);
    }
  });
  if (li == undefined) {
    form2.reset();
    alert("Please, choose one item from the list.");
  } else {
    if (li.classList[0] == "plus") {
      if (
        inp2.value[0] == "-" ||
        inp1.value == "" ||
        inp2.value == "" ||
        inp2.value[0] == "0"
      ) {
        alert(
          `You've probably introduced a negative number or left one of the fields empty. Since you're editing an income, please introduce a positive number`
        );
        form2.reset();
      } else {
        if (Number(inp2.value) > values) {
          balance2 += Number(inp2.value) - values;
          income2 += Number(inp2.value) - values;
        } else {
          balance2 -= values - Number(inp2.value);
          income2 -= values - Number(inp2.value);
        }
        localStorage.setItem("balance", JSON.stringify(balance2));
        localStorage.setItem("income", JSON.stringify(income2));
        income.innerText = `$${income2}`;
        if (balance2 < 0) {
          balance.innerText = `-$${String(Math.abs(balance2))}`;
        } else {
          balance.innerText = `$${String(balance2)}`;
        }
        li.innerHTML = `${inp1.value} <span>$${inp2.value}</span>
  <button class="delete-btn">x</button><a href="#inputs" class='edit-btn'><i class="fas fa-pencil-alt"></i></a>`;
        final.map((e) => {
          if (e.code == li.id) {
            e.text = inp1.value;
            e.quantity = inp2.value;
            localStorage.setItem("finalChecks", JSON.stringify(final));
          }
        });
        active.forEach((e) => {
          if (e.classList.contains("active")) {
            e.classList.remove("active");
          }
        });
        form2.reset();
      }
    }
    if (li.classList[0] == "minus") {
      if (inp2.value[0] != "-" || inp1.value == "" || inp2.value[1] == "0") {
        alert(
          `You've probably introduced a positive number or left one of the fields empty. Since you're editing an expense, please introduce a negative number`
        );
        form2.reset();
      } else {
        if (Number(Math.abs(inp2.value)) > values) {
          balance2 -= Number(Math.abs(inp2.value)) - values;
          expense2 += Number(Math.abs(inp2.value)) - values;
        } else {
          balance2 += values - Number(inp2.value);
          expense2 -= values - Number(inp2.value);
        }
        localStorage.setItem("balance", JSON.stringify(balance2));
        localStorage.setItem("expense", JSON.stringify(expense2));
        expense.innerText = `-$${expense2}`;
        if (balance2 < 0) {
          balance.innerText = `-$${String(Math.abs(balance2))}`;
        } else {
          balance.innerText = `$${String(balance2)}`;
        }
        li.innerHTML = `${inp1.value} <span>-$${Math.abs(inp2.value)}</span>
<button class="delete-btn">x</button><a href="#inputs" class='edit-btn'><i class="fas fa-pencil-alt"></i></a>`;
        final.map((e) => {
          if (e.code == li.id) {
            e.text = inp1.value;
            e.quantity = inp2.value;
            localStorage.setItem("finalChecks", JSON.stringify(final));
          }
        });
        active.forEach((e) => {
          if (e.classList.contains("active")) {
            e.classList.remove("active");
          }
        });
        form2.reset();
      }
    }
  }
});
function displayList() {
  list.innerHTML = ``;
  if (final.length > 0) {
    for (let i = 0; i < final.length; i++) {
      if (final[i].type == "pls") {
        list.innerHTML += `<li class="plus" id="${final[i].code}">
        ${final[i].text} <span>$${final[i].quantity}</span>
        <button class="delete-btn">x</button><a href="#inputs" class='edit-btn'><i class="fas fa-pencil-alt"></i></a></li>`;
      } else if (final[i].type == "min") {
        list.innerHTML += `<li class="minus" id="${final[i].code}">
        ${final[i].text} <span>-$${Math.abs(Number(final[i].quantity))}</span>
        <button class="delete-btn">x</button><a href="#inputs" class='edit-btn'><i class="fas fa-pencil-alt"></i></a></li>`;
      }
    }
  }
}
function displayIncomes() {
  list.innerHTML = ``;
  for (let i = 0; i < final.length; i++) {
    if (final[i].type == "pls") {
      list.innerHTML += `<li class="plus" id="${final[i].code}">
      ${final[i].text} <span>$${final[i].quantity}</span>
      <button class="delete-btn">x</button><a href="#inputs" class='edit-btn'><i class="fas fa-pencil-alt"></i></a></li>`;
    }
  }
}
function displayExpenses() {
  list.innerHTML = ``;
  for (let i = 0; i < final.length; i++) {
    if (final[i].type == "min") {
      list.innerHTML += `<li class="minus" id="${final[i].code}">
    ${final[i].text} <span>-$${Math.abs(Number(final[i].quantity))}</span>
    <button class="delete-btn">x</button><a href="#inputs" class='edit-btn'><i class="fas fa-pencil-alt"></i></a></li>`;
    }
  }
}
function filterItems(e) {
  let text = e.target.value.toLowerCase();
  let items = list.getElementsByTagName("li");
  Array.from(items).forEach(function (item) {
    let itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
      item.style.display = "flex";
      item.style.justifyContent = "space-between";
      final.map((e) => {
        if (item.id == e.code && item.classList.contains("plus")) {
        }
      });
    } else {
      item.style.display = "none";
    }
  });
}
