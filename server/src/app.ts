import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { ValidationError } from "sequelize";

var orders = require("./routes/orders");

var app = express();

app.use(express.json());
app.use("/orders", orders);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      errors: err.errors.map((e: any) => {
        return {
          message: e.message,
          type: e.type,
          path: e.path,
        };
      }),
    });
  }
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
