export const exchangeCalculator = (normal, uncommon, rare, powder) => {
  let abidosFusionMaterialCount = 0;
  let normalExchangeCount = 0;
  let uncommonExchangeCount = 0;
  let normalRatio, uncommonRatio, rareRatio, avgRatio, minRatio;

  const normalRatioCalc = () => {
    normalRatio = Math.floor(normal / 86);
  };
  const uncommonRatioCalc = () => {
    uncommonRatio = Math.floor(uncommon / 45);
  };
  const rareRatioCalc = () => {
    rareRatio = Math.floor(rare / 33);
  };
  const avgRatioCalc = () => {
    avgRatio = Math.floor(
      (normal * 0.8 + uncommon * 1.6 + rare * 10) /
        (86 * 0.8 + 45 * 1.6 + 33 * 10),
    );
  };
  const minRatioCalc = () => {
    minRatio = Math.min(avgRatio, uncommonRatio, normalRatio);
  };

  while (true) {
    normalRatioCalc();
    uncommonRatioCalc();
    rareRatioCalc();
    avgRatioCalc();
    minRatioCalc();
    while (powder >= 100) {
      powder -= 100;
      rare += 10;
    }
    while (powder >= 100) {
      powder -= 100;
      rare += 10;
      rareRatioCalc();
    }

    // normal > uncommon ==> normal exchange powder
    while (normalRatio > minRatio) {
      normal -= 100;
      powder += 80;
      normalExchangeCount++;
      normalRatioCalc();
    }
    // uncommon > normal ==> uncommon exchange powder
    while (uncommonRatio > minRatio) {
      uncommon -= 50;
      powder += 80;
      uncommonExchangeCount++;
      uncommonRatioCalc();
    }
    // abidosFusionMaterial make counting
    while (normalRatio >= 1 && uncommonRatio >= 1 && rareRatio >= 1) {
      normal -= 86;
      uncommon -= 45;
      rare -= 33;
      abidosFusionMaterialCount++;
      normalRatioCalc();
      uncommonRatioCalc();
      rareRatioCalc();
    }
    if (powder < 100 && (normalRatio < 1 || uncommonRatio < 1)) {
      // console.log(`!!${normal}, ${uncommon}, ${rare}, ${powder}`);
      // console.log(normalRatio, uncommonRatio, rareRatio);
      return {
        n: normal,
        u: uncommon,
        r: rare,
        p: powder,
        nec: normalExchangeCount,
        uec: uncommonExchangeCount,
        afm: abidosFusionMaterialCount,
      };
    }
  }
};
