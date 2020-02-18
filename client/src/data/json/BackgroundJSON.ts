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
  },
  {
    type: 'eroe',
    value: 'Eroe Popolare',
    abilities: [AbilitiesEnum.AddestrareAnimali, AbilitiesEnum.Sopravvivenza],
    languages: 0,
    privileges: [
      {
        lv: 0,
        type: 'strumenti',
        name: 'Competenza negli strumenti',
        description: 'Un tipo di strumenti da artigiano e veicoli terrestri'
      },
      {
        lv: 0,
        type: 'ospitalita',
        name: 'Ospitalità rurale',
        description:
          "Dal momento che l'eroe popolare proviene dai ranghi della gente comune, si trova perfettamente a suo agio in mezzo ai popolani. Pub trovare un posto dove nascondersi, riposare o recuperare le forze presso gli altri popolani, purché la sua presenza non costituisca un pericolo noto alla loro incolumità. I popolani lo nasconderanno agli occhi della legge o di chiunque lo stia cercando, ma non rischieranno la vita per lui."
      }
    ],
    equip: [
      {
        id: 'strumenti',
        quantity: 1,
        name: 'Strumenti da artigiano',
        info: 'a scelta',
        weight: 0 //(kg)
      },
      {
        id: 'pala',
        quantity: 1,
        name: 'Pala',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'vaso',
        quantity: 1,
        name: 'Vaso di ferro',
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
        quantity: 10,
        name: 'Borsa con {0} {1}',
        info: '',
        weight: 0 //(kg)
      }
    ]
  },
  {
    type: 'forestiero',
    value: 'Forestiero',
    abilities: [AbilitiesEnum.Atletica, AbilitiesEnum.Sopravvivenza],
    languages: 1,
    privileges: [
      {
        lv: 0,
        type: 'strumenti',
        name: 'Competenza negli strumenti',
        description: 'Un tipo di strumenti musicale'
      },
      {
        lv: 0,
        type: 'viandante',
        name: 'Viandante',
        description:
          "Il forestiero ha un'ottima memoria geografica e uno spiccato senso dell'orientamento: riesce sempre a ricordare la disposizione generale del territorio, degJi insediamenti e degli altri punti di riferimento attorno a lui. Inoltre è in grado di trova re cibo e acqua fresca per se stesso e per un massimo di altre cinque persone ogni giorno, purché il territorio offra bacche. selvaggina, acqua e cosl via."
      }
    ],
    equip: [
      {
        id: 'bastone',
        quantity: 1,
        name: 'Bastone',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'tagliola',
        quantity: 1,
        name: 'Tagliola',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'trofeo',
        quantity: 1,
        name: 'Trofeo di un animale ucciso',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'abito',
        quantity: 1,
        name: 'Abito da viaggiatore',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'mo',
        quantity: 10,
        name: 'Borsa con {0} {1}',
        info: '',
        weight: 0 //(kg)
      }
    ]
  },
  {
    type: 'intrattenitore',
    value: 'Intrattenitore',
    abilities: [AbilitiesEnum.Acrobazia, AbilitiesEnum.Intrattenere],
    languages: 0,
    privileges: [
      {
        lv: 0,
        type: 'strumenti',
        name: 'Competenza negli strumenti',
        description:
          'Trucchi per il cammuffamento e un tipo di strumento musicale'
      },
      {
        lv: 0,
        type: 'richiesta',
        name: 'A Grande Richiesta',
        description:
          "Un intrattenitore riesce sempre a trovare un luogo in cui esibirsi, solitamente una locanda o una taverna, ma a volte anche un circo, un teatro o addirittura una corte nobiliare. Di conseguenza, in questi luoghi riceve gratuitamente vitto e alloggio di tenore modesto o agiato (in base alla qualità del locale), purché l'incantatore possa esibirsi ogni notte. Inoltre, l'esibizione fa dell'intrattenitore una sorta di celebrità locale. Quando gli stranieri lo riconoscono in una città in cui si è esibito, solitamente lo ammirano."
      }
    ],
    equip: [
      {
        id: 'strumento',
        quantity: 1,
        name: 'Strumento musicale',
        info: 'a scelta',
        weight: 0 //(kg)
      },
      {
        id: 'pegno',
        quantity: 1,
        name: 'Pegno di un ammiratore',
        info: "es. lettera d'ArmorEnum, ciocca di capelli, monile, ecc",
        weight: 0 //(kg)
      },
      {
        id: 'costume',
        quantity: 1,
        name: 'Costume',
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
    type: 'marinaio',
    value: 'Marinaio',
    abilities: [AbilitiesEnum.Atletica, AbilitiesEnum.Percezione],
    languages: 0,
    privileges: [
      {
        lv: 0,
        type: 'strumenti',
        name: 'Competenza negli strumenti',
        description: 'Strumenti da navigatore e veicoli acquatici.'
      },
      {
        lv: 0,
        type: 'passaggio',
        name: 'Passaggio Via Nave',
        description:
          "Quando si presenta il bisogno, il marinaio può ottenere un passaggio gratuito su una nave in partenza per se stesso e i suoi compagni d'avventura. Può viaggiare sulla nave su cui ha prestato servizio o su un•attra nave con cui ha buoni rapporti (magari capitanata da un suo vecchio compagno di ciurma}. Dal momento che ottiene questo passaggio come favore, non pub essere sicuro di ottenere dei tempi di viaggio o una rotta che soddisfino Je sue esigenze. Il Dungeon Master determina quanto tempo richiede il viaggio fino alla destinazione desiderata. In cambio di questo passaggio gratuito, il marinaio e i suoi compagni d'avventura dovranno prestare aiuto alrequipaggio nel corso del viaggio."
      }
    ],
    equip: [
      {
        id: 'galloccia',
        quantity: 1,
        name: 'Una galloccia da marinaio',
        info: 'randello',
        weight: 0 //(kg)
      },
      {
        id: 'corda',
        quantity: 1,
        name: 'Corda di seta',
        info: 'di 15 metri',
        weight: 0 //(kg)
      },
      {
        id: 'fortuna',
        quantity: 1,
        name: 'Portafortuna',
        info: 'es. zampa di coniglio, piccola pietra traforata, ecc',
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
        quantity: 10,
        name: 'Borsa con {0} {1}',
        info: '',
        weight: 0 //(kg)
      }
    ]
  },
  {
    type: 'monello',
    value: 'Monello',
    abilities: [AbilitiesEnum.Furtivita, AbilitiesEnum.RapiditaDiMano],
    languages: 0,
    privileges: [
      {
        lv: 0,
        type: 'strumenti',
        name: 'Competenza negli strumenti',
        description: 'Arnesi da scasso e trucchi per il camuffamento'
      },
      {
        lv: 0,
        type: 'segreti',
        name: 'Segreti Cittadini',
        description:
          "li monello conosce i ritmi e le vie segrete della città ed è in grado di sfruttare dei passaggi all'interno della struttura urbana che altri non noterebbero mai. Quando il monello non è in combattimento, può spostarsi (assieme ai compagni da lui guidati) da un luogo all'altro della città al doppio di quanto la sua velocità normale gli consentirebbe."
      }
    ],
    equip: [
      {
        id: 'coltellino',
        quantity: 1,
        name: 'Coltellino',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'mappa',
        quantity: 1,
        name: 'Mappa',
        info: 'della città di appartenenza',
        weight: 0 //(kg)
      },
      {
        id: 'topolino',
        quantity: 1,
        name: 'Topolino addomesticato',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'ciondolo',
        quantity: 1,
        name: 'Ciondolo',
        info: 'in ricordo dei genitori',
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
        quantity: 10,
        name: 'Borsa con {0} {1}',
        info: '',
        weight: 0 //(kg)
      }
    ]
  },
  {
    type: 'nobile',
    value: 'Nobile',
    abilities: [AbilitiesEnum.Persuasione, AbilitiesEnum.Storia],
    languages: 1,
    privileges: [
      {
        lv: 0,
        type: 'strumenti',
        name: 'Competenza negli strumenti',
        description: 'Un tipo di gioco'
      },
      {
        lv: 0,
        type: 'posizione',
        name: 'Posizione Privilegiata',
        description:
          'Grazie ai suoi nobili natali, il nobile è tenuto in grande considerazione daJJa gente. Il nobile è bene accetto nella società e la gente presume che egli abbia il diritto di andare ovunque desideri. I popolani fanno di tutto per compiacerlo e per evitare di irritarlo, e gli altri nobili lo considerano un membro alla pari della loro sfera sociale. Il nobile può facilmente ottenere udienza presso un altro nobile locale, se lo desidera.'
      }
    ],
    equip: [
      {
        id: 'anello',
        quantity: 1,
        name: 'Anello con sigillo',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'pergamena',
        quantity: 1,
        name: 'Pergamena',
        info: 'con albero genealogico',
        weight: 0 //(kg)
      },
      {
        id: 'abito',
        quantity: 1,
        name: 'Abito pregiato',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'mo',
        quantity: 25,
        name: 'Borsa con {0} {1}',
        info: '',
        weight: 0 //(kg)
      }
    ]
  },
  {
    type: 'sapiente',
    value: 'Sapiente',
    abilities: [AbilitiesEnum.Arcano, AbilitiesEnum.Storia],
    languages: 2,
    privileges: [
      {
        lv: 0,
        type: 'ricercatore',
        name: 'Ricercatore',
        description:
          "Quando il sapiente tenta di apprendere o di ricordare qualche informazione rilevante, se non conosce quelle informazioni personalmente, spesso sa dove e da chi ottenerle. In genere queste informazioni sono custodite in una biblioteca, uno scriptorium o un'università, oppure sono in possesso di un altro sapiente o di un'altra persona o creatura istruita. Il DM potrebbe decidere che le informazioni desiderate siano rinchiuse in un luogo pressoché inaccessibile, o semplicemente che non sia possibile recuperarle. Portare alla luce uno dei più nascosti segreti del multiverso potrebbe essere robiettivo di un'avventura o addirittura di un'intera campagna."
      }
    ],
    equip: [
      {
        id: 'calamaio',
        quantity: 1,
        name: 'Calamaio',
        info: 'di inchiostro nero',
        weight: 0 //(kg)
      },
      {
        id: 'pennino',
        quantity: 1,
        name: 'Pennino',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'coltellino',
        quantity: 1,
        name: 'Coltellino',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'lettera',
        quantity: 1,
        name: 'Lettera di un collega defunto',
        info:
          'che pone una domanda a cui il sapiente non ha ancora trovato risposta',
        weight: 0 //(kg)
      },
      {
        id: 'abito',
        quantity: 1,
        name: 'Abito pregiato',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'mo',
        quantity: 10,
        name: 'Borsa con {0} {1}',
        info: '',
        weight: 0 //(kg)
      }
    ]
  },
  {
    type: 'soldato',
    value: 'Soldato',
    abilities: [AbilitiesEnum.Atletica, AbilitiesEnum.Intimidire],
    languages: 1,
    privileges: [
      {
        lv: 0,
        type: 'strumenti',
        name: 'Competenza negli strumenti',
        description: 'Un tipo di gioco e veicoli terrestri'
      },
      {
        lv: 0,
        type: 'grado',
        name: 'Grado Militare',
        description:
          "Il soldato ha conseguito un grado militare nel corso della sua carriera. I soldati fedeli alla sua vecchia organizzazione  militare riconoscono ancora la sua autorità e la sua influenza e gli obbediscono. se sono di grado inferiore. Il soldato può appellarsi al suo rango per esercitare la sua influenza sugli altri soldati e ottenere ruso temporaneo di cavalli o attrezzature varie. Solitamente pub anche ottenere l'accesso agli accampamenti e alle fortezze militari amiche,là dove il suo grado è riconosciuto."
      }
    ],
    equip: [
      {
        id: 'mostrina',
        quantity: 1,
        name: 'Mostrina con i gradi',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'dadi',
        quantity: 1,
        name: 'Dadi',
        info: 'in osso',
        weight: 0 //(kg)
      },
      {
        id: 'abito',
        quantity: 1,
        name: 'Abito pregiato',
        info: '',
        weight: 0 //(kg)
      },
      {
        id: 'mo',
        quantity: 10,
        name: 'Borsa con {0} {1}',
        info: '',
        weight: 0 //(kg)
      }
    ]
  }
]
