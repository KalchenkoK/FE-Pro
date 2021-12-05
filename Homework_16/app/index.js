const elFabric = (el, { attrs = {}, className, children = [] } = {}) => {
  //
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

const Header = () => {
  return elFabric("header", {
    children: ["<h1>User Archive</h1>"],
  });
};

const Main = () => {
  return elFabric('main', {
    children: [SectionFirst(), SectionSecond(), SectionThird()],
  });
};
const SectionFirst = () => {
  return elFabric("section", {
        children: [
          elFabric("ul", {
            children: [
              elFabric("li", {
                children: [
                  elFabric("span", {
                    children: [
                      elFabric("a", {
                        attrs: {
                          href: "/",
                        },
                        children: [elFabric(["Home"])],
                      }),
                    ],
                  }),
                  elFabric("span", {
                    children: [
                      elFabric("a", {
                        attrs: {
                          href: "/about",
                        },
                        children: [elFabric([" About Page"])],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })   
};
const SectionSecond = () => {
  return elFabric("section", {
    children: [
      elFabric("div", {
        children: [
          elFabric("span", {
            children: [elFabric([DATE.formatDate()])],
          }),
        ],
      }),
    ],
  });
};
const SectionThird = () => {
  return elFabric("section", {
    children: [
      elFabric("div", {
        children: [
          elFabric("ul", {
            children: [
              elFabric("li", {
                children: [
                  elFabric(["User: "]),
                  elFabric('span',{
                    children:[
                        elFabric([getUserInfo.firstName() + " "])
                        
                    ]
                }),
                elFabric('span',{
                    children:[
                        elFabric([getUserInfo.lastName() + " - "])
                    ]
                }),
                elFabric('span',{
                    children:[
                        elFabric([getUserInfo.age() + ' '])
                    ]
                }),
                elFabric(['years old;']),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

const root = document.getElementById("root");
root.append(Header(), Main());
