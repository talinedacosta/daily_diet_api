import { config } from 'dotenv';
import { z } from 'zod';

//it will check if the environment is test, if is, it will set path .env.test to the dotenv configuration
if (process.env.NODE_ENV === 'test') {
    config({ path: '.env.test ' })
} else {
    config();
}

//it will configurate the schema of environmant variables
const envSchema = z.object({
    NODE_ENV: z.enum(['test', 'development', 'production']),
    DATABASE_URL: z.string(),
    DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
    PORT: z.coerce.number().default(3000),
    ACCESS_TOKEN_SECRET: z.string()
});

//it will validate the environment variables
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.log('Invalid environment variables.', _env.error.format());
    throw new Error('Invalid environmet variables.');
}

//it will export the environment variables to the application use with all the validations already set
export const env = _env.data;