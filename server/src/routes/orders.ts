import express, { Request, Response, NextFunction } from "express";
import Order from "../models/order.model";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.json(
    await Order.findAll({
      order: [["id", "DESC"]],
    }),
  );
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json(
      await Order.create({
        brand: req.body.brand,
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
      }),
    );
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Order.update(
      {
        brand: req.body.brand,
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
      },
      {
        where: { id: req.params.id },
      },
    );
    res.json(await Order.findByPk(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Order.destroy({
        where: { id: req.params.id },
      });
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
