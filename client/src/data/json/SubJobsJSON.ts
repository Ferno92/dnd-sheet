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
        counterType: 'I',
        description:
          "Aquila: Finché il barbaro è in ira e non indossa un'armatura pesante, le altre creature dispongono di svantaggio ai tiri degli attacchi di opportunità contro di lui, e il barbaro può usare l'azione di Scatto come azione bonus nel suo turno. Lo spirito dell'aquila trasrorma il barbaro in un predatore che può sgusciare agilmente in mezzo a una mischia.  <br>Lupo: Finché il barbaro è in ira, i suoi amici dispongono di vantaggio ai tiri per colpire in mischia contro ogni creatura che si trovi entro 1,5 metri da lui e che gli sia ostile. Lo spirito del lupo trasforma il barbaro in un capobranco di cacciatori.  <br>Orso: Quando il barbaro è in ira, ottiene resistenza a tutti i danni tranne che a quelli psichici. Lo spirito dell'orso lo rende abbastanza robusto da sopportare qualsiasi aggressione."
      },
      {
        lv: 6,
        type: 'spiritoTotemico2',
        name: 'Spirito Totemico',
        counterType: 'II',
        description:
          "Aquila: Il barbaro ottiene la vista di un'aquila. Può vedere fino a 1,5 km di distanza senza difficoltà e discernere i dettagli come se osservasse qualcosa entro 30 metri da lui. Inoltre, la luce fioca non impone svantaggio alle sue prove di Saggezza (Percezione). <br>Lupo: li barbaro ottiene gli istinti cacciatori di un lupo. Può seguire le tracce delle altre creature mentre viaggia a passo veloce e può muoversi furtivamente mentre viaggia a passo normale.  <br>Orso: Il barbaro ottiene la potenza di un orso. La sua capacità di trasporto (incluso il carico massimo e il sollevamento massimo) raddoppia e il barbaro dispone di vantaggio alle prove di Forza effettuate per spingere, trascinare, sollevare o spezzare oggetti."
      }
    ]
  },
  {
    type: 'Chierico_Vita',
    name: 'Dominio della Vita',
    levels: [],
    ts: [],
    dice: '',
    abilitiesCount: 0,
    abilities: [],
    privileges: [
      {
        lv: 1,
        type: 'discepolo',
        name: 'Discepolo della Vita',
        description:
          "Gli incantesimi di guarigione del chierico diventano più efficaci. Ogni volta che il chierico usa un incantesimo di 1· uvello o di livello superiore per ripristinare i punti ferita di una creatura, quella creatura recupera un ammontare di punti ferita aggiuntivi pari a 2 + il livello dell'incantesimo."
      },
      {
        lv: 2,
        type: 'vita',
        name: 'Incanalare Divinità: Preservare Vita',
        description:
          "Il chierico può utilizzare Incanalare Divinità per curare chi è stato gravemente ferito. Con un'azione, il chierico brandisce il suo simbolo sacro ed evoca un flusso di energia curativa che può ripristinare un numero di punti ferita pari a cinque volte il suo livello da chierico. Sceglie le creature desiderate purché siano situate entro 9 metri da lui e suddivide questo ammontare di punti ferita tra di esse. Questo privilegio può ripristinare in una creatura un ammontare di punti ferita che la riporti a non più della metà del suo massimo dei punti ferita. Il chierico non può utilizzare questo privilegio su un costrutto o su un non morto."
      },
      {
        lv: 6,
        type: 'benedetto',
        name: 'Guaritore Benedetto',
        description:
          "Gli incantesimi curativi che il chierico lancia sugli altri guariscono anche lui. Quando il chierico lancia un incantesimo di 1' livello o di livello superiore che ripristina punti ferita in una creatura diversa da lui, egli recupera un ammontare di punti ferita pari a 2 il livello dell'incantesimo."
      }
    ]
  },
  {
    type: 'Guerriero_Campione',
    name: 'Campione',
    levels: [],
    ts: [],
    dice: '',
    abilitiesCount: 0,
    abilities: [],
    privileges: [
      {
        lv: 3,
        type: 'criticoMigliorato',
        name: 'Critico Migliorato',
        description:
          "I tuoi attacchi con un'arma mettono a segno un colpo critico con un risultato di 19-20 al tiro."
      },
      {
        lv: 7,
        type: 'atleta',
        name: 'Atleta Straordinario',
        description:
          'Il guerriero può aggiungere metà del suo bonus di competenza (arrotondalo per eccesso) a qualsiasi prova di Forza, Destrezza o Coatituzione che effettua e che non utilizzi già il suo bonus di competenza. Inoltre. quando il guerriero effettua un salto in lungo con rincorsa, la distanza che copre aumenta di 30 cm per ogni punto del suo modificatore di Forza.'
      }
    ]
  },
  {
    type: 'Guerriero_Maestro',
    name: 'Maestro di Battaglia',
    levels: [],
    ts: [],
    dice: '',
    abilitiesCount: 0,
    abilities: [],
    privileges: [
      {
        lv: 3,
        type: 'superiorita',
        name: 'Superiorità in Combattimento',
        description:
          'Il guerriero apprende alcune manovre alimentate da dadi speciali chiamati dadi di superiorità<br><b>Manovre.</b> Il guerriero apprende tre manovre a sua scelta, descritte nella sezione "Manovre" seguente. Molte manovre potenziano un attacco in qualche modo. li guerriero può usare soltanto una manovra per attacco. Ogni volta che apprende nuove manovre, può anche sostituire una manovra che conosce con una manovra diversa.<br><b>Dadi di Superiorità.</b> Il guerriero possiede quattro dadi di superiorità, rappresentati da d8. Quando il guerriero usa un dado di superiorità, lo spende. Recupera tutti i dadi di superiorità quando completa un riposo breve o lungo.<br><b>Tiri Salvezza.</b> Alcune manovre del guerriero richiedono che il bersaglio effettui un tiro salvezza per resistere agli effetti della manovra. La CD del tiro salvezza va calcolata come segue:<br>CD del tiro salvezza della manovra = 8 + il bonus di competenza del guerriero + il modificatore di Forza o di Destrezza del guerriero (a scelta del guerriero)',
        counterType: 'I'
      },
      {
        lv: 3,
        type: 'studioso',
        name: 'Studioso di Guerra',
        description:
          'Il guerriero ottiene competenza in un tipo di strumenti da artigiano a sua scelta.'
      },
      {
        lv: 7,
        type: 'studioso',
        name: 'Studioso di Guerra',
        description:
          "Se il guerriero spende almeno 1 minuto a osservare un'altra creatura al di fuori del combattimento o a interagire con essa, può apprendere alcune informazioni relative alle capacità di quella reatura, confrontandole con le proprie. Il DM rivela al guerriero se la creatura gli è pari, superiore o inferiore relativamente a due dei seguenti tratti a scelta del guerriero:<br>• Punteggio di Forza<br>• Punteggio di Destrezza<br>• Punteggio di Costituzione<br>• Classe Armatura<br>• Punti ferita attuali<br>• Livelli di classe totali (se ne possiede)<br>• Livelli di classe da guerriero (se ne possiede)"
      }
    ]
  },
  //TODO {
  //   type: 'Guerriero_Mistico',
  //   name: 'Cavaliere Mistico',
  //   levels: [],
  //   ts: [],
  //   dice: '',
  //   abilitiesCount: 0,
  //   abilities: [],
  //   privileges: []
  // },
  {
    type: 'Stregone_Draconico',
    name: 'Discendenza Draconica',
    levels: [],
    ts: [],
    dice: '',
    abilitiesCount: 0,
    abilities: [],
    privileges: [
      {
        lv: 1,
        type: 'antenato',
        name: 'Antenato Draconico',
        description:
          'Lo stregone sceglie un tipo di drago come suo antenato. Il tipo di danno associato a ogni drago sarà utilizzato dai privilegi che lo stregone otterrà in seguito. Lo stregone è in grado di parlare, leggere e scrivere in Draconico. Inoltre, ogni volta che effettua una prova di Carisma per interagire con i draghi, il suo bonus di competenza raddoppia se è applicabile alla prova.'
      },
      {
        lv: 1,
        type: 'resilienza',
        name: 'Resilienza Draconica',
        description:
          'La magia, scorrendo nel corpo dello stregone, fa emergere alcuni tratti fisici dei draghi suoi antenati. Il massimo dei punti ferita dello stregone aumenta di 1 e aumenta di nuovo di l ogni volta che il personaggio acquisisce un livello in que ta classe. Inoltre, alcune parti della sua pelle si ricoprono di un sottile strato di scaglie simili a quelle di un drago. Quando lo stregone non indossa armature, fa sua CA è pari a 13 + il suo modificatore di Destrezza.'
      },
      {
        lv: 6,
        type: 'affinita',
        name: 'Affinità Elementale',
        description:
          'Quando lo stregone lancia un incantesimo che infligge danni del tipo associato al suo antenato draconico, può aggiungere il suo modificatore di Carisma a un tiro per i danni di quetrincantesimo. Allo stesso tempo, lo stregone può spendere 1 punto stregoneria per ottenere resistenza a quel tipo di danno per 1 ora.'
      }
    ]
  },
  {
    type: 'Stregone_Selvaggio',
    name: 'Magia Selvaggia',
    levels: [],
    ts: [],
    dice: '',
    abilitiesCount: 0,
    abilities: [],
    privileges: [
      {
        lv: 1,
        type: 'impulso',
        name: 'Impulso di Magia Selvaggia',
        description:
          "Lo stregone può sprigionare impulsi di magia incontrollata quando lancia i suoi incantesimi. Una volta per turno il DM può chiedergli di tirare un d20 subito dopo avere lanciato un incantesimo da stregone di livello pari o superiore al 1. Se ottiene un 1, deve tirare sulla tabella 'Impulsi di Magia Selvaggia' per generare un effetto magico. Se quell'effetto è un incantesimo, è troppo selvaggio per essere influenzato dalla sua Metamagia, e se normalmente richiede concentrazione, in questo caso non richiede concentrazione l'incantesimo permane per la sua durata completa."
      },
      {
        lv: 1,
        type: 'caos',
        name: 'Onde di Caos',
        description:
          "Lo stregone può manipolare le forze della probabilità e del caos per ottenere vantaggio a un tiro per colpire, una prova di caratteristica o un tiro salvezza. Una volta che l'ha fatto, deve completare un riposo lungo prima che possa utilizzare di nuovo questo privilegio."
      },
      {
        lv: 6,
        type: 'fortuna',
        name: 'Piegare la Fortuna',
        description:
          "Lo stregone sviluppa la capacità di alterare il fato usando la sua magia selvaggia. Quando un'altra creatura che lo stregone sia in grado di vedere effettua un tiro per colpire, una prova di caratteristica o un tiro salvezza, lo stregone può usare la sua reazione e spendere 2 punti stregoneria per tirare ld4 e applicare il risultato ottenuto come bonus o penalità (a sua scelta) al tiro della creatura. Può farlo dopo che la creatura ha effettuato il tiro, ma prima che qualsiasi effetto del tiro si verifichi."
      }
    ]
  },
  {
    type: 'Warlock_Fatato',
    name: 'Signore Fatato',
    levels: [],
    ts: [],
    dice: '',
    abilitiesCount: 0,
    abilities: [],
    privileges: [
      {
        lv: 1,
        type: 'lista',
        name: 'Lista ampliata degli incantesimi',
        description:
          'Il Signore Fatato consente al warlock di accedere a una lista ampliata di incantesimi quando deve apprendere un incantesimo da warlock. Il warlock aggiunge gli incantesimi seguenti alla sua lista degli incantesimi da warlock: 1- Luminescenza, sonno;<br> 2- Allucinazione di forza, Calmare emozioni;<br> 3- Crescita vegetale, Intermittenza;<br> 4- Dominare bestie, Invisibilità superiore;<br> 5- Dominare persone, Sembrare'
      },
      {
        lv: 1,
        type: 'presenza',
        name: 'Presenza Fatata',
        description:
          "Il patrono conferisce al warJock la capacità di emanare Ja presenza seducente e inquietante tipica dei folletti. Con un'azione, il warlock può obbligare ogni creatura entro un cubo con spigolo di 3 metri originato da lui a effettuare un tiro salvezza su Saggezza contro la CD degli incantesimi del warlock. Le creature che falliscono il loro tiro salvezza sono tutte affascinate o spaventate dal warlock (a scelta di quest'ultimo) fino alla fin e del suo turno successivo. Una volta utilizzato questo privilegio, il warlock non può più utilizzarlo finché non completa un riposo breve o lungo."
      },
      {
        lv: 6,
        type: 'fuga',
        name: 'Fuga Velata',
        description:
          "Il warlock può svanire in uno sbuffo di nebbia in risposta a un effetto dannoso. Quando il warlock subisce danni, può usare la sua reazione per diventare invisibile e teletrasportarsi di un massimo di 18 metri fino a uno spazio libero che egli sia in grado di vedere. Rimane invisibile fino all'inizio del suo turno successivo o finché non attacca o lancia un incantesimo. Una volta utilizzato questo privilegio, il warlock non può più utilizzarlo finché non completa un riposo breve o lungo."
      }
    ]
  },
  {
    type: 'Warlock_Immondo',
    name: 'Immondo',
    levels: [],
    ts: [],
    dice: '',
    abilitiesCount: 0,
    abilities: [],
    privileges: [
      {
        lv: 1,
        type: 'lista',
        name: 'Lista ampliata degli incantesimi',
        description:
          "L'immondo consente al warlock di accedere a una lista ampliata di incantesimi quando deve apprendere un incantesimo da warlock. Il warlock aggiunge gli incantesimi seguenti alla sua lista degli incantesimi da warlock: 1- Comando, Mani brucianti;<br> 2- Cecità/Sordità, Raggio rovente;<br> 3- Numbe maleodorante, palla di fuoco;<br> 4- Muro di fuoco, Scudo di fuoco;<br> 5- Colpo infuocato, santificare"
      },
      {
        lv: 1,
        type: 'benedizione',
        name: "Benedizione dell'Oscuro",
        description:
          'Quando il warlock porta una creatura ostile a O punti ferita, ottiene un ammontare di punti ferita temporanei pari al proprio modificatore di Carisma + il proprio livello da warlock (fino a un minimo di 1).'
      },
      {
        lv: 6,
        type: 'fortuna',
        name: "Fortuna dell'Oscuro",
        description:
          'Il warlock può appellarsi al suo patrono per alterare il fato in suo favore. Quando effettua una prova di caratteristica o un tiro salvezza, può utilizzare questo privilegio per aggiungere un dlO al suo tiro. Può farlo dopo avere visto il tiro iniziale, ma prima che qualsiasi effetto del tiro sia applicato. Una volta utilizzato questo privilegio, il warlock non può più utilizzarlo finché non completa un riposo breve o lungo.'
      }
    ]
  },
  {
    type: 'Warlock_Antico',
    name: 'Grande Antico',
    levels: [],
    ts: [],
    dice: '',
    abilitiesCount: 0,
    abilities: [],
    privileges: [
      {
        lv: 1,
        type: 'lista',
        name: 'Lista ampliata degli incantesimi',
        description:
          "L'immondo consente al warlock di accedere a una lista ampliata di incantesimi quando deve apprendere un incantesimo da warlock. Il warlock aggiunge gli incantesimi seguenti alla sua lista degli incantesimi da warlock: 1- Risata incontenibile di Tasha, Sussurri dissonanti;<br> 2- Allucinazione di Forza, Individuazione dei pensieri;<br> 3- Chiaroveggenza, Inviare;<br> 4- Dominare bestie, Tentacoli neri di Evard;<br> 5- Dominare persone, Telecines"
      },
      {
        lv: 1,
        type: 'mente',
        name: 'Mente Risvegliata',
        description:
          "Il warlock può usare le sue conoscenze aliene per sfiorare le menti delle altre creature. Può parlare telepaticamente con qualsiasi creatura che si trovi entro 9 metri da lui e che egli sia in grado di vedere. Non è necessario che condivida un linguaggio con la creatura affinché quest'ultima capisca ciò che egli enuncia telepaticamente, ma la creatura deve essere in grado di capire almeno un linguaggio."
      },
      {
        lv: 6,
        type: 'interdizione',
        name: 'Interdizione Entropica',
        description:
          "Il warlock impara a proteggersi magicamente dagli attacchi e a trasformare il colpo faJlito di un nemico in un colpo di fortuna per lui. Quando una creatura effettua un tiro per colpire contro di lui, il warlock può usare la sua reazione per infliggere svantaggio a quel tiro. Se l'attacco lo manca, il successivo tiro per colpire del warlock contro la creatura dispone di vantaggio purché il warlock lo effettui entro la fine del proprio turno successivo. Una volta utilizzato questo privilegio, il warlock non può più utilizzarlo finché non completa un riposo breve o lungo."
      }
    ]
  },
  {
    type: 'Warlock_Hexblade',
    name: 'The Hexblade',
    levels: [],
    ts: [],
    dice: '',
    abilitiesCount: 0,
    abilities: [],
    privileges: [
      {
        lv: 1,
        type: 'lista',
        name: 'Lista ampliata degli incantesimi',
        description:
          "L'Hexblade consente al warlock di accedere a una lista ampliata di incantesimi quando deve apprendere un incantesimo da warlock. Il warlock aggiunge gli incantesimi seguenti alla sua lista degli incantesimi da warlock: 1- Scudo, Wrathful smite;<br> 2- Sfocatura, Branding smite;<br> 3- Blink, Arma Elementale;<br> 4- Phantasmal killer, Staggering smite;<br> 5- Banishing smite, Cono di freddo"
      },
      {
        lv: 1,
        type: 'curse',
        name: 'Hexblade’s Curse',
        description:
          'You gain the ability to place a bale—ful curse on someone. As a bonus action, choose one creature you can see within 30 feet of you. The target is cursed for 1 minute. The curse ends early if the target dies, you die, or you are incapacitated. Until the curse ends, you gain the following benefits:<br>- You gain a bonus to damage rolls against the cursed target. The bonus equals your proficiency bonus.<br>- Any attack roll you make against the cursed target is a critical hit on a roll of 19 or 20 on the d20.<br>- If the cursed target dies, you regain hit points equal to your warlock level + your Charisma modifier (minimum of 1 hit point).<br> You can’t use this feature again until you finish a short or long rest.'
      },
      {
        lv: 1,
        type: 'warrior',
        name: 'Hex Warrior',
        description:
          'You acquire the training necessary to effectively arm yourself for battle. You gain proficiency with medium armor, shields, and martial weapons. The influence of your patron also allows you to mystically channel your will through a particular weapon. Whenever you finish a long rest, you can touch one weapon that you are proficient with and that lacks the two-handed property. When you attack with that weapon, you can use your Charisma modifier, instead of Strength or Dexterity, for the attack and damage rolls. This benefit lasts until you finish a long rest.'
      },
      {
        lv: 6,
        type: 'specter',
        name: 'Accursed Specter',
        description:
          'You can curse the soul of a person you slay, temporarily binding it to your service. When you slay a humanoid, you can cause its Spirit to rise from its corpse as a specter, the statistics for which are in the Monster Manual. When the specter appears, it gains temporary hit points equal to half your warlock level. Roll initiative for the specter, which has its own turns. It obeys your verbal commands, and it gains a special bonus to its attack rolls equal to your Charisma modifier (minimum of +0). The specter remains in your service until the end of your next long rest, at which point it vanishes to the afterlife. Once you bind a specter with this feature, you can’t use the feature again until you finish a long rest.'
      }
    ]
  }
]
