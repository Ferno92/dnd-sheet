import StatsType from "data/types/StatsEnum";
import AbilitiesEnum from "data/types/AbilitiesEnum";

export default [
  {
    type: "Barbaro",
    name: "Barbaro",
    levels: [
      { id: 1, proficiency: 2 },
      { id: 2, proficiency: 2 },
      { id: 3, proficiency: 2 },
      { id: 4, proficiency: 2 },
      { id: 5, proficiency: 3 },
      { id: 6, proficiency: 3 }
    ],
    ts: [StatsType.Forza, StatsType.Costituzione],
    dice: 12,
    abilitiesCount: 2,
    abilities: [
      AbilitiesEnum.AddestrareAnimali,
      AbilitiesEnum.Atletica,
      AbilitiesEnum.Intimidire,
      AbilitiesEnum.Natura,
      AbilitiesEnum.Percezione,
      AbilitiesEnum.Sopravvivenza
    ]
  }
];
