function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const root = document.getElementById("root");

const elFabric = (el, { attrs = {}, className, children = [] } = {}) => {
  let element;

  switch (typeof el) {
    case "object":
      element = el;
      break;
    case "function":
      element = el();
      break;
    default:
      element = document.createElement(el);
      break;
  }
  if (className) {
    element.className = className;
  }
  for (const attrKey of Object.getOwnPropertyNames(attrs)) {
    element.setAttribute(attrKey, attrs[attrKey]);
  }
  for (const child of children) {
    switch (typeof child) {
      case "string":
        element.insertAdjacentHTML("afterbegin", child);
        break;

      default:
        element.append(child);
        break;
    }
  }
  return element;
};

const Main = () => {
  return elFabric("div", {
    className: "field",
    children: [
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `1`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
      elFabric("div", {
        className: "field__item",
        attrs: {
          "data-type": `${getRandomIntInclusive(0, 1)}`,
        },
      }),
    ],
  });
};
root.append(Main());
const a = document.querySelectorAll(".field__item");
const div = document.getElementById("text");
const bombsCount = div.firstElementChild;
const openCount = div.lastElementChild;
let bombCounter = 0;
let openCounter = 0;
openCount.innerHTML = `Disarmed: ${openCounter}`;
bombsCount.innerHTML = `Bombs: ${bombCounter}`;
for (const e of a) {
  if (e.dataset.type === "1") {
    bombsCount.innerHTML = `Bombs: ${++bombCounter}`;
  }
}
const messageFail = document.querySelector(".message");
const button = document.querySelector(".restart");
const field = root.querySelector(".field");
const messageWin = document.querySelector(".message--success");

const handleClick = (event) => {
  if (event.target.dataset.type === "1") {
    event.target.dataset.type = 3;
    root.hidden = true;

    button.hidden = false;
    messageFail.classList.add("message--failed");
    messageFail.hidden = false;
    return;
  }
  if (event.target.dataset.type === "0") {
    event.target.dataset.type = 2;
    openCount.innerHTML = `Disarmed: ${++openCounter}`;

    if (openCounter === 25 - bombCounter) {
      root.hidden = true;
      button.hidden = false;
      messageWin.hidden = false;
    }
  }
};
const handleRestart = (event) => {
  if (event.target === button) {
    root.innerHTML = "";
    root.append(Main());
    messageFail.hidden = true;
    button.hidden = true;
    root.hidden = false;
    messageWin.hidden = true;
    openCounter = 0;
    bombCounter = 0;
    openCount.innerHTML = `Disarmed: ${openCounter}`;
    for (const e of a) {
      if (e.dataset.type === "1") {
        bombsCount.innerHTML = `Bombs: ${++bombCounter}`;
      }
    }
  }
};

root.addEventListener("click", handleClick);
button.addEventListener("click", handleRestart);
