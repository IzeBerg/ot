import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://pg:pg@localhost:5432/orders",
  {
    logging: false,
  },
);

export default sequelize;
