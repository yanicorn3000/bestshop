const productsQuantity = document.querySelector("#products");
const ordersEstimate = document.querySelector("#orders");
const packageInput = document.querySelector("#package");
const terminalCheckbox = document.querySelector("#terminal");
const accountingCheckbox = document.querySelector("#accounting");

const listAll = Array.from(document.querySelectorAll(".list__item"));
const inputsAll = Array.from(document.querySelectorAll(".form__input"));
const selectDropdown = document.querySelector(".select__dropdown");
const summaryTotalPrice = document.querySelector(".summary__total");
const summaryText = document.querySelector(".calc__summary_text");

const dataList = [
  {
    name: "products",
    value: undefined,
    element: productsQuantity,
    validate: function (value) {
      const valueToNumber = Number(value);
      if (Number.isNaN(valueToNumber)) {
        return "Wartość musi być liczbą";
      }
      return;
    },
  },
  {
    name: "orders",
    value: undefined,
    element: ordersEstimate,
    validate: function (value) {
      const valueToNumber = Number(value);
      if (Number.isNaN(valueToNumber)) {
        return "Wartość musi być liczbą";
      }
      return;
    },
  },
  {
    name: "package",
    value: undefined,
    element: packageInput,
  },

  {
    name: "accounting",
    value: false,
    element: accountingCheckbox,
  },

  {
    name: "terminal",
    value: undefined,
    element: terminalCheckbox,
  },
];

dataList.forEach((item) => {
  if (item.element.tagName === "INPUT") {
    item.element.addEventListener("change", function (e) {
      if (item.element.type === "checkbox") {
        item.value = item.element.checked;
      } else {
        const isInvalid = item.validate(item.element.value);
        if (!isInvalid) {
          item.value = Number(item.element.value);
        } else {
          alert(isInvalid);
        }
      }
      render();
    });
  } else {
    item.element
      .querySelector(".select__input")
      .addEventListener("click", function (e) {
        item.element.classList.toggle("open");
      });

    Array.from(selectDropdown.querySelectorAll("li")).forEach(function (li) {
      li.addEventListener("click", function (e) {
        const value = li.innerHTML;
        const label = li.innerHTML;

        item.element.querySelector(".select__input").innerHTML = label;
        item.value = value;
        item.element.classList.remove("open");
        render();
      });
    });
  }
});

function getListElementByDataId(id) {
  return listAll.find(function (el) {
    return el.getAttribute("data-id") === id;
  });
}

function calcPrice(value) {
  let multiply = value * 0.5;
  return multiply;
}

function render() {
  summaryText.style.display = "flex";
  summaryTotalPrice.style.display = "none";
  const totalPrice = summaryTotalPrice.querySelector(".total__price");

  dataList.forEach(function (item) {
    const listItem = getListElementByDataId(item.name);
    const itemCalc = listItem.querySelector(".item__calc");
    const itemPrice = listItem.querySelector(".item__price");
    const itemTotal = calcPrice(item.value);

    if (item.value) {
      listItem.style.display = "flex";
      summaryText.style.display = "none";

      if (typeof item.value === "number") {
        itemCalc.innerHTML = `${item.value} * $0.5`;
        itemPrice.innerHTML = `$${itemTotal}`;
      } else if (typeof item.value === "string") {
        itemCalc.innerHTML = item.value;

        if (item.value === "Basic") {
          itemPrice.innerHTML = "$12";
        }

        if (item.value === "Professional") {
          itemPrice.innerHTML = "$20";
        }

        if (item.value === "Premium") {
          itemPrice.innerHTML = "$35";
        }
      }
      if (typeof item.value === "boolean" && item.name === "accounting") {
        itemPrice.innerHTML = "$20";
      } else if (typeof item.value === "boolean" && item.name === "terminal") {
        itemPrice.innerHTML = "$5";
      }
    } else {
      listItem.style.display = "none";
    }
  });

  const totalPriceValue = dataList.reduce(function (accumulator, item) {
    if (item.value) {
      if (typeof item.value === "number") {
        accumulator += calcPrice(item.value);
      } else if (typeof item.value === "string") {
        if (item.value === "Basic") {
          accumulator += 12;
        }

        if (item.value === "Professional") {
          accumulator += 20;
        }

        if (item.value === "Premium") {
          accumulator += 35;
        }
      }
      if (typeof item.value === "boolean" && item.name === "accounting") {
        accumulator += 20;
      } else if (typeof item.value === "boolean" && item.name === "terminal") {
        accumulator += 5;
      }
    }

    return accumulator;
  }, 0);

  if (totalPriceValue) {
    summaryTotalPrice.style.display = "flex";
    totalPrice.innerHTML = `$${totalPriceValue}`;
  }
}
