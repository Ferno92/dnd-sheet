export enum Races {
  Umano,
  Nano
}
export enum SubRaces {
  Colline,
  Montagne
}

export function getRaces(race: Races): any {
  switch (race) {
    case Races.Nano:
      return {
        stat: {
          'cos': 2
        }
      };
  }
}
export function getSubRaces(race: SubRaces): any {
  switch (race) {
    case SubRaces.Colline:
      return {
        stat: {
          'sag': 1
        }
      };
    case SubRaces.Montagne:
      return {
        stat: {
          'for': 2
        }
      };
  }
}
