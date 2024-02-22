import sequelize from "./models/database";
import app from "./app";

const port = process.env.PORT || 3000;

// todo: in production there's should be migrations
sequelize.sync().then(() => {
  console.log("Database synced");

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
