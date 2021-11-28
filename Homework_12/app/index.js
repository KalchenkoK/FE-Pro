const minYear = 1900;
let date = new Date();
const minMonth = 1;
const maxMonth = 12;
const minName = 1;
const maxName = 20;
const minSecondName = 1;
const maxSecondName = 30;
const minDay = 1;

const zeroUser = "There are no users to delete";
const validationMessageMaxYear = `Put max YEAR of birth to show: only numbers, min: ${minYear}, max: ${date.getFullYear()}`;
const operation_message_write = `Enter operation: 
0 - Add user,
1 - Delete user,
2 - Find user,
3 - Filtered user,
4 - Show adult users,
5 - Show a slice of users,
6 - Is archive empty?,
7 - How many users are in the archive`;
const operation_message_read = `Enter operation: 
0 - Find user,
1 - Filtered user,
2 - Show adult users,
3 - Show a slice of users,
4 - Is archive empty?,
5 - How many users are in the archive`;

const AUTHENTICATION = (() => {
  const accounts = archiveFabric();

  accounts.add(new AdminAccount("admin@admin.com", "admin"));  

  const validateEmail = function (input) {
    return input.indexOf("@") < 0;
  };
  const validatePassword = function (input) {
    return input.length < 5;
  };

  return {
    signIn() {
      const email = STDIN.getOperationInput("Enter your email", validateEmail);
      const password = STDIN.getOperationInput(
        "Enter your password",
        validatePassword
      );

      const findUserEmail = function (login) {
        return login.email === email;
      };
      const finded = accounts.find(findUserEmail);

      if (email === "admin@admin.com" && password === "admin") {
        return new AdminAccount(email, password);
      } else if (finded) {
        return new GuestAccount(email, password);
      } else {
        let confirmed = confirm(
          "Your are not registered. Do you want to retry?"
        );
        if (confirmed) {
          return this.signIn();
        } else {
          let confirmedRegister = confirm("Do you want to register");
          if (confirmedRegister) {
            return this.signUp();
          } else {
            APPLICATION.end();
          }
        }
      }
    },
    signUp() {
      const email = STDIN.getOperationInput("Enter your email", validateEmail);
      const password = STDIN.getOperationInput(
        "Enter your password",
        validatePassword
      );
      const findUserEmail = function (login) {
        return login.email === email;
      };
      const finded = accounts.find(findUserEmail);
      if (finded) {
        let confirmed = confirm("Wrong email. Do you want to retry?");
        if (confirmed) {
          this.signUp();
        }
        APPLICATION.end();
      }
      return new GuestAccount(email, password);
    },
  };
})();

const APPLICATION = (() => {
  const archive = archiveFabric();
  account: null;

  const validationOperationName = function (input) {
    input = input ?? "";
    return input.trim().length < minName || input.trim().length > maxName;
  };

  return {
    run() {
      this.account = AUTHENTICATION.signIn();
      const permissions = this.account.permissions;
      const writePermission = permissions.includes("WRITE");
      if (writePermission) {

      do {
        const operationIndex = this.getOperation();
        this.doOperation_write(operationIndex);
      } while (confirm("Do you want to retry?"));
      this.end();}
      do {
        const operationIndex = this.getOperation();
        debugger
        this.doOperation_read(operationIndex);
      } while (confirm("Do you want to retry?"));
      this.end();
    },

    doOperation_write(index) {
      const [, methodName] = OPERATIONS_WRITE[index];
      if (typeof this[methodName] === "function") {
        this[methodName]();
      }
    },
    doOperation_read(index) {
      const [, methodName] = OPERATIONS_READ[index];
      if (typeof this[methodName] === "function") {
        this[methodName]();
      }
    },

    getOperation() {
      const permissions = this.account.permissions;

      OPERATIONS_WRITE = [
        ["Add user", "addUser"],
        ["Delete user", "delete"],
        ["Find user", "find"],
        ["Filtered user", "filter"],
        ["Show adult users", "each"],
        ["Show users slice", "take"],
        ["Is archive empty?", "isEmpty"],
        ["How many users in archive", "count"],
      ];
      OPERATIONS_READ = [
        ["Find user", "find"],
        ["Filtered user", "filter"],
        ["Show adult users", "each"],
        ["Show users slice", "take"],
        ["Is archive empty?", "isEmpty"],
        ["How many users in archive", "count"],
      ];
      coerceAgeToNumber = (beforeAssign) => {
        return Number(beforeAssign);
      };

      const writePermission = permissions.includes("WRITE");
      if (writePermission) {
        const availables = Object.keys(OPERATIONS_WRITE);
        const validationOperation = (input) => {
          return !availables.includes(input);
        };
        return STDIN.getOperationInput(
          operation_message_write,
          validationOperation
        );
      }
      const availables = Object.keys(OPERATIONS_READ);
      const validationOperation = (input) => {
        return !availables.includes(input);
      };
      return STDIN.getOperationInput(
        operation_message_read,
        validationOperation
      );
    },

    end() {
      console.log("Bye bye");
    },

    addUser() {
      const validationMessageName = `Put your first name:  min: ${minName}, max: ${maxName}`;
      const firstName = STDIN.getOperationInput(
        validationMessageName,
        validationOperationName
      );

      const validationMessageSecondName = `Put your second name:  min: ${minSecondName}, max: ${maxSecondName}`;
      const validationOperationSurname = function (input) {
        input = input ?? "";
        return (
          input.trim().length < minSecondName ||
          input.trim().length > maxSecondName
        );
      };
      const lastName = STDIN.getOperationInput(
        validationMessageSecondName,
        validationOperationSurname
      );

      const validationOperationYear = function (input) {
        return isNaN(input) || input < minYear || input > date.getFullYear();
      };

      const validationMessageYear = `Put your YEAR of birthday: only numbers, min: ${minYear}, max: ${date.getFullYear()}`;

      const year = STDIN.getOperationInput(
        validationMessageYear,
        validationOperationYear,
        coerceAgeToNumber
      );

      const validationMessageMonth = `Put your MONTH of birthday: only numbers, min: ${minMonth}, max: ${maxMonth}`;
      const validationOperationMonth = function (input) {
        return isNaN(input) || input < minMonth || input > maxMonth;
      };
      const month = STDIN.getOperationInput(
        validationMessageMonth,
        validationOperationMonth,
        coerceAgeToNumber
      );

      let leap = DATE.getLeap(year);
      let maxDay = DATE.getMaxDay(year, month);

      const validationMessageDay = `Put your DAY of birthday: only numbers, min: ${minDay}, max: ${maxDay}`;
      const validationOperationDay = function (input) {
        return isNaN(input) || input < minDay || input > maxDay;
      };
      const day = STDIN.getOperationInput(
        validationMessageDay,
        validationOperationDay,
        coerceAgeToNumber
      );

      const user = usersFabric(firstName, lastName, year, month, day);

      archive.add(user);
    },
    delete() {
      const validationOperationDelete = function (input) {
        return isNaN(input) || input < 0 || input >= archive.count();
      };

      if (archive.isEmpty() === true) {
        console.log("Archive is empty");
        return;
      } else {
        const deleteUser = STDIN.getOperationInput(
          `Enter index for delete from 0 to ${archive.count() - 1}`,
          validationOperationDelete,
          coerceAgeToNumber
        );
        const deleted = archive.delete(deleteUser);
        console.log(
          `You deleted user ${deleted.fullName}, ${deleted.age} years old`
        );
      }
    },
    find() {
      const findUserMessage = "Enter name of user you want find";
      const findUser = STDIN.getOperationInput(
        findUserMessage,
        validationOperationName
      );

      const findUserName = function (user) {
        return user.firstName === findUser;
      };
      const finded = archive.find(findUserName);

      if (finded) {
        console.log(
          `You find user: ${finded.fullName}, ${finded.age} years old`
        );
      } else {
        console.log(`There is no user whith first name ${findUser}`);
      }
    },
    filter() {
      const filterUserMessage = "Enter name of users you want filtered";
      const filterUser = STDIN.getOperationInput(
        filterUserMessage,
        validationOperationName
      );

      const filterUserName = function (user) {
        return user.firstName === filterUser;
      };
      const filtered = archive.filter(filterUserName);

      if (filtered.length > 0) {
        for (let i of filtered) {
          console.log(`Your filtered users: ${i.fullName} ${i.age} years old`);
        }
      } else {
        console.log(`There are no users whith name ${filterUser}`);
      }
    },
    each() {
      if (archive.count() <= 0) {
        console.log("Archive is empty");
      } else {
        const adultUser = function (user) {
          if (user.age >= 18) {
            return console.log(`${user.fullName}, ${user.age} years old`);
          } else {
            console.log(`${user.fullName} - younger 18`);
          }
        };
        const eachUsers = archive.each(adultUser);
      }
    },
    take() {
      const takeMessage1 = `Enter first index of users, from 0 to ${archive.count()}`;
      const takeMessage2 = `Enter second index of users, from 0 to ${archive.count()}`;
      const validationOperationTake = function (input) {
        return isNaN(input) || input < 0 || input > archive.count();
      };

      const firstIndex = STDIN.getOperationInput(
        takeMessage1,
        validationOperationTake,
        coerceAgeToNumber
      );

      const secondIndex = STDIN.getOperationInput(
        takeMessage2,
        validationOperationTake,
        coerceAgeToNumber
      );

      const takeUser = archive.take(firstIndex, secondIndex);
      if (takeUser.length > 0) {
        for (let i of takeUser) {
          console.log(`Your sliced users: ${i.fullName} ${i.age} years old`);
        }
      } else {
        console.log(`There are no users whith this index`);
      }
    },
    isEmpty() {
      const status = archive.isEmpty();

      if (status === true) {
        console.log("Archive is empty");
      } else {
        console.log(`No, arhive is not empty`);
      }
    },
    count() {
      const countUser = archive.count();
      console.log(`There are ${countUser} user(s) in the archive`);
    },
  };
})();
APPLICATION.run();
