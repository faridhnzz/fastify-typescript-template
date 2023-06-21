import 'dotenv/config';
import app from './app';

const { HOST = 'localhost', PORT = 5500 }: any = process.env;
const start = async () => {
  try {
    await app.ready();

    console.info(`NODE_ENV:`, process.env.NODE_ENV);
    console.info(
      `⚡️[server]: Process ${process.pid} is listening on http://${HOST}:${PORT}\n`,
    );
    await app.listen({ host: HOST, port: PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
