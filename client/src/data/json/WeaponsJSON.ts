export default [
  //TODO aggiungi peso
  {
    name: 'Ascia',
    id: 'ascia',
    type: 'Arma da mischia semplice',
    damageType: 'Tagliente',
    damage: 'd6',
    property: ['Gittata 6/18', 'Leggera'],
    weight: 1
  },
  {
    name: 'Bastone Ferrato',
    id: 'bastoneFerrato',
    type: 'Arma da mischia semplice',
    damageType: 'Contundente',
    damage: 'd6',
    property: ['Gittata 6/18', 'Leggera'],
    weight: 2
  },
  {
    name: 'Falcetto',
    id: 'falcetto',
    type: 'Arma da mischia semplice',
    damageType: 'Tagliente',
    damage: 'd4',
    property: ['Leggera'],
    weight: 1
  },
  {
    name: 'Giavellotto',
    id: 'giavellotto',
    type: 'Arma da mischia semplice',
    damageType: 'Perforante',
    damage: 'd6',
    property: ['Gittata 9/36'],
    weight: 1
  },
  {
    name: 'Lancia',
    id: 'lancia',
    type: 'Arma da mischia semplice',
    damageType: 'Perforante',
    damage: 'd6',
    property: ['Gittata 6/18', 'Versatile(1d8)'],
    weight: 1.5
  },
  {
    name: 'Martello Leggero',
    id: 'martelloLeggero',
    type: 'Arma da mischia semplice',
    damageType: 'Contundente',
    damage: 'd4',
    property: ['Gittata 6/18', 'Leggera'],
    weight: 1
  },
  {
    name: 'Mazza',
    id: 'mazza',
    type: 'Arma da mischia semplice',
    damageType: 'Contundente',
    damage: 'd6',
    property: [],
    weight: 2
  },
  {
    name: 'Pugnale',
    id: 'pugnale',
    type: 'Arma da mischia semplice',
    damageType: 'Perforante',
    damage: 'd4',
    property: ['Lancio 6/18', 'Accurata', 'Leggera'],
    weight: 0.5
  },
  {
    name: 'Randello',
    id: 'randello',
    type: 'Arma da mischia semplice',
    damageType: 'Contundente',
    damage: 'd4',
    property: ['Leggera'],
    weight: 1
  },
  {
    name: 'Randello Pesante',
    id: 'randelloPesante',
    type: 'Arma da mischia semplice',
    damageType: 'Contundente',
    damage: 'd8',
    property: ['Due mani'],
    weight: 5
  },
  {
    name: 'Arco Corto',
    id: 'arcoCorto',
    type: 'Arma a distanza semplice',
    damageType: 'Perforante',
    damage: 'd6',
    property: ['Gittata 24/96', 'Due mani', 'Munizioni'],
    weight: 1
  },
  {
    name: 'Balestra Leggera',
    id: 'balestraLeggera',
    type: 'Arma a distanza semplice',
    damageType: 'Perforante',
    damage: 'd8',
    property: ['Gittata 24/96', 'Due mani', 'Munizioni', 'Ricarica'],
    weight: 2.5
  },
  {
    name: 'Dardo',
    id: 'dardo',
    type: 'Arma a distanza semplice',
    damageType: 'Perforante',
    damage: 'd4',
    property: ['Lancio 6/18', 'Accurata'],
    weight: 0.125
  },
  {
    name: 'Fionda',
    id: 'fionda',
    type: 'Arma a distanza semplice',
    damageType: 'Contundente',
    damage: 'd4',
    property: ['Gittata 6/18', 'Munizioni'],
    weight: 0
  },
  {
    name: 'Alabarda',
    id: 'alabarda',
    type: 'Arma da mischia da guerra',
    damageType: 'Tagliente',
    damage: 'd10',
    property: ['Due mani', 'Pesante', 'Portata'],
    weight: 3
  },
  {
    name: 'Ascia Bipenne',
    id: 'asciaBipenne',
    type: 'Arma da mischia da guerra',
    damageType: 'Tagliente',
    damage: 'd12',
    property: ['Due mani', 'Pesante'],
    weight: 3.5
  },
  {
    name: 'Ascia da Battaglia',
    id: 'asciaBattaglia',
    type: 'Arma da mischia da guerra',
    damageType: 'Tagliente',
    damage: 'd8',
    property: ['Versatile (1d10)'],
    weight: 2
  },
  {
    name: 'Falcione',
    id: 'falcione',
    type: 'Arma da mischia da guerra',
    damageType: 'Tagliente',
    damage: 'd10',
    property: ['Due mani', 'Pesante', 'Portata'],
    weight: 3
  },
  {
    name: 'Frusta',
    id: 'frusta',
    type: 'Arma da mischia da guerra',
    damageType: 'Tagliente',
    damage: 'd4',
    property: ['Accurata', 'Portata'],
    weight: 1.5
  },
  {
    name: 'Lancia da Cavaliere',
    id: 'lanciaCavaliere',
    type: 'Arma da mischia da guerra',
    damageType: 'Perforante',
    damage: 'd12',
    property: ['Speciale', 'Portata'],
    weight: 3
  },
  {
    name: 'Maglio',
    id: 'maglio',
    type: 'Arma da mischia da guerra',
    damageType: 'Contundente',
    damage: '2d6',
    property: ['Due mani', 'Pesante'],
    weight: 5
  },
  {
    name: 'Martello da Guerra',
    id: 'martelloGuerra',
    type: 'Arma da mischia da guerra',
    damageType: 'Contundente',
    damage: 'd8',
    property: ['Versatile (1d10)'],
    weight: 1
  },
  {
    name: 'Mazzafrusto',
    id: 'mazzafrusto',
    type: 'Arma da mischia da guerra',
    damageType: 'Contundente',
    damage: 'd8',
    property: [],
    weight: 1
  },
  {
    name: 'Morning Star',
    id: 'morningStar',
    type: 'Arma da mischia da guerra',
    damageType: 'Perforante',
    damage: 'd8',
    property: [],
    weight: 2
  },
  {
    name: 'Picca',
    id: 'picca',
    type: 'Arma da mischia da guerra',
    damageType: 'Perforante',
    damage: 'd10',
    property: ['Due mani', 'Pesante', 'Portata'],
    weight: 9
  },
  {
    name: 'Piccone da Guerra',
    id: 'picconeGuerra',
    type: 'Arma da mischia da guerra',
    damageType: 'Perforante',
    damage: 'd8',
    property: [],
    weight: 1
  },
  {
    name: 'Scimitarra',
    id: 'scimitarra',
    type: 'Arma da mischia da guerra',
    damageType: 'Tagliente',
    damage: 'd6',
    property: ['Accurata', 'Leggera'],
    weight: 1.5
  },
  {
    name: 'Spada Corta',
    id: 'spadaCorta',
    type: 'Arma da mischia da guerra',
    damageType: 'Perforante',
    damage: 'd6',
    property: ['Accurata', 'Leggera'],
    weight: 1
  },
  {
    name: 'Spada Lunga',
    id: 'spadaLunga',
    type: 'Arma da mischia da guerra',
    damageType: 'Tagliente',
    damage: 'd8',
    property: ['Versatile (1d10)'],
    weight: 1.5
  },
  {
    name: 'Spadone',
    id: 'spadone',
    type: 'Arma da mischia da guerra',
    damageType: 'Tagliente',
    damage: '2d6',
    property: ['Due mani', 'Pesante'],
    weight: 3
  },
  {
    name: 'Stocco',
    id: 'stocco',
    type: 'Arma da mischia da guerra',
    damageType: 'Perforante',
    damage: 'd8',
    property: ['Accurata'],
    weight: 1
  },
  {
    name: 'Tridente',
    id: 'tridente',
    type: 'Arma da mischia da guerra',
    damageType: 'Perforante',
    damage: 'd6',
    property: ['Lancio 6/18', 'Versatile (1d8)'],
    weight: 2
  },
  {
    name: 'Arco Lungo',
    id: 'arcoLungo',
    type: 'Arma a distanza da guerra',
    damageType: 'Perforante',
    damage: 'd8',
    property: ['Gittata 45/180', 'Due mani', 'Munizioni', 'Pesante'],
    weight: 1
  },
  {
    name: 'Balestra a Mano',
    id: 'balestraMano',
    type: 'Arma a distanza da guerra',
    damageType: 'Perforante',
    damage: 'd6',
    property: ['Gittata 9/36', 'Ricarica', 'Munizioni', 'Leggera'],
    weight: 1.5
  },
  {
    name: 'Balestra Pesante',
    id: 'balestraPesante',
    type: 'Arma a distanza da guerra',
    damageType: 'Perforante',
    damage: 'd10',
    property: [
      'Gittata 30/120',
      'Due mani',
      'Munizioni',
      'Pesante',
      'Ricarica'
    ],
    weight: 9
  },
  {
    name: 'Cerbottana',
    id: 'cerbottana',
    type: 'Arma a distanza da guerra',
    damageType: 'Perforante',
    damage: '1',
    property: ['Gittata 7.5/30', 'Ricarica', 'Munizioni'],
    weight: 0.5
  },
  {
    name: 'Rete',
    id: 'rete',
    type: 'Arma a distanza da guerra',
    damageType: '-',
    damage: 'd8',
    property: ['Lancio 1.5/4.5', 'Speciale'],
    weight: 1.5
  }
]
