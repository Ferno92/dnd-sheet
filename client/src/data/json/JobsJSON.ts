import StatsType from 'data/types/StatsEnum'
import AbilitiesEnum from 'data/types/AbilitiesEnum'

export default [
  {
    type: 'Barbaro',
    name: 'Barbaro',
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
    ],
    privileges: [
      {
        lv: 1,
        type: 'ira',
        name: 'Ira',
        description: 'In battaglia un barbaro, ecc ecc',
        counter: 2,
        counterType: 'volte'
      },
      {
        lv: 1,
        type: 'difesaSenzaArmatura',
        name: 'Difesa Senza Armatura',
        description: 'Finchè un barbaro, ecc ecc'
      }
    ]
  },
  {
    type: 'Stregone',
    name: 'Stregone',
    levels: [
      { id: 1, proficiency: 2 },
      { id: 2, proficiency: 2 },
      { id: 3, proficiency: 2 },
      { id: 4, proficiency: 2 },
      { id: 5, proficiency: 3 },
      { id: 6, proficiency: 3 }
    ],
    ts: [StatsType.Carisma, StatsType.Costituzione],
    dice: 6,
    abilitiesCount: 2,
    abilities: [
      AbilitiesEnum.Arcano,
      AbilitiesEnum.Inganno,
      AbilitiesEnum.Intimidire,
      AbilitiesEnum.Intuizione,
      AbilitiesEnum.Persuasione,
      AbilitiesEnum.Religione
    ],
    spellsByJobLevel: [
      {
        id: 1,
        known: 2,
        spells: [
          { level: 0, slot: 4 },
          { level: 1, slot: 2 }
        ]
      },
      {
        id: 2,
        known: 3,
        spells: [
          { level: 0, slot: 4 },
          { level: 1, slot: 3 }
        ]
      },
      {
        id: 3,
        known: 4,
        spells: [
          { level: 0, slot: 4 },
          { level: 1, slot: 4 },
          { level: 2, slot: 2 }
        ]
      },
      {
        id: 4,
        known: 5,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 }
        ]
      },
      {
        id: 5,
        known: 6,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
          { level: 3, slot: 2 }
        ]
      },
      {
        id: 6,
        known: 7,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
          { level: 3, slot: 3 }
        ]
      }
    ],
    privileges: []
  }
]
