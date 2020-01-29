import AbilitiesEnum from 'data/types/AbilitiesEnum'

export default [
  {
    type: 'accolito',
    value: 'Accolito',
    abilities: [AbilitiesEnum.Intuizione, AbilitiesEnum.Religione],
    languages: 2,
    equip: [
      {
        id: 'simbolo_sacro',
        quantity: 1,
        name: 'Simbolo Sacro',
        info: 'Donatogli quando è stato ordinato come sacerdote',
        weight: 0 //(kg)
      },
      {
        id: 'libro_preghiere',
        quantity: 1,
        name: 'Libro di preghiere',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'bastoncini_incenso',
        quantity: 5,
        name: 'Bastoncini di incenso',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'vesti',
        quantity: 1,
        name: 'Vesti',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'abito',
        quantity: 1,
        name: 'Abito comune',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'mo',
        quantity: 15,
        name: 'Borsa con {0} {1}',
        info: '',
        weight: 0 //(kg)
      }
    ]
  },
  {
    type: 'artigiano_gilda',
    value: 'Artigiano di Gilda',
    abilities: [AbilitiesEnum.Intuizione, AbilitiesEnum.Persuasione],
    languages: 1,
    privileges: [
      {
        lv: 0,
        type: 'strumenti_artigiano',
        name: 'Competenza negli strumenti',
        description: 'Un tipo di strumenti da artigiano'
      }
    ],
    equip: [
      {
        id: 'strumenti_artigiano',
        quantity: 1,
        name: 'Serie di strumenti da artigiano',
        info: 'a scelta',
        weight: 0 //(kg)
      },
      {
        id: 'lettera',
        quantity: 1,
        name: 'Lettera di presentazione della gilda',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'abito_viaggiatore',
        quantity: 1,
        name: 'Abito da viaggiatore',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'mo',
        quantity: 15,
        name: 'Borsa con {0} {1}',
        info: '',
        weight: 0 //(kg)
      }
    ]
  }
]
