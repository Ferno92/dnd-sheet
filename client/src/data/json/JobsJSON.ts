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
        lv: 3,
        type: 'ira',
        name: 'Ira',
        description:
          'In battaglia, un barbaro combatte animato da una ferocia primordiale. Nel suo turno può entrare in ira come azione bonus.',
        counter: 3,
        counterType: 'volte'
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
      },
      {
        lv: 6,
        type: 'ira',
        name: 'Ira',
        description:
          'In battaglia, un barbaro combatte animato da una ferocia primordiale. Nel suo turno può entrare in ira come azione bonus.',
        counter: 4,
        counterType: 'volte'
      }
    ]
  },
  {
    type: 'Chierico',
    name: 'Chierico',
    levels: [
      { id: 1, proficiency: 2 },
      { id: 2, proficiency: 2 },
      { id: 3, proficiency: 2 },
      { id: 4, proficiency: 2 },
      { id: 5, proficiency: 3 },
      { id: 6, proficiency: 3 }
    ],
    ts: [StatsType.Saggezza, StatsType.Carisma],
    dice: 8,
    abilitiesCount: 2,
    abilities: [
      AbilitiesEnum.Intuizione,
      AbilitiesEnum.Medicina,
      AbilitiesEnum.Persuasione,
      AbilitiesEnum.Religione,
      AbilitiesEnum.Storia
    ],
    spellsByJobLevel: [
      {
        id: 1,
        known: 0,
        spells: [
          { level: 0, slot: 3 },
          { level: 1, slot: 2 }
        ]
      },
      {
        id: 2,
        known: 0,
        spells: [
          { level: 0, slot: 3 },
          { level: 1, slot: 3 }
        ]
      },
      {
        id: 3,
        known: 0,
        spells: [
          { level: 0, slot: 3 },
          { level: 1, slot: 4 },
          { level: 2, slot: 2 }
        ]
      },
      {
        id: 4,
        known: 0,
        spells: [
          { level: 0, slot: 4 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 }
        ]
      },
      {
        id: 5,
        known: 0,
        spells: [
          { level: 0, slot: 4 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
          { level: 3, slot: 2 }
        ]
      },
      {
        id: 6,
        known: 0,
        spells: [
          { level: 0, slot: 4 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
          { level: 3, slot: 3 }
        ]
      }
    ],
    privileges: [
      {
        lv: 1,
        type: 'dominio',
        name: 'Dominio Divino',
        description:
          'Il chierico sceglie un dominio correlato alla sua divinità: Conoscenza, Guerra, Inganno, Luce, Natura. Tempesta o Vita. Ogni dominio è descritto in dettaglio alla fine della sezione di questa classe e fornisce esempi di varie divinità a esso associate. Questa scelta conferisce al chierico alcuni incantesimi di dominio e altri privilegi'
      },
      {
        lv: 1,
        type: 'incantesimiDominio',
        name: 'Incantesimi di Dominio',
        description:
          "A ogni dominio corrisponde una lista di incantesimi (gli incantesimi di dominio) che il chierico ottiene ai livelli da chierico indicati nella descrizione del dominio. Quando un chierico ottiene un incantesimo di dominio, quell'incantesimo è sempre considerato preparato e non conta al fine determinare il numero di incantesimi che il chierico può preparare ogni giorno. Se il chierico possiede un incantesimo di dominio che non compare sulla lista degli incantesimi da chierico, quell'incantesimo è comunque considerato un incantesimo da chierico per lui."
      },
      {
        lv: 2,
        type: 'incanalare',
        name: 'Incanalare Divinità',
        description:
          "Un chierico ottiene la capacità di incanalare energia divina direttamente dalla sua divinità e usa quell'energia per alimentare gli effetti magici. Un chierico parte con due effetti di questo tipo: Scacciare Non Morti e un effetto determinato dal suo dominio. Alcuni domini conferiscono al chierico degli effetti aggiuntivi an mano che avanza di livello, nel modo indicato nella descrizione del dominio. Quando un chierico utilizza Incanalare Divinità, può scegliere quale effetto creare. Deve poi completare un riposo breve o lungo per utilizzare di nuovo Incanalare Divinità. Alcuni effetti di Incanalare Divinità richiedono dei tiri salvezza. Quando un chierico utilizza un tale effetto, la CD è pari alla CD del tiro salvezza dei suoi incantesimi da chierico.",
        counter: 1
      },
      {
        lv: 2,
        type: 'scacciare',
        name: 'Incanalare Divinità: Scacciare non morti',
        description:
          "Con un'azione, il chierico brandisce il suo simbolo sacro e pronuncia una preghiera di condanna nei confronti dei non morti. Ogni non morto che è in grado vedere o sentire il chierico e si trova entro 9 metri da lui deve effettuare un tiro salvezza su Saggezza. Se lo fallisce, In creatura è scacciata per 1 minuto o finché non subisce danni. Una creatura scacciata deve spendere i suoi turni tentando di allontanarsi il più possibile dal chierico e non può volontariamente muoversi in uno spazio entro 9 metri dal chierico. Inoltre, non può effettuare reazioni. Come sua azione può usare solo l'azione di Scatto o tentare di ruggire da un effetto che gli impedisce di muoversi. Se non può muoversi in alcun luogo, la creatura può usare l'azione di Schivata."
      },
      {
        lv: 4,
        type: 'punteggio',
        name: 'Aumento punteggio caratteristica',
        description:
          "Quando arriva al 4' livello, e poi di nuovo all'8', 12', 16' e 19' livello, un chierico può aumentare di 2 un punteggio di caratteristica a sua scelta, oppure può aumentare di 1 due punteggi di caratteristica a sua scelta. Come di consueto, non è consentito aumentare un punteggio di caratteristica a più di 20 utilizzando questo privilegio."
      },
      {
        lv: 4,
        type: 'distruggere',
        name: 'Distruggere Non Morti',
        description:
          'Quando un non morto fallisce il suo tiro salvezza contro il privilegio Scacciare Non Morti del chierico, quella creatura è distrutta istantaneamente se il suo grado di sfida è pari o inferiore a una certa soglia. <br> LV.5- GS 1/2 o inferiore'
      },
      {
        lv: 6,
        type: 'incanalare',
        name: 'Incanalare Divinità',
        description:
          "Un chierico ottiene la capacità di incanalare energia divina direttamente dalla sua divinità e usa quell'energia per alimentare gli effetti magici. Un chierico parte con due effetti di questo tipo: Scacciare Non Morti e un effetto determinato dal suo dominio. Alcuni domini conferiscono al chierico degli effetti aggiuntivi an mano che avanza di livello, nel modo indicato nella descrizione del dominio. Quando un chierico utilizza Incanalare Divinità, può scegliere quale effetto creare. Deve poi completare un riposo breve o lungo per utilizzare di nuovo Incanalare Divinità. Alcuni effetti di Incanalare Divinità richiedono dei tiri salvezza. Quando un chierico utilizza un tale effetto, la CD è pari alla CD del tiro salvezza dei suoi incantesimi da chierico.",
        counter: 2
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
    privileges: [
      {
        lv: 3,
        type: 'metamagia',
        name: 'Metamagia',
        description:
          'uno stregone sviluppa la capacità di plasmare i suoi incantesimi per adattarli ai suoi bisogni e ottiene delle opzioni di Metamagia a sua scelta',
        counter: 2
      }
    ]
  },
  {
    type: 'Warlock',
    name: 'Warlock',
    levels: [
      { id: 1, proficiency: 2 },
      { id: 2, proficiency: 2 },
      { id: 3, proficiency: 2 },
      { id: 4, proficiency: 2 },
      { id: 5, proficiency: 3 },
      { id: 6, proficiency: 3 }
    ],
    ts: [StatsType.Carisma, StatsType.Saggezza],
    dice: 8,
    abilitiesCount: 2,
    abilities: [
      AbilitiesEnum.Arcano,
      AbilitiesEnum.Indagare,
      AbilitiesEnum.Inganno,
      AbilitiesEnum.Intimidire,
      AbilitiesEnum.Natura,
      AbilitiesEnum.Religione,
      AbilitiesEnum.Storia
    ],
    spellsByJobLevel: [
      {
        id: 1,
        known: 2,
        spells: [
          { level: 0, slot: 2 },
          { level: 1, slot: 0 }
        ],
        slot: 1
      },
      {
        id: 2,
        known: 3,
        spells: [
          { level: 0, slot: 2 },
          { level: 1, slot: 0 }
        ],
        slot: 2
      },
      {
        id: 3,
        known: 4,
        spells: [
          { level: 0, slot: 2 },
          { level: 1, slot: 0 },
          { level: 2, slot: 0 }
        ],
        slot: 2
      },
      {
        id: 4,
        known: 5,
        spells: [
          { level: 0, slot: 3 },
          { level: 1, slot: 0 },
          { level: 2, slot: 0 }
        ],
        slot: 2
      },
      {
        id: 5,
        known: 6,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 0 },
          { level: 2, slot: 0 },
          { level: 3, slot: 0 }
        ],
        slot: 2
      },
      {
        id: 6,
        known: 7,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 0 },
          { level: 2, slot: 0 },
          { level: 3, slot: 0 }
        ],
        slot: 2
      }
    ],
    privileges: [
      {
        lv: 1,
        type: 'patrono',
        name: 'Patrono Ultraterreno',
        description:
          "Un warlock stipula un patto con un essere extraplanare a sua scelta: il Signore Fatato, l'Immondo o il rande Antico. La scelta del patrono gli conferisce alcuni privilegi"
      },
      {
        lv: 2,
        type: 'suppliche',
        name: 'Suppliche Occulte',
        description:
          "Dedicandosi allo studio delle scienze occulte, un warlock ha scoperto come usare alcune suppliche occulte, frammenti di conoscenze proibite che gli conferiscono persistenti doti magiche.Inoltre, quando acquisisce un nuovo livello, il warlock può scegliere una delle suppliche che conosce e sostituirla con un'altra che potrebbe imparare a quel livello.",
        counter: 2
      },
      {
        lv: 3,
        type: 'patto',
        name: 'Dono del Patto',
        description:
          'Il patrono ultraterreno elargisce al warlock un dono per ricompensarlo dei suoi fedeli servigi. Il warlock ottiene uno dei privilegi seguenti a sua scelta. (Patto della Catena, Patto della Lama, Patto del Tomo)'
      },
      {
        lv: 4,
        type: 'punteggio',
        name: 'Aumento punteggio caratteristica',
        description:
          "Quando arriva al 4' livello, e poi di nuovo all'8', 12', 16' e 19' livello, un warlock può aumentare di 2 un punteggio di caratteristica a sua scelta, oppure può aumentare di 1 due punteggi di caratteristica a sua scelta. Come di consueto, non è consentito aumentare un punteggio di caratteristica a più di 20 utilizzando questo privilegio."
      }
    ]
  }
]
