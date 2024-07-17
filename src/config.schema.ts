
import * as Joi from '@hapi/joi';

export type ConfigData = {
    ENV: string
    DB_HOST: string
    DB_PORT: number
    DB_USERNAME: string
    DB_PASSWORD: string
    DB_DATABASE: string
    REDIS_HOST: string
    REDOS_PORT: number
    DEFAULT_CACHE_TTL: number
    REDIS_COMMANDER_HOST: number
  };

export const ConfigValidationSchema = Joi.object({
    ENV: Joi.string(),
    DB_HOST: Joi.string(),
    DB_PORT: Joi.number().default(5432),
    DB_USERNAME: Joi.string(),
    DB_PASSWORD: Joi.string(),
    DB_DATABASE: Joi.string(),
    REDIS_HOST: Joi.string(),
    REDOS_PORT: Joi.number(),
    DEFAULT_CACHE_TTL: Joi.number(),
    REDIS_COMMANDER_HOST: Joi.string(),
})
