import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

    PORT_HOST: get('PORT').required().asPortNumber(),

    DB_HOST: get('MONGO_URL').required().asString(),
    DB_NAME: get('MONGO_BD_NAME').required().asString(),

    JWT_SEED: get('JWT_SEED').required().asString(),

    MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),

}