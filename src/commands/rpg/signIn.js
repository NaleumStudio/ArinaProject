const { Colors, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { SlashCommandBuilder, Embed, EmbedBuilder } = require('discord.js');
const { EMOJI } = require('../../utils/emojis.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('회원가입')
    .setDescription('[RPG] 캐릭터를 생성합니다'),
    async execute(interaction) {
        execute(interaction);
    }
};

async function execute(interaction) {
    await interaction.reply({
        content: null,
        embeds: [embedGenerate(interaction, '개티', '20', '남자', 'test1234123133')]
    });
}

function embedGenerate(interaction, name, age, gender, description) {
    return new EmbedBuilder()
    .setColor(0xf49aba)
    .setTitle(`${EMOJI.EM001} 캐릭터 생성하기`)
    .setThumbnail(interaction.user.displayAvatarURL({dynamic: true, size: 512}))
    .addFields(
        {name: '닉네임', value: `${name}`, inline: true},
        {name: '나이', value: `${age}`, inline: true},
        {name: '성별', value: `${gender}`, inline: true},
        {name: '설명', value: `${description}`, inline: false}
    )
}