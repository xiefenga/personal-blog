import { resolve } from 'path'
import { readFile } from 'fs/promises'
import { Sequelize } from 'sequelize'
import { DBConfig } from '../types/configs'


async function connection() {
  const { database, username, password }: DBConfig = await
    JSON.parse(
      (
        await readFile(resolve(__dirname, '../db.config.json'))
      ).toString('utf-8')
    );
  const sequelize = new Sequelize({ database, username, password, dialect: 'mysql' });
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connection();

