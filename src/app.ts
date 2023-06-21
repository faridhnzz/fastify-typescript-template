import 'dotenv/config';
import Fastify, { FastifyInstance } from 'fastify';
import Youch from 'youch';

const app: FastifyInstance = Fastify({
  logger: true,
  trustProxy: true,
  connectionTimeout: 1000,
  ignoreTrailingSlash: true,
});

app.register(import('@fastify/under-pressure'), {
  exposeStatusRoute: {
    routeOpts: {
      logLevel: 'silent',
    },
    url: '/alive',
  },
});

app.setErrorHandler(async function (err, req, reply) {
  if (process.env.NODE_ENV === 'development') {
    const youch = new Youch(err, req.raw);
    const html = await youch.toHTML();
    reply.type('text/html');
    return html;
  }

  reply.code(500);
  return '500. Internal Server Error';
});

app.setNotFoundHandler(async function (req, reply) {
  reply.code(404);
  return '404. Page Not Found';
});

app.register(import('./routes/root'));

export default app;
