import express  from "express";
import morgan from "morgan";
import pkg from "../package.json";
import {createRoles} from './libs/initialSetup'
import productsRouter from './routes/products.routes'
import authRouter from './routes/auth.routes'
import usersRoutes from './routes/user.routes'
const app = express();
app.set('pkg',pkg);
app.use(express.json());
app.use(morgan('dev'));
createRoles();
app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
})
app.use('/api/products',productsRouter);
app.use('/api/authRoute',authRouter);
app.use('/api/users',usersRoutes);
export default app;