const STDIN = (function () {
  return {
    getOperationInput(message, validation, coerce) {
      let input;
      do {
        const beforeAssign = prompt(message);
        input = coerce ? coerce(beforeAssign) : beforeAssign;
      } while (validation(input));
      return input;
    },
  };
})();

const DATE = (function () {
  return {
    getMaxDay(year, month) {
      let maxDay =
        month === 4 || month === 6 || month === 9 || month === 11 ? 30 : 31;

      if (this.getLeap(year) && month === 2) {
        maxDay = 29;
      } else if (!this.getLeap(year) && month === 2) {
        maxDay = 28;
      }
      return maxDay;
    },

    getLeap(year) {
      let moduleOf400 = year % 400 === 0;
      let moduleOf100 = year % 100 === 0;
      let moduleOf4 = year % 4 === 0;

      let leap = moduleOf400 || (!moduleOf100 && moduleOf4) ? true : false;
      return leap;
    },
    formatDate() {
      const date = new Date();
      const dd = date.getDate();
      if (dd < 10) {
        dd = "0" + dd;
      }
      const mm = date.getMonth() + 1;
      if (mm < 10) {
        mm = "0" + mm;
      }
      const yy = date.getFullYear();

      let hh = date.getHours();
      if (hh < 10) {
        hh = "0" + hh;
      }

      let mn = date.getMinutes();
      if (mn < 10) {
        mn = "0" + mn;
      }
      const formatedDate = dd + "/" + mm + "/" + yy + " " + hh + ":" + mn + ";";
      return formatedDate;
    },
    getMonthByText() {
      const date = new Date();
      const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const mm = month[date.getMonth()];
      return mm;
    },
  };
})();

const minName = 5;
const maxName = 20;
const minYear = 1900;
const minMonth = 1;
const maxMonth = 12;
const minDay = 1;
const usersFabric = (function (firstName, lastName, year, month, day) {
  return {
    firstName,
    lastName,
    year,
    month,
    day,
    get fullName() {
      return `${firstName} ${lastName}`;
    },

    ageUser() {
      const date = new Date();
      const validationMessageYear = `Put your YEAR of birthday: only numbers, min: ${minYear}, max: ${date.getFullYear()}`;
      const validationOperationYear = function (input) {
        return isNaN(input) || input < minYear || input > date.getFullYear();
      };
      const coerceAgeToNumber = function (beforeAssign) {
        return Number(beforeAssign);
      };
      const year = STDIN.getOperationInput(
        validationMessageYear,
        validationOperationYear,
        coerceAgeToNumber
      );
      const validationOperationMonth = function (input) {
        return isNaN(input) || input < minMonth || input > maxMonth;
      };
      const validationOperationDay = function (input) {
        return isNaN(input) || input < minDay || input > maxDay;
      };

      const validationMessageMonth = `Put your MONTH of birthday: only numbers, min: ${minMonth}, max: ${maxMonth}`;

      const month = STDIN.getOperationInput(
        validationMessageMonth,
        validationOperationMonth,
        coerceAgeToNumber
      );
      let maxDay = DATE.getMaxDay(year, month);
      let leap = DATE.getLeap(year);
      const validationMessageDay = `Put your DAY of birthday: only numbers, min: ${minDay}, max: ${maxDay}`;
      const day = STDIN.getOperationInput(
        validationMessageDay,
        validationOperationDay,
        coerceAgeToNumber
      );
      const ageUser = function () {
        const birthDate = new Date();
        birthDate.setFullYear(year);
        birthDate.setMonth(month - 1);
        birthDate.setDate(day);
        let age = date.getFullYear() - birthDate.getFullYear();
        let m = date.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && date.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };
      return ageUser();
    },
  };
})();

const validationMessageName = `Put your first name:  min: ${minName}, max: ${maxName}`;
const coerceAgeToNumber = function (beforeAssign) {
  return Number(beforeAssign);
};
const validationOperationName = function (input) {
  input = input ?? "";
  return input.trim().length < minName || input.trim().length > maxName;
};
const validationMessageLastName = `Put your last name:  min: ${minName}, max: ${maxName}`;

const someFunctions = {
  firstName() {
    return STDIN.getOperationInput(
      validationMessageName,
      validationOperationName
    );
  },
  lastName() {
    return STDIN.getOperationInput(
      validationMessageLastName,
      validationOperationName
    );
  },

  age() {
    return usersFabric.ageUser();
  },
  date() {
    return DATE.formatDate();
  },
};

class Timestamp {
  constructor() {
    this.date = new Date();
  }
  toISOString() {
    let dd = this.date.getDate();
    if (dd < 10) {
      dd = "0" + dd;
    }
    const mm = this.date.getMonth() + 1;
    if (mm < 10) {
      mm = "0" + mm;
    }
    const yy = this.date.getFullYear();

    let hh = this.date.getHours();
    if (hh < 10) {
      hh = "0" + hh;
    }

    let mn = this.date.getMinutes();
    if (mn < 10) {
      mn = "0" + mn;
    }
    let ss = this.date.getSeconds();
    if (ss < 10) {
      ss = "0" + ss;
    }
    let mmm = this.date.getMilliseconds();
    if (mmm < 100) {
      mmm = "0" + mmm;
    }

    const ISOString =
      yy + "-" + mm + "-" + dd + " " + hh + ":" + mn + ":" + ss + "." + mmm;
    return ISOString;
  }
  toString() {
    let dd = this.date.getDate();

    if (dd < 10) {
      dd = "0" + dd;
    }

    const mm = DATE.getMonthByText();

    const yy = this.date.getFullYear();

    let hh = this.date.getHours();
    if (hh < 10) {
      hh = "0" + hh;
    }

    let mn = this.date.getMinutes();
    if (mn < 10) {
      mn = "0" + mn;
    }
    const toString = yy + " " + mm + " " + dd + " at " + hh + ":" + mn;
    return toString;
  }
}
let time = new Timestamp();

class App {
  constructor() {
    this.list = document.querySelector(".list");
    this.timestamp = document.querySelector(".timestamp");
  }

  /* Перерисовывает каждый item */
  render() {
    for (const listItem of this.list.children) {
      listItem.classList.add("list__item--ready");
      for (const el of listItem.children) {
        const dataF = el.dataset.field;
        if (dataF in someFunctions) {          
          el.innerHTML = someFunctions[dataF]();
        }
      }
    }
    app.update();
  }
  /* Обновляет timestamp на дату последнего обновления после каждого render*/
  update() {
    this.timestamp.innerHTML = time.toString();
    this.timestamp.setAttribute("datetime", time.toISOString());
  }
}
let app = new App();

app.render();
