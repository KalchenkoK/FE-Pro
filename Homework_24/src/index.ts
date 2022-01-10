import { TodoController } from "./app/todo/todo.controller";

const bootstrap = () => {
  const argv = process.argv[2];

  new TodoController().handle(argv);
};

bootstrap();
