const iteratorOdd = {
  items: ["hello", 1, 0, null, "world", "baz", { foo: "bar" }, Infinity, NaN],
  current: -1,
  next() {
    return {
      value: this.items[(this.current = this.current + 2)],

      done: this.current > this.items.length - 1,
    };
  },

  [Symbol.iterator]() {
    return this;
  },
};

for (const el of iteratorOdd) {
  console.log(el);
}

const iteratorEven = {
  items: ["hello", 1, 0, null, "world", "baz", { foo: "bar" }, Infinity, NaN],
  current: -2,
  next() {
    return {
      value: this.items[(this.current = this.current + 2)],

      done: this.current > this.items.length - 1,
    };
  },

  [Symbol.iterator]() {
    return this;
  },
};

for (const el of iteratorEven) {
  console.log(el);
}

const generateLeap = function* generateLeap() {
  let counterMin = 1900;
  let interval = 1;
  let maxCounter = new Date().getFullYear();

  while (counterMin < maxCounter) {
    let moduleOf400 = counterMin % 400 === 0;
    let moduleOf100 = counterMin % 100 === 0;
    let moduleOf4 = counterMin % 4 === 0;

    let leap = moduleOf400 || (!moduleOf100 && moduleOf4) ? true : false;

    if (leap) {
      yield counterMin;
    }
    counterMin += interval;
  }
};
const counterMin = generateLeap();
console.log(counterMin.next().value);
console.log(counterMin.next().value);
console.log(counterMin.next().value);
console.log(counterMin.next().value);
console.log(counterMin.next().value);
console.log(counterMin.next().value);
console.log(counterMin.next().value);
console.log(counterMin.next().value);

const generateCounter = function* generateCounter() {
  let counter = 0;
  let interval = 1;

  while (true) {
    let newInterval = yield (counter += interval);

    if (newInterval) {
      interval = newInterval;
    }
  }
};
const counter = generateCounter();
console.log(counter.next().value);
console.log(counter.next().value);
console.log(counter.next().value);
console.log(counter.next(10).value);
console.log(counter.next().value);
console.log(counter.next().value);
console.log(counter.next().value);
console.log(counter.next().value);
console.log(counter.next(100).value);
console.log(counter.next().value);
