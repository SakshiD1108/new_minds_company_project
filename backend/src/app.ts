import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './utils/logger';
import { mountRoutes } from './routes/index.route';
import { connect } from "mongoose";
const PORT: number = parseInt(process.env.PORT as string) || 8000
const app: Application = express()
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
mountRoutes(app);
const init = async () => {
    connect(process.env.MONGO_URI as string)
        .then(async () => {
            logger.info('Database connected successfully');
            app.listen(PORT, () => {
                logger.info(`server start on port: ${PORT}`);
            })
        })
        .catch((error) => logger.info(error.message));
}

init().catch(err => {
    logger.info(`error on server start: ${err.message}`)
    process.exit(1)
})
