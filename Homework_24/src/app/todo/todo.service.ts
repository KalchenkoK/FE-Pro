import * as fs from "fs";
import { promisify } from "util";
import { v4 as uuid } from "uuid";
import { NotFoundError } from "../../utils/error.util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const FILE_PATH = "./todos.json";

class Todo {
  id: string;
  constructor(public operation: string) {
    this.id = uuid();
  }
}
type State = Todo[];
export const TodoService = class TodoService {
   async handleSum(value: string, oper: string): Promise<void>{
    const state = await this.getState();
    const [el1 , el2] = value.split(",")
    if(oper === "sum"){
      const result = Number(el1) + Number(el2[0]);
      const todo = new Todo(`${el1} + ${el2[0]} = ${result}`);
      state.push(todo);
    }
    else if(oper === "subst"){
      const result =  Number(el2[0]) + Number(el1);
      const todo = new Todo(`${el2[0]} - ${0-Number(el1)} = ${result}`);
      state.push(todo);
    }
    else if(oper === "mul"){
      const result = Number(el1) * Number(el2[0]);
      const todo = new Todo(`${el1} * ${el2[0]} = ${result}`);
      state.push(todo);
    }
    else if(oper === "div"){
      const result = Number(el1) / Number(el2[0]);
      const todo = new Todo(`${el1} / ${el2[0]} = ${result}`);
      state.push(todo);
    }
    else if(oper === "pow"){
      const result = Number(el1) ** Number(el2[0]);
      const todo = new Todo(`${el1} ** ${el2[0]} = ${result}`);
      state.push(todo);
    }     
    else{
      throw new NotFoundError();
    }
    await this.setState(state);
   
  }

  async handleGet(value: string): Promise<Todo> {
    const state = await this.getState();

    const match = state.find((todo) => todo.id === value);
    if (!match) {
      throw new NotFoundError();
    }
    return match;
  }
  async handleList(): Promise<State> {
    const state = await this.getState();
    if (state.length < 1) {
      throw new NotFoundError();
    }
    return state;
  }
  
  async handleClear(): Promise<void> {
    const state = await this.getState();
    state.length = 0
    await this.setState(state);
  }
  private async getState(): Promise<State> {
    let data = "[]";
    try {
      data = await readFile(FILE_PATH, "utf-8");
    } catch {
      await writeFile(FILE_PATH, data);
    } finally {
      return JSON.parse(data);
    }
  }

  private async setState(state: State): Promise<void> {
    try {
      await writeFile(FILE_PATH, JSON.stringify(state));
    } catch (error) {
      throw error;
    }
  }
};
