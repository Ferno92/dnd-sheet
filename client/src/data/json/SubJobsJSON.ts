export default [
  {
    type: 'Barbaro_Berserker',
    name: 'Cammino del Berserker',
    levels: [],
    ts: [],
    dice: '',
    abilitiesCount: 0,
    abilities: [],
    privileges: [
      {
        lv: 3,
        type: 'frenesia',
        name: 'Frenesia',
        description:
          "Il barbaro può entrare in frenesia quando entra in ira. Se lo fa, per la durata della sua ira può effettuare un singolo attacco con un'arma da mischia come azione bonus in ognuno dei suoi turni successivi dopo di questo. Quando la sua ira termina, il barbaro subisce un livello di indebolimento"
      },
      {
        lv: 6,
        type: 'iraIncontenibile',
        name: 'Ira Incontenibile',
        description:
          "Il barbaro non può essere affascinato o spaventato mentre è in ira. Se è affascinato o spaventato quando entra in ira, quell'effetto è sospeso per tutta la durata dell'ira."
      }
    ]
  },
  {
    type: 'Barbaro_Totemico',
    name: 'Cammino del Combattente Totemico',
    levels: [],
    ts: [],
    dice: '',
    abilitiesCount: 0,
    abilities: [],
    privileges: [
      {
        lv: 3,
        type: 'cercatoreDiSpiriti',
        name: 'Cercatore di Spiriti',
        description:
          'Il barbaro ottiene la capacità di lanciare gli incantesimi percezione delle bestie e parlare con Ali animali, ma solo come rituali.'
      },
      {
        lv: 3,
        type: 'spiritoTotemico',
        name: 'Spirito Totemico',
        description:
          "Aquila: Finché il barbaro è in ira e non indossa un'armatura pesante, le altre creature dispongono di svantaggio ai tiri degli attacchi di opportunità contro di lui, e il barbaro può usare l'azione di Scatto come azione bonus nel suo turno. Lo spirito dell'aquila trasrorma il barbaro in un predatore che può sgusciare agilmente in mezzo a una mischia.  <br>Lupo: Finché il barbaro è in ira, i suoi amici dispongono di vantaggio ai tiri per colpire in mischia contro ogni creatura che si trovi entro 1,5 metri da lui e che gli sia ostile. Lo spirito del lupo trasforma il barbaro in un capobranco di cacciatori.  <br>Orso: Quando il barbaro è in ira, ottiene resistenza a tutti i danni tranne che a quelli psichici. Lo spirito dell'orso lo rende abbastanza robusto da sopportare qualsiasi aggressione."
      },
      {
        lv: 6,
        type: 'spiritoTotemico',
        name: 'Spirito Totemico',
        description:
          "Aquila: Il barbaro ottiene la vista di un'aquila. Può vedere fino a 1,5 km di distanza senza difficoltà e discernere i dettagli come se osservasse qualcosa entro 30 metri da lui. Inoltre, la luce fioca non impone svantaggio alle sue prove di Saggezza (Percezione). <br>Lupo: li barbaro ottiene gli istinti cacciatori di un lupo. Può seguire le tracce delle altre creature mentre viaggia a passo veloce e può muoversi furtivamente mentre viaggia a passo normale.  <br>Orso: Il barbaro ottiene la potenza di un orso. La sua capacità di trasporto (incluso il carico massimo e il sollevamento massimo) raddoppia e il barbaro dispone di vantaggio alle prove di Forza effettuate per spingere, trascinare, sollevare o spezzare oggetti."
      }
    ]
  }
]
