import { BadRequestError } from "../../utils/error.util";
import { Logger } from "../../utils/logger.util";
import { InputService } from "./id.service";

export const IdController = class IdController {
  constructor(
    private readonly service = new InputService(),
    private readonly logger = new Logger()
  ) {}

  async handle(argv: string): Promise<void> {
    try {
      const [option, value] = argv.split("=");
      switch (option) {
        case "show":
          if (value) {
            const id = await this.service.handleGet(value);

            this.logger.notify("Oper is found:", id);
            break;
          }

          const IDs = await this.service.handleList();
          this.logger.notify("All Oper:", IDs);

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
          await this.service.handleRes(argum, operation);
              this.logger.notify("Added successfully");          
          break;
      }      
    } catch (error) {
      this.logger.warn(error as Error);
    }
  }
};
