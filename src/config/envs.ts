import 'dotenv/config';
import env from 'env-var';

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  PUBLIC_PATH: env.get('PUBLIC_PATH').default('public').asString(),
  POSTGRES_URL: env.get('POSTGRES_URL').required().asString(),
  JWT_SEED: env.get('JWT_SEED').required().asString(),

  SENDGRID_API_KEY: env.get('SENDGRID_API_KEY').required().asString(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asString(),
  SEND_EMAIL: env.get('SEND_EMAIL').default('false').asBool(),

  FRONTEND_URL: env.get('FRONTEND_URL').required().asString(),
  ACCEPTED_ORIGINS: env.get('ACCEPTED_ORIGINS').default('http://localhost:4200').asArray(','),
};