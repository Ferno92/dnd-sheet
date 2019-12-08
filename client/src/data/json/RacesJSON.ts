import SizeEnum from 'data/types/SizeEnum'

export default [
  {
    type: 'Umano',
    name: 'Umano',
    subraces: [],
    stats: [],
    abilities: [],
    special: [],
    languages: ['Comune'],
    size: SizeEnum.Media,
    vel: 9
  },
  {
    type: 'Nano',
    name: 'Nano',
    subraces: ['nano_montagne', 'nano_colline'],
    stats: [{ Cos: 2 }],
    abilities: [
      {
        name: 'Scurovisione',
        description:
          "Un nano è abituato a vivere sottoterra e beneficia di una vista superiore nell'oscurità e nelle condizioni di luce fioca. Un nano in condizioni di luce fiocapub vedere fino a 18 metri come se si trovasse in condizionidi luce intensa e nell'oscurità come se si trovasse in lucefioca. Nell'oscurità non è in grado di discernere i colori, masolo le tonalità di grigio."
      },
      {
        name: 'Resilienza Nanica',
        description:
          'Un nano dispone di vantaggio ai tiri salvezza contro il veleno e di resistenza ai danni da veleno'
      },
      {
        name: 'Competenza negli Strumenti',
        description:
          'Un nano ha competenza in un gruppo di strumenti da artigiano a sua scelta: strumenti da fabbro, scorte da mescitore o strumenti da costruttore.'
      },
      {
        name: 'Esperto Minatore',
        description:
          "Ogni volta che un nano effettua una prova di Intelligenza (Storia) relativa all'origine di unastruttura in pietra, è considerato avere competenza nell'abilità Storia e aggiunge il doppio del suo bonus di competenza alla prova anziché Il suo normale bonus di competenza."
      }
    ],
    special: [],
    languages: ['Comune', 'Nanico'],
    size: SizeEnum.Media,
    vel: 7.5
  },
  {
    type: 'Mezzelfo',
    name: 'Mezzelfo',
    subraces: [],
    stats: [{ Car: 2 }],
    abilities: [
      {
        name: 'Incremento dei Punteggi di Caratteristica',
        description: 'Altri due punteggi di caratteristica aumentano di 1'
      },
      {
        name: 'Scurovisione',
        description:
          "Grazie al suo sangue elfico, un mezzelfo beneficia di una vista superiore nell'oscurità e nelle condizioni di luce fioca. Un mezzelfo in condizioni di luce fioca può vedere fino a 18 metri come se si trovasse in condizioni di luce intensa e nell'oscurità come se si trovasse in luce fioca. Nell'oscurità non è in grado di discernere i colori. ma solo le tonalità di grigio."
      },
      {
        name: 'Retaggio Fatato',
        description:
          'Un mezzelfo dispone di vantaggio ai tiri salvezza per non essere affascinato e non può essere addormentato tramite la magia.'
      },
      {
        name: 'Versatilità nelle Abilità',
        description: 'Un mezzelfo ha competenza in due abilità a sua scelta.'
      },
      {
        name: 'Linguaggi',
        description:
          'Un mezzelfo può parlare, leggere e scrivere in Comune, in Elfico e in un linguaggio extra a sua scelta.'
      }
    ],
    special: [],
    languages: ['Comune', 'Elfico'],
    size: SizeEnum.Media,
    vel: 9
  },
  {
    type: 'Tiefling',
    name: 'Tiefling',
    subraces: [],
    stats: [{ Car: 2, Int: 1 }],
    abilities: [
      {
        name: 'Scurovisione',
        description:
          "Grazie al suo retaggio infernale, un tiefling beneficia di una vista superiore nell'oscurità e nelle condizioni di luce fioca. Un mezzelfo in condizioni di luce fioca può vedere fino a 18 metri come se si trovasse in condizioni di luce intensa e nell'oscurità come se si trovasse in luce fioca. Nell'oscurità non è in grado di discernere i colori. ma solo le tonalità di grigio."
      },
      {
        name: 'Resistenza Infernale',
        description: 'Un tiefling dispone di resistenza ai danni da fuoco.'
      },
      {
        name: 'Eredità Infernale',
        description:
          "Un tiefting conosce il trucchetto taumaturgia. Quando raggiunge il 3° livello, può lanciare l'incantesimo intimorire infernale come incantesimo di 2 livello una volta con questo tratto e recuperare la capacità di farlo quando completa un riposo lungo. Quando raggiunge il 5° livello può lanciare l'incantesimo oscurità una volta con questo tratto e recuperare la capacità di farlo quando completa un riposo lungo. La caratteristica da incantatore per questi incantesimi è Carisma."
      }
    ],
    special: [],
    languages: ['Comune', 'Infernale'],
    size: SizeEnum.Media,
    vel: 9
  },
  {
    type: 'Elfo',
    name: 'Elfo',
    subraces: ['elfo_alto', 'elfo_boschi', 'elfo_oscuro'],
    stats: [{ Des: 2 }],
    abilities: [],
    special: [],
    languages: ['Comune', 'Elfico'],
    size: SizeEnum.Media,
    vel: 9
  }
]
