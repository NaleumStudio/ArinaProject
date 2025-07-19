import { Client, Events, GatewayIntentBits, ActivityType, Interaction, ChatInputCommandInteraction } from 'discord.js';
import {commandMap } from './deploy-commands';
import { ENV } from './utils/libs';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient: typeof client) => {
	console.log(`Logged in as ${readyClient.user?.tag}`);
	let i = 0;
	const activities = [
		() => client.user?.setActivity('/도움말 | 아리나봇'),
		() => client.user?.setActivity(`서버 ${client.guilds.cache.size}개 관리`, { type: ActivityType.Playing }),
		() => client.user?.setActivity('일반 던전', { type: ActivityType.Competing }),
	];

	setInterval(() => {
		activities[i % activities.length]();
		i++;
	}, 7500);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = commandMap.get(interaction.commandName);
	if (!command) {
		await interaction.reply({
		content: `❌ 명령어를 찾을 수 없습니다: \`${interaction.commandName}\``,
		ephemeral: true,
		});
		return;
	}

	try {
		await command.execute(interaction as ChatInputCommandInteraction);
	} catch (error) {
		console.error(`❗ 명령 실행 중 오류: ${error}`);
		if (interaction.replied || interaction.deferred) {
		await interaction.followUp({
			content: `❗ 명령 실행 중 오류가 발생했습니다.`,
			ephemeral: true,
		});
		} else {
		await interaction.reply({
			content: `❗ 명령 실행 중 오류가 발생했습니다.`,
			ephemeral: true,
		});
		}
	}
});

client.login(ENV.DISCORD_TOKEN);