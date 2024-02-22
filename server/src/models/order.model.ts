import { DataTypes } from "sequelize";
import sequelize from "./database";

const Order = sequelize.define("Order", {
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Brand is required",
      },
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Name is required",
      },
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: "Quantity must be a integer",
      },
      greaterThanZero(value: number) {
        if (value <= 0) {
          throw new Error("Quantity must be greater than zero");
        }
      },
    },
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      greaterThanZero(value: number) {
        if (value <= 0) {
          throw new Error("Price must be greater than zero");
        }
      },
    },
  },
});

export default Order;
