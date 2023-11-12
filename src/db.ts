import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv-safe';

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbHost= process.env.DB_HOST as string;
const dbUsername = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD as string;

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  logging: true,
});

export const Customer = sequelize.define('Customer', {
  rep: DataTypes.STRING,
  clientName: DataTypes.STRING,
  date: DataTypes.INTEGER,
  companyName: DataTypes.STRING,
  phone: DataTypes.INTEGER,
  email: DataTypes.STRING,
  vin: DataTypes.STRING,
  model: DataTypes.STRING,
  service: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  total: DataTypes.FLOAT,
  invoiceNumber: DataTypes.INTEGER,
  paymentMethod: DataTypes.STRING,
  notes: DataTypes.STRING
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    return Customer.sync()
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;