import { BadRequestError } from "../../utils/error.util";
import { Logger } from "../../utils/logger.util";
import { TodoService } from "./todo.service";

export const TodoController = class TodoController {
  constructor(
    private readonly service = new TodoService(),
    private readonly logger = new Logger()
  ) {}

  async handle(argv: string): Promise<void> {
    try {
      const [option, value] = argv.split("=");
      switch (option) {
        case "show":
          if (value) {
            const todo = await this.service.handleGet(value);

            this.logger.notify("Todo is found:", todo);
            break;
          }

          const todos = await this.service.handleList();
          this.logger.notify("All todos:", todos);

          break;

        case "clear": {
          await this.service.handleClear();
          this.logger.notify("Deleted successfully");
          break;
        }
        default:
          throw new BadRequestError();
      
        case "f":
          const [operation, argum] = value.split("(");
          await this.service.handleSum(argum, operation);
              this.logger.notify("Success");          
          break;
      }      
    } catch (error) {
      this.logger.warn(error as Error);
    }
  }
};
