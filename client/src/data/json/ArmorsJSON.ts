export default [
  {
    name: 'Imbottita',
    id: 'imbottita',
    armorType: 'Armatura Leggera',
    ca: 11,
    noFurtivity: true,
    weight: 4,
    minFor: undefined,
    addDes: true
  },
  {
    name: 'Pelle',
    id: 'pelle',
    armorType: 'Armatura Media',
    ca: 12,
    noFurtivity: false,
    weight: 6,
    minFor: undefined,
    addDes: true
  },
  {
    name: 'Cotta di Maglia',
    id: 'cottaDiMaglia',
    armorType: 'Armatura Pesante',
    ca: 16,
    property: ['Svantaggio'],
    weight: 27.5,
    minFor: 13,
    addDes: false
  },
  {
    name: 'Scudo',
    id: 'scudo',
    armorType: 'Scudo',
    ca: 2,
    property: [],
    weight: 3,
    minFor: 0,
    addDes: true
  },
  {
    name: 'Altro',
    id: 'altro',
    armorType: 'Altro',
    ca: 0,
    property: [],
    weight: 0,
    minFor: 0,
    addDes: true
  }
]
