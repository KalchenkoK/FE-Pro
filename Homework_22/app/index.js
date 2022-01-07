const btn = document.getElementById("btn");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
const url = new URL("https://jsonplaceholder.typicode.com/users/1/todos");
const request = (method, url, body) => {
  const headers = new Headers({
    "Content-type": "application/json; charset=UTF-8",
  });
  return fetch(url, {
    method,
    body: body ? JSON.stringify(body) : body,
    headers,
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let data;
    if (response.headers.get("content-type").includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return data;
  });
};
const getData = async () => {
  try {    
    const data = await request("GET", url);
    for (const el of data) {
      if (el.id <= 10) {
        add(el);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const add = (data) => {
  const delBtn = document.createElement("button");
  delBtn.innerHTML = " X ";
  delBtn.addEventListener("click", deleteBTN);
  const li = document.createElement("li");
  li.innerHTML = data.title;
  ul.append(li);
  li.append(delBtn);
};

const sendPost = async () => {
  try {
    const data = await request("POST", url, {
      fakeId: new Date().valueOf(),
      title: input.value,
      completed: false,
    });
    add(data);

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
getData();

const deleteBTN = async (event) => {
  try {
    const id = "1" //Сделал с 1 id чтобы была возможность удалять и добавленные пользователем элементы
    const url = new URL(`https://jsonplaceholder.typicode.com/todos/${id}`);
    
    const data = await request("DELETE", url);
    const deleteEl = event.target;
    console.log(data);
    deleteEl.parentElement.remove();
  } catch (error) {
    console.error(error);
  }
};
btn.addEventListener("click", sendPost);
