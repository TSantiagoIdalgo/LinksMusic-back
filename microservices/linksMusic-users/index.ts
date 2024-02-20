import server from './src/server';
import sequelize from './src/database/db';
import './src/database/associations/association';

const PORT = process.env.PORT || 3001;

async function main () {
  try {
    await sequelize.sync({ force: false });
    console.log('Connection USER has been established successfully');
    server.listen(PORT, () => {
      console.log('The server is listening on the port:', PORT);
    });
  } catch (error) {
    console.log({ error: error.message });
  }
}
main();