import AbilitiesEnum from 'data/types/AbilitiesEnum'

export default [
  {
    type: 'accolito',
    value: 'Accolito',
    abilities: [AbilitiesEnum.Intuizione, AbilitiesEnum.Religione],
    languages: 2,
    privileges: [
      {
        lv: 0,
        type: 'rifugio_fedeli',
        name: 'Rifugio dei Fedeli',
        description:
          "L'accolito e gli avventurieri suoi compagni possono aspettarsi di ricevere cure e guarigioni gratuite presso un tempio della sua fede."
      }
    ],
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
      },
      {
        lv: 0,
        type: 'gilda',
        name: 'Appartenenza alla Gilda (artigiani)',
        description:
          "In qualità di membro rispettato e di vecchia data di una gilda, l'artigiano può ricevere vitto e alloggio gratuito dai colleghi e potrebbe avere una sede centrale in alcune città dove incontrare potenziali datori di lavoro, alleati o gregari."
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
  },
  {
    type: 'ciarlatano',
    value: 'Ciarlatano',
    abilities: [AbilitiesEnum.Inganno, AbilitiesEnum.RapiditaDiMano],
    languages: 0,
    privileges: [
      {
        lv: 0,
        type: 'strumenti_artigiano',
        name: 'Competenza negli strumenti',
        description: 'Arnesi da falsario, trucchi per il cammuffamento'
      },
      {
        lv: 0,
        type: 'falsa_identita',
        name: 'Falsa Identità',
        description:
          "Il ciarlatano si è creato una seconda identità che include documenti, conoscenze stimate e cammuffamenti che gli permettono di interpretare un individuo fittizio. E' inoltre in grado di forgiare documenti, anche ufficiali e lettere personali, purchè abbia visto un esempio del tipo di documento o scrittura."
      }
    ],
    equip: [
      {
        id: 'abito',
        quantity: 1,
        name: 'Abito pregiato',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'trucchi',
        quantity: 1,
        name: 'Trucchi per il cammuffamento',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'strumenti',
        quantity: 1,
        name: 'Strumenti da truffatore',
        info: 'A scelta (dadi truccati, mazzo di carte segnate, ecc',
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
    type: 'criminale',
    value: 'Criminale',
    abilities: [AbilitiesEnum.Inganno, AbilitiesEnum.Furtivita],
    languages: 0,
    privileges: [
      {
        lv: 0,
        type: 'strumenti',
        name: 'Competenza negli strumenti',
        description: 'Arnesi da scasso, un tipo di gioco'
      },
      {
        lv: 0,
        type: 'contatto_criminale',
        name: 'Contatto Criminale',
        description:
          'Il criminale conosce un contatto affidabile che funge da tramite tra lui e una rete di altri criminali.'
      }
    ],
    equip: [
      {
        id: 'piede_di_porco',
        quantity: 1,
        name: 'Piede di porco',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'abito',
        quantity: 1,
        name: 'Abito comune con cappuccio',
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
    type: 'eremita',
    value: 'Eremita',
    abilities: [AbilitiesEnum.Medicina, AbilitiesEnum.Religione],
    languages: 1,
    privileges: [
      {
        lv: 0,
        type: 'strumenti',
        name: 'Competenza negli strumenti',
        description: 'Borsa da erborista'
      },
      {
        lv: 0,
        type: 'scoperta',
        name: 'Scoperta',
        description:
          "Nella tranquillità e nell'isolamento prolungato del suo eremo, l'eremita è riuscito a fare un'unica e importante scoperta."
      }
    ],
    equip: [
      {
        id: 'custodia',
        quantity: 1,
        name: 'Custodia per pergamene',
        info: 'Piena di appunti di studio o preghiere',
        weight: 0 //(kg)
      },
      {
        id: 'coperta',
        quantity: 1,
        name: 'Coperta invernale',
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
        quantity: 5,
        name: 'Borsa con {0} {1}',
        info: '',
        weight: 0 //(kg)
      }
    ]
  }
]
