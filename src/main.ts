import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as koaJson from 'koa-json';
import * as logger from 'koa-logger';
import * as Router from 'koa-router';

const httpPort: number = parseInt(process.env.HTTP_PORT) || 3000;

const getBlocks = async (ctx: Koa.Context) => {
    ctx.body = [];
}

const getBlockByHash = async (ctx: Koa.Context) => {
  // const hash = ctx.params.hash;
  ctx.body = {};
}

const getTxById = async (ctx: Koa.Context) => {
  ctx.body = {};
}

const getAddressInfo = async (ctx: Koa.Context) => {
  ctx.body = {};
}

const getUTXOs = async (ctx: Koa.Context) => {
  ctx.body = [];
}

const getMyUTXOs = async (ctx: Koa.Context) => {
  ctx.body = [];
}

const getMyAddress = async (ctx: Koa.Context) => {
  const address = "";
  ctx.body = { address };
}

const getMyBalance = async (ctx: Koa.Context) => {
  const balance = 0;
  ctx.body = { balance };
}

const sendTx = async (ctx: Koa.Context) => {
  const tx = {};
  ctx.body = tx;
}

const mineNewBlock = async (ctx: Koa.Context) => {
  const newBlock = {};
  if (newBlock === null) {
    ctx.throw(400, 'mining fail');
  }
  ctx.body(newBlock);
}

const initServer = (port: number) => {
    const app = new Koa();
    const router = new Router();
    
    app.use(logger());
    app.use(koaBody());
    app.use(koaJson({ pretty: false, param: 'pretty' }));

    router
      .get('/blocks', getBlocks)
      .get('/block/:hash', getBlockByHash)
      .get('/tx/:id', getTxById)
      .get('/address/:address', getAddressInfo)
      .get('/utxos', getUTXOs)

      .get('/myUtxos', getMyUTXOs)
      .get('/myAddress', getMyAddress)
      .get('/myBalance', getMyBalance)

      .post('/sendTx', sendTx)
      .post('/mine', mineNewBlock);
    
    app.use(router.routes());

    app.listen(port, () => {
        console.log('Listening on: ' + port);
    });
};

initServer(httpPort);
