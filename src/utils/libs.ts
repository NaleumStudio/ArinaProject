import dotenv from 'dotenv';
dotenv.config({ path: './process.env' });

export const ENV = {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN ?? '',
    CLIENT_ID: process.env.CLIENT_ID ?? '',
} as const;

export type EnvKeys = keyof typeof ENV;
export type EnvValues = (typeof ENV)[EnvKeys];

export const EMOJI = {
    EM001: '<:EM0001:1395218716547088576>',
    EM002: '<:EM002:1395231073314537543>',
} as const;