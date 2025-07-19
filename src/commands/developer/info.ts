import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { EMOJI, getProgressBar } from '../../utils/libs';

export const data = new SlashCommandBuilder()
    .setName('정보')
    .setDescription('[DEV] DEVELOPER COMMAND');

export async function execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
        .setColor(0xF49ABA)
        .setTitle(`${EMOJI.EM0002} 애플리케이션 정보`)
        .setDescription('탁구공을 던지는 중...');

    await interaction.reply({ embeds: [embed] });
}