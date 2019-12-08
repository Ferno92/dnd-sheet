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
        description:
          'In battaglia, un barbaro combatte animato da una ferocia primordiale. Nel suo turno può entrare in ira come azione bonus.',
        counter: 2,
        counterType: 'volte'
      },
      {
        lv: 1,
        type: 'difesaSenzaArmatura',
        name: 'Difesa Senza Armatura',
        description:
          'Finché un barbaro non indossa alcuna armatura, la sua Classe Armatura è pari a 10 +il suo modificatore di Destrezza + il suo modificatore di Costituzione. Un barbaro può usare uno scudo e ottenere comunque questo beneficio.'
      },
      {
        lv: 2,
        type: 'attaccoIrruento',
        name: 'Attacco Irruento',
        description:
          'Quando effettua il suo primo attacco nel suo turno, può decidere di sferrare un attacco irruento. Così facendo dispone di vantaggio ai tiri per colpire in mischia che usano Forza durante questo turno, ma i tiri per colpire contro di lui dispongono di vantaggio fino al suo turno successivo.'
      },
      {
        lv: 2,
        type: 'percezioneDelPericolo',
        name: 'Percezione del Pericolo',
        description:
          'Un barbaro dispone di vantaggio ai tiri salvezza su Destrezza contro gli effetti che può vedere, come le trappole e gli incantesimi. Per ottenere questo beneficio il barbaro non deve essere accecato, assordato o incapacitato.'
      },
      {
        lv: 3,
        type: 'camminoPrimordiale',
        name: 'Cammino Primordiale',
        description:
          'Un barbaro sceglie un cammino che definisce la natura della sua furia. Può scegliere il Cammino del Berserker o il Cammino del Combattente Totemico.'
      },
      {
        lv: 5,
        type: 'attaccoExtra',
        name: 'Attacco Extra',
        description:
          "Un barbaro può attaccare due volte anziché una, ogni volta che effettua l'azione di Attacco nel proprio turno."
      },
      {
        lv: 5,
        type: 'movimentoVeloce',
        name: 'Movimento Veloce',
        description:
          "La velocità del barbaro aumenta di 3 metri purché il barbaro non indossi un'armatura pesante."
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
