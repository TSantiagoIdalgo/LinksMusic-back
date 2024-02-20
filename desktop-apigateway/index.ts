import Server from './src/server';
import { typeDefs } from './src/schemas/schema';
import { resolvers } from './src/resolvers/resolver';


(async function main() {
  try {
    await Server(typeDefs, resolvers);
    console.log('Connection has been established successfully.');
  } catch (error: any) {
    console.log({ error: error.message });
  }
})();