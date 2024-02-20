import server from './src/server';
import sequelize from './src/database/db';
import './src/database/associations/associations';

const PORT = process.env.PORT || 3003;

async function main () {
  try {
    await sequelize.sync({ force: false });
    console.log('Connection PLAYLIST has been established successfully');
    server.listen(PORT, () => {
      console.log('The server is listening on the port:', PORT);
    });
  } catch (error) {
    console.log({ error: error.message });
  }
}
main();