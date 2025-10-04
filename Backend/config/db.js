const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

const connectDB = async () => {
  try {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST ,
        dialect: "mysql",
        logging: false,
      }
    );

    await sequelize.authenticate();
    console.log("---> MySQL Database Connected Successfully!");
    return sequelize;
  } catch (error) {
    console.error("---> MySQL Connection Failed:", error.message);
    process.exit(1); 
  }
};

module.exports = { connectDB, sequelize };
