import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import productRoutes from './handlers/product';
import orderRoutes from './handlers/order';
import userRoutes from './handlers/user';
import cors from 'cors';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

productRoutes(app);
orderRoutes(app);
userRoutes(app);

app.listen(3000, function () {
  console.log(`App started on: ${address}`);
});
