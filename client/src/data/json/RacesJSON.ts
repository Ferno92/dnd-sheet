import SizeEnum from 'data/types/SizeEnum'

export default [
  {
    type: 'Umano',
    name: 'Umano',
    subraces: [],
    stats: [],
    abilities: [],
    special: [],
    languages: [],
    size: SizeEnum.Media
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
      }
    ],
    special: [],
    languages: [],
    size: SizeEnum.Media
  },
  {
    type: 'Elfo',
    name: 'Elfo',
    subraces: ['elfo_alto', 'elfo_boschi', 'elfo_oscuro'],
    stats: [{ Des: 2 }],
    abilities: [],
    special: [],
    languages: [],
    size: SizeEnum.Media
  }
]
