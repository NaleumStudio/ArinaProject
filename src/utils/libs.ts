import dotenv from 'dotenv';
dotenv.config({ path: './process.env' });

export const ENV = {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN ?? '',
    CLIENT_ID: process.env.CLIENT_ID ?? '',
} as const;

export type EnvKeys = keyof typeof ENV;
export type EnvValues = (typeof ENV)[EnvKeys];

export const EMOJI = {
    EM0001: '<:EM0001:1395218716547088576>',
    EM0002: '<:EM0002:1395231073314537543>',
    EM0003: '<:EM0003:1396008672177422468>', //bar
    EM0004: '<:EM0004:1396008686048247879>',
    EM0005: '<:EM0005:1396008700988231730>',
    EM0006: '<:EM0006:1396008721166893218>',
    EM0007: '<:EM0007:1396017836421415004>',
    EM0008: '<:EM0008:1396008758513238116>',
    EM0009: '<:EM0009:1396008773738299444>',
    EM0010: '<:EM0010:1396022408741130240>',
} as const;

export function getProgressBar(p: number) {
    p = Math.min(Math.max(p, 0), 100);
    const pa = Math.round(p / 10);

    let pb: string;

    switch (pa) {
        case 0:
            pb = EMOJI.EM0006+EMOJI.EM0007.repeat(8)+EMOJI.EM0008; break;
        case 1:
            pb = EMOJI.EM0010+EMOJI.EM0007.repeat(8)+EMOJI.EM0008; break;
        case 10:
            pb = EMOJI.EM0003+EMOJI.EM0004.repeat(8)+EMOJI.EM0005; break;
        default:
            pb = EMOJI.EM0003+EMOJI.EM0004.repeat(pa - 2)+EMOJI.EM0009+EMOJI.EM0007.repeat(9 - pa)+EMOJI.EM0008;
    }

    return pb;
}