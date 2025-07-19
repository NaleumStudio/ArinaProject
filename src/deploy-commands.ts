import { REST, Routes, APIApplicationCommand } from 'discord.js';
import { ENV } from './utils/libs';
import fs from 'node:fs';
import path from 'node:path';

interface Command {
    data: {
        name: string;
        toJSON: () => APIApplicationCommand;
    };
    execute: (interaction: any) => Promise<void>;
}

function getAllCommandFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir, { withFileTypes: true });

    for (const dirent of list) {
        const fullPath = path.join(dir, dirent.name);
        if (dirent.isDirectory()) {
        results = results.concat(getAllCommandFiles(fullPath));
        } else if (dirent.isFile() && fullPath.endsWith('.ts')) {
        results.push(fullPath);
        }
    }
    return results;
}

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = getAllCommandFiles(commandsPath);

const commandMap = new Map<string, Command>();
const commandDataList: APIApplicationCommand[] = [];

for (const filePath of commandFiles) {
    const command: Command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commandMap.set(command.data.name, command);
        commandDataList.push(command.data.toJSON());
    } else {
        console.warn(`${filePath}에 data 또는 execute가 없음`);
    }
}

const rest = new REST({ version: '10' }).setToken(ENV.DISCORD_TOKEN);

(async () => {
    try {
        await rest.put(
        Routes.applicationCommands(ENV.CLIENT_ID),
        { body: commandDataList }
        );
        console.log('명령어 등록 완료:', [...commandMap.keys()].join(', '));
    } catch (error) {
        console.error('명령어 등록 중 오류:', error);
    }
})();

export { commandMap };