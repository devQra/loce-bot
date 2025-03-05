const { SlashCommandBuilder } = require("discord.js");
const { exchangeCalculator } = require("../events/exchangeCalculator");
const { emoji } = require("../constants/custom-emoji");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("abidos")
    .setDescription(
      "'아비도스 융화 재료' 제작 시 영지 생활 재료 교환 횟수와 최대 제작 가능 횟수를 보여줍니다.",
    )
    .addIntegerOption((option) =>
      option
        .setName("normal")
        .setDescription("회색 등급의 개수를 입력해주세요.")
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("uncommon")
        .setDescription("초록 등급의 개수를 입력해주세요.")
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("rare")
        .setDescription("파란 등급(아비도스)의 개수를 입력해주세요. 없으면 0")
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("powder")
        .setDescription("생활의 가루 개수를 입력해주세요. 없으면 0")
        .setRequired(true),
    ),
  run: ({ interaction }) => {
    const input = {
      normal: interaction.options.get("normal").value,
      uncommon: interaction.options.get("uncommon").value,
      rare: interaction.options.get("rare").value,
      powder: interaction.options.get("powder").value,
    };
    const result = exchangeCalculator(
      input.normal,
      input.uncommon,
      input.rare,
      input.powder,
    );
    interaction.reply(
      `### 입력한 재료
${emoji.wn}: ${input.normal} / ${emoji.wu}:${input.uncommon} / ${emoji.wr}:${input.rare} / ${emoji.wp}:${input.powder}

### 계산 결과
${emoji.wn}: ${result.nec}번 / ${emoji.wu}: ${result.uec}번 / ${emoji.afm}: ${result.afm}번

### 남은 재료
${emoji.wn}: ${result.n} / ${emoji.wu}:${result.u} / ${emoji.wr}:${result.r} / ${emoji.wp}:${result.p}`,
    );
  },
};
