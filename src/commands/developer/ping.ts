import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { EMOJI, getProgressBar } from '../../utils/libs';

export const data = new SlashCommandBuilder()
    .setName('핑')
    .setDescription('[DEV] DEVELOPER COMMAND');

export async function execute(interaction: ChatInputCommandInteraction) {
    const initialEmbed = new EmbedBuilder()
        .setColor(0xF49ABA)
        .setTitle(`${EMOJI.EM0002} 핑!`)
        .setDescription('탁구공을 던지는 중...');

    await interaction.reply({ embeds: [initialEmbed] });

    const sent = await interaction.fetchReply();
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = interaction.client.ws.ping >= 0 ? `${interaction.client.ws.ping}ms` : '측정 불가';

    const memoryUsageMB = process.memoryUsage().heapUsed / 1024 / 1024;
    const memoryUsagePercent = +(
        (memoryUsageMB / (process.memoryUsage().heapTotal / 1024 / 1024)) *
        100
    ).toFixed(0);

    const finalEmbed = new EmbedBuilder()
        .setColor(0xF49ABA)
        .setTitle(`${EMOJI.EM0002} 퐁!`)
        .addFields(
        { name: 'PING', value: `\`${latency}ms\``, inline: true },
        { name: 'API', value: `\`${apiLatency}\``, inline: true },
        {
            name: 'MEMORY',
            value: `\`${memoryUsageMB.toFixed(2)}MB\`\n${getProgressBar(memoryUsagePercent)}`,
            inline: false,
        }
        )
        .setTimestamp();

    await interaction.editReply({ embeds: [finalEmbed] });
}