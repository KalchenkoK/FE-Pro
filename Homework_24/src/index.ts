import { IdController } from "./app/id/id.controller";

const bootstrap = () => {
  const argv = process.argv[2];

  new IdController().handle(argv);
};

bootstrap();
