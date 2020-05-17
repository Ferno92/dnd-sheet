import StatsType from 'data/types/StatsEnum'
import AbilitiesEnum from 'data/types/AbilitiesEnum'
import RestType from 'data/types/RestType'
import ArmorType from 'data/types/ArmorType'

export default [
  {
    type: 'Barbaro',
    name: 'Barbaro',
    ts: [StatsType.Forza, StatsType.Costituzione],
    dice: 12,
    abilitiesCount: 2,
    abilities: [
      AbilitiesEnum.AddestrareAnimali,
      AbilitiesEnum.Atletica,
      AbilitiesEnum.Intimidire,
      AbilitiesEnum.Natura,
      AbilitiesEnum.Percezione,
      AbilitiesEnum.Sopravvivenza,
    ],
    multiclass: [
      {
        lv: 1,
        type: 'competenza',
        name: 'Competenza armi e armature (Barbaro)',
        description:
          'Un Barbaro è competente negli scudi, armi semplici e armi da guerra',
        extra: `competenza|{"armorList":["${ArmorType.Scudo}"],"weaponList":["semplice","guerra"]}`,
      },
    ],
    privileges: [
      {
        lv: 1,
        type: 'competenzaBase',
        name: 'Competenza armi e armature',
        description:
          'Un Barbaro è competente negli scudi. armature leggere e medie, armi semplici e armi da guerra',
        extra: `competenza|{"armorList":["${ArmorType.Scudo}","${ArmorType.Leggera}","${ArmorType.Media}"],"weaponList":["semplice","guerra"]}`,
      },
      {
        lv: 1,
        type: 'ira',
        name: 'Ira',
        description:
          'In battaglia, un barbaro combatte animato da una ferocia primordiale. Nel suo turno può entrare in ira come azione bonus.',
        counter: 2,
        counterType: 'volte',
        rest: RestType.Long,
      },
      {
        lv: 1,
        type: 'difesaSenzaArmatura',
        name: 'Difesa Senza Armatura',
        description:
          'Finché un barbaro non indossa alcuna armatura, la sua Classe Armatura è pari a 10 + il suo modificatore di Destrezza + il suo modificatore di Costituzione. Un barbaro può usare uno scudo e ottenere comunque questo beneficio.',
      },
      {
        lv: 2,
        type: 'attaccoIrruento',
        name: 'Attacco Irruento',
        description:
          'Quando effettua il suo primo attacco nel suo turno, può decidere di sferrare un attacco irruento. Così facendo dispone di vantaggio ai tiri per colpire in mischia che usano Forza durante questo turno, ma i tiri per colpire contro di lui dispongono di vantaggio fino al suo turno successivo.',
      },
      {
        lv: 2,
        type: 'percezioneDelPericolo',
        name: 'Percezione del Pericolo',
        description:
          'Un barbaro dispone di vantaggio ai tiri salvezza su Destrezza contro gli effetti che può vedere, come le trappole e gli incantesimi. Per ottenere questo beneficio il barbaro non deve essere accecato, assordato o incapacitato.',
      },
      {
        lv: 3,
        type: 'camminoPrimordiale',
        name: 'Cammino Primordiale',
        description:
          'Un barbaro sceglie un cammino che definisce la natura della sua furia. Può scegliere il Cammino del Berserker o il Cammino del Combattente Totemico.',
      },
      {
        lv: 3,
        type: 'ira',
        name: 'Ira',
        description:
          'In battaglia, un barbaro combatte animato da una ferocia primordiale. Nel suo turno può entrare in ira come azione bonus.',
        counter: 3,
        counterType: 'volte',
        rest: RestType.Long,
      },
      {
        lv: 5,
        type: 'attaccoExtra',
        name: 'Attacco Extra',
        description:
          "Un barbaro può attaccare due volte anziché una, ogni volta che effettua l'azione di Attacco nel proprio turno.",
      },
      {
        lv: 5,
        type: 'movimentoVeloce',
        name: 'Movimento Veloce',
        description:
          "La velocità del barbaro aumenta di 3 metri purché il barbaro non indossi un'armatura pesante.",
      },
      {
        lv: 6,
        type: 'ira',
        name: 'Ira',
        description:
          'In battaglia, un barbaro combatte animato da una ferocia primordiale. Nel suo turno può entrare in ira come azione bonus.',
        counter: 4,
        counterType: 'volte',
        rest: RestType.Long,
      },
      {
        lv: 7,
        type: 'istintoFerino',
        name: 'Istinto Ferino',
        description:
          "Gli istinti del barbaro sono talmente affinati da fornirgli vantaggio ai tiri per l'iniziativa. Inoltre, se il barbaro è sorpreso all'inizio del combattimento e non è incapacitato, può agire normalmente nel suo primo turno, ma solo se entra in ira prima di fare qualsiasi altra cosa in quel turno.",
      },
      {
        lv: 9,
        type: 'criticoBrutale',
        name: 'Critico Brutale',
        description:
          "Un barbaro può tirare un dado dell'arma aggiuntivo quando determina i danni extra di un colpo critico con un attacco in mischia.",
      },
    ],
  },
  {
    type: 'Chierico',
    name: 'Chierico',
    ts: [StatsType.Saggezza, StatsType.Carisma],
    dice: 8,
    abilitiesCount: 2,
    abilities: [
      AbilitiesEnum.Intuizione,
      AbilitiesEnum.Medicina,
      AbilitiesEnum.Persuasione,
      AbilitiesEnum.Religione,
      AbilitiesEnum.Storia,
    ],
    spellsByJobLevel: [
      {
        id: 1,
        known: 0,
        spells: [{ level: 0, slot: 3 }, { level: 1, slot: 2 }],
      },
      {
        id: 2,
        known: 0,
        spells: [{ level: 0, slot: 3 }, { level: 1, slot: 3 }],
      },
      {
        id: 3,
        known: 0,
        spells: [
          { level: 0, slot: 3 },
          { level: 1, slot: 4 },
          { level: 2, slot: 2 },
        ],
      },
      {
        id: 4,
        known: 0,
        spells: [
          { level: 0, slot: 4 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
        ],
      },
      {
        id: 5,
        known: 0,
        spells: [
          { level: 0, slot: 4 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
          { level: 3, slot: 2 },
        ],
      },
      {
        id: 6,
        known: 0,
        spells: [
          { level: 0, slot: 4 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
          { level: 3, slot: 3 },
        ],
      },
      {
        id: 7,
        known: 0,
        spells: [
          { level: 0, slot: 4 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
          { level: 3, slot: 3 },
          { level: 4, slot: 1 },
        ],
      },
      {
        id: 8,
        known: 0,
        spells: [
          { level: 0, slot: 4 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
          { level: 3, slot: 3 },
          { level: 4, slot: 2 },
        ],
      },
    ],
    multiclass: [
      {
        lv: 1,
        type: 'competenza',
        name: 'Competenza armi e armature (Chierico)',
        description:
          'Un Chierico è competente negli scudi, armature leggere e medie',
        extra: `competenza|{"armorList":["${ArmorType.Leggera}","${ArmorType.Media}","${ArmorType.Scudo}"]}`,
      },
    ],
    privileges: [
      {
        lv: 1,
        type: 'competenzaBase',
        name: 'Competenza armi e armature (Chierico)',
        description:
          'Un Chierico è competente negli scudi, armature leggere e medie, armi semplici',
        extra: `competenza|{"armorList":["${ArmorType.Leggera}","${ArmorType.Media}","${ArmorType.Scudo}"], weaponList:["semplice"]}`,
      },
      {
        lv: 1,
        type: 'dominio',
        name: 'Dominio Divino',
        description:
          'Il chierico sceglie un dominio correlato alla sua divinità: Conoscenza, Guerra, Inganno, Luce, Natura. Tempesta o Vita. Ogni dominio è descritto in dettaglio alla fine della sezione di questa classe e fornisce esempi di varie divinità a esso associate. Questa scelta conferisce al chierico alcuni incantesimi di dominio e altri privilegi',
      },
      {
        lv: 1,
        type: 'incantesimiDominio',
        name: 'Incantesimi di Dominio',
        description:
          "A ogni dominio corrisponde una lista di incantesimi (gli incantesimi di dominio) che il chierico ottiene ai livelli da chierico indicati nella descrizione del dominio. Quando un chierico ottiene un incantesimo di dominio, quell'incantesimo è sempre considerato preparato e non conta al fine determinare il numero di incantesimi che il chierico può preparare ogni giorno. Se il chierico possiede un incantesimo di dominio che non compare sulla lista degli incantesimi da chierico, quell'incantesimo è comunque considerato un incantesimo da chierico per lui.",
      },
      {
        lv: 2,
        type: 'incanalare',
        name: 'Incanalare Divinità',
        description:
          "Un chierico ottiene la capacità di incanalare energia divina direttamente dalla sua divinità e usa quell'energia per alimentare gli effetti magici. Un chierico parte con due effetti di questo tipo: Scacciare Non Morti e un effetto determinato dal suo dominio. Alcuni domini conferiscono al chierico degli effetti aggiuntivi an mano che avanza di livello, nel modo indicato nella descrizione del dominio. Quando un chierico utilizza Incanalare Divinità, può scegliere quale effetto creare. Deve poi completare un riposo breve o lungo per utilizzare di nuovo Incanalare Divinità. Alcuni effetti di Incanalare Divinità richiedono dei tiri salvezza. Quando un chierico utilizza un tale effetto, la CD è pari alla CD del tiro salvezza dei suoi incantesimi da chierico.",
        counter: 1,
      },
      {
        lv: 2,
        type: 'scacciare',
        name: 'Incanalare Divinità: Scacciare non morti',
        description:
          "Con un'azione, il chierico brandisce il suo simbolo sacro e pronuncia una preghiera di condanna nei confronti dei non morti. Ogni non morto che è in grado vedere o sentire il chierico e si trova entro 9 metri da lui deve effettuare un tiro salvezza su Saggezza. Se lo fallisce, In creatura è scacciata per 1 minuto o finché non subisce danni. Una creatura scacciata deve spendere i suoi turni tentando di allontanarsi il più possibile dal chierico e non può volontariamente muoversi in uno spazio entro 9 metri dal chierico. Inoltre, non può effettuare reazioni. Come sua azione può usare solo l'azione di Scatto o tentare di ruggire da un effetto che gli impedisce di muoversi. Se non può muoversi in alcun luogo, la creatura può usare l'azione di Schivata.",
      },
      {
        lv: 4,
        type: 'punteggio',
        name: 'Aumento punteggio caratteristica',
        description:
          "Quando arriva al 4' livello, e poi di nuovo all'8', 12', 16' e 19' livello, un chierico può aumentare di 2 un punteggio di caratteristica a sua scelta, oppure può aumentare di 1 due punteggi di caratteristica a sua scelta. Come di consueto, non è consentito aumentare un punteggio di caratteristica a più di 20 utilizzando questo privilegio.",
      },
      {
        lv: 4,
        type: 'distruggere',
        name: 'Distruggere Non Morti',
        description:
          'Quando un non morto fallisce il suo tiro salvezza contro il privilegio Scacciare Non Morti del chierico, quella creatura è distrutta istantaneamente se il suo grado di sfida è pari o inferiore a una certa soglia. <br> LV.5- GS 1/2 o inferiore',
      },
      {
        lv: 6,
        type: 'incanalare',
        name: 'Incanalare Divinità',
        description:
          "Un chierico ottiene la capacità di incanalare energia divina direttamente dalla sua divinità e usa quell'energia per alimentare gli effetti magici. Un chierico parte con due effetti di questo tipo: Scacciare Non Morti e un effetto determinato dal suo dominio. Alcuni domini conferiscono al chierico degli effetti aggiuntivi an mano che avanza di livello, nel modo indicato nella descrizione del dominio. Quando un chierico utilizza Incanalare Divinità, può scegliere quale effetto creare. Deve poi completare un riposo breve o lungo per utilizzare di nuovo Incanalare Divinità. Alcuni effetti di Incanalare Divinità richiedono dei tiri salvezza. Quando un chierico utilizza un tale effetto, la CD è pari alla CD del tiro salvezza dei suoi incantesimi da chierico.",
        counter: 2,
      },
      {
        lv: 8,
        type: 'distruggere',
        name: 'Distruggere Non Morti',
        description:
          'Quando un non morto fallisce il suo tiro salvezza contro il privilegio Scacciare Non Morti del chierico, quella creatura è distrutta istantaneamente se il suo grado di sfida è pari o inferiore a una certa soglia. <br> LV.8- GS 1 o inferiore',
      },
    ],
  },
  {
    type: 'Guerriero',
    name: 'Guerriero',
    ts: [StatsType.Forza, StatsType.Costituzione],
    dice: 10,
    abilitiesCount: 2,
    abilities: [
      AbilitiesEnum.Acrobazia,
      AbilitiesEnum.AddestrareAnimali,
      AbilitiesEnum.Atletica,
      AbilitiesEnum.Intimidire,
      AbilitiesEnum.Intuizione,
      AbilitiesEnum.Percezione,
      AbilitiesEnum.Sopravvivenza,
      AbilitiesEnum.Storia,
    ],
    multiclass: [
      {
        lv: 1,
        type: 'competenza',
        name: 'Competenza armi e armature (Guerriero)',
        description:
          'Un Guerriero è competente negli scudi, armature leggere e medie, armi semplici e armi da guerra',
        extra: `competenza|{"armorList":["${ArmorType.Scudo}","${ArmorType.Leggera}","${ArmorType.Media}"],"weaponList":["semplice","guerra"]}`,
      },
    ],
    privileges: [
      {
        lv: 1,
        type: 'competenzaBase',
        name: 'Competenza armi e armature',
        description:
          'Il guerriero è competente in tutte le armature e scudi, nelle armi semplici e da guerra.',
        extra: `competenza|{"armorList":["${ArmorType.Scudo}","${ArmorType.Leggera}","${ArmorType.Media}","${ArmorType.Pesante}"],"weaponList":["semplice","guerra"]}`,
      },
      {
        lv: 1,
        type: 'stile',
        name: 'Stile di combattimento',
        description:
          "Un guerriero adotta uno stile di combattimento in cui specializzarsi scegliendo una tra le opzioni seguenti.<br> <b>COMBATTERE CON ARMI POSSENTI</b><br> Quando il guerriero ottiene un 1 o un 2 a un tiro per i danni di un attacco che ha effettuato con un'arma da mischia impugnata a due mani, può ripetere il tiro e deve usare il nuovo risultato, anche se ottiene ancora un 1 o un 2. L'arma deve possedere la proprietà a due mani o versatile affinché il guerriero ottenga questo beneficio. <b>COMBATTERE CON DUE ARMI</b><br> Quando il guerriero combatte con due armi, può aggiungere il suo modificatore di caratteristica ai danni del secondo attacco. <b>DIFESA</b><br> Finché indossa unarmatura, il guerriero ottiene un bonus di + 1 alla CA. <b>DUELLARE</b><br> Quando il guerriero impugna un'arma da mischia in una mano e non impugna altre armi, ottiene un bonus di +2 ai tiri per i danni di quell'arma. <b>PROTEZIONE</b><br> Quando una creatura che iJ guerriero sia in grado di vedere attacca un bersaglio diverso dal guerriero e situato entro 1,5 metri da lui, il guerriero può usare la sua reazione per infliggere svantaggio al tiro per colpire della creatura. Il guerriero deve impugnare uno scudo. <b>TIRO</b><br> Il guerriero ottiene un bonus di +2 ai tiri per colpire che effettua con te armi a distanza.",
      },
      {
        lv: 1,
        type: 'recuperareEnergie',
        name: 'Recuperare Energie',
        description:
          "Un guerriero possiede una riserva limitata di resistenza fisica a cui può attingere per proteggersi dai danni. Nel suo turno può usare un'azione bonus per recuperare un ammontare di punti ferita pari a ldlO +il suo livello da guerriero. Una volta utilizzato questo privilegio, il guerriero non può più utilizzarlo finché non completa un riposo breve o lungo.",
      },
      {
        lv: 2,
        type: 'azioneImpetuosa',
        name: 'Azione Impetuosa',
        description:
          "un guerriero può spingersi oltre i suoi normali limiti per un istante. Nel suo turno può effettuare un'azione aggiuntiva oltre alla sua azione regolare e a una possibile azione bonus. Una volta utilizzato questo prM1egio, il guerriero non può più utilizzarlo finché non completa un riposo breve o lungo.",
        counter: 1,
        counterType: 'volta',
      },
      {
        lv: 3,
        type: 'archetipo',
        name: 'Archetipo Marziale',
        description:
          'Un guerriero sceglie un archetipo che si sforzerà di emulare tramite i suoi stili di combattimento e le sue tecniche. Può scegliere tra Campione, Maestro di Battaglia e Cavaliere Mistico',
      },
      {
        lv: 4,
        type: 'aumentoCaratteristiche',
        name: 'Aumento dei punteggi di caratteristica',
        description:
          'un guerriero può aumentare di 2 un punteggio di caratteristica a sua scelta, oppure può aumentare di 1 due punteggi di caratteristica a sua scelta. Come di consueto, non è consentito aumentare un punteggio di caratteristica a più di 20 utilizzando questo privilegio.',
        counterType: 'I',
      },
      {
        lv: 6,
        type: 'aumentoCaratteristiche',
        name: 'Aumento dei punteggi di caratteristica',
        description:
          'un guerriero può aumentare di 2 un punteggio di caratteristica a sua scelta, oppure può aumentare di 1 due punteggi di caratteristica a sua scelta. Come di consueto, non è consentito aumentare un punteggio di caratteristica a più di 20 utilizzando questo privilegio.',
        counterType: 'II',
      },
      {
        lv: 8,
        type: 'aumentoCaratteristiche',
        name: 'Aumento dei punteggi di caratteristica',
        description:
          'un guerriero può aumentare di 2 un punteggio di caratteristica a sua scelta, oppure può aumentare di 1 due punteggi di caratteristica a sua scelta. Come di consueto, non è consentito aumentare un punteggio di caratteristica a più di 20 utilizzando questo privilegio.',
        counterType: 'III',
      },
    ],
  },
  {
    type: 'Ladro',
    name: 'Ladro',
    ts: [StatsType.Destrezza, StatsType.Intelligenza],
    dice: 8,
    abilitiesCount: 4,
    abilities: [
      AbilitiesEnum.Acrobazia,
      AbilitiesEnum.Atletica,
      AbilitiesEnum.Furtivita,
      AbilitiesEnum.Indagare,
      AbilitiesEnum.Inganno,
      AbilitiesEnum.Intimidire,
      AbilitiesEnum.Intrattenere,
      AbilitiesEnum.Intuizione,
      AbilitiesEnum.Percezione,
      AbilitiesEnum.Persuasione,
      AbilitiesEnum.RapiditaDiMano,
    ],
    multiclass: [
      {
        lv: 1,
        type: 'competenza',
        name: 'Competenza armi e armature (Ladro)',
        description: 'Un Ladro è competente nelle armature leggere',
        extra: `competenza|{"armorList":["${ArmorType.Leggera}"]}`,
      },
      {
        lv: 1,
        type: 'skill',
        name: 'Abilità aggiuntiva (Ladro)',
        description: "Un Ladro ottiene un'abilità aggiuntiva",
        extra: `abilities|{"count":1}`,
      },
    ],
    privileges: [
      {
        lv: 1,
        type: 'competenzaBase',
        name: 'Competenza armi e armature',
        description:
          'Un Ladro è competente nelle armature leggere, armi semplici, balestre a mano, spada corte, spade lunghe e stocchi',
        extra: `competenza|{"armorList":["${ArmorType.Leggera}"],"weaponList":["semplice","balestra a mano","spada corta","spada lunga","stocco"]}`,
      },
      {
        lv: 1,
        type: 'competenzaArnesi',
        name: 'Competenza Arnesi da Scasso',
        description: 'Un Ladro è competente negli arnesi da scasso',
      },
      {
        lv: 1,
        type: 'maestria',
        name: 'Maestria',
        description:
          'Un ladro sceglie due tra le sue competenze nelle abilità, oppure una sua competenza in una abilità e la competenza negli arnesi da scasso. Il suo bonus di competenza raddoppia per ogni prova di caratteristica effettuata usando una delle competenze scelte.',
        counterType: 'I',
      },
      {
        lv: 1,
        type: 'attaccoFurtivo',
        name: 'Attacco Furtivo',
        description:
          "Un ladro sa come ,colpire con precisione sfruttando le distrazioni di un avversario. Una volta per turno, il ladro può infliggere ld6 danni extra a una creatura che colpisce con un attacco, se dispone di vantaggio al tiro per colpire. L'attaceo deve utilizzare un'arma accurata o un'arma a distanza. Il ladro non necessita di vantaggio al tiro per colpire se un altro nemico del bersaglio si trova entro 1,5 metri da esso (purché tale nemico non sia incapacitato) e se il tiro per colpire del ladro non subisce svantaggio. L'ammontare di danni extra aumenta man mano che il ladro acquisisce livelli",
      },
      {
        lv: 1,
        type: 'gergo',
        name: 'Gergo Ladresco',
        description:
          "Durante il proprio addestramento, il ladro apprende il gergo ladresco, un misto di dialetto, termini colloquiali e codici che gli permette di nascondere dei messaggi in una conversazione apparentemente normale. Soltanto un'altra creatura che conosca il gergo ladresco capisce questi messaggi. Per trasmettere un concetto tramite il gergo ladresco serve il quadruplo del tempo che normalmente servirebbe per esprimerlo direttamente. Inoltre, il ladro capis ce una serie di simboli e segni segreti usati per trasmettere semplici messaggi brevi, come per esempio per indicare se un'area è pericotosa, se un territorio ricade sotto il controllo di una gilda di ladri, se ci sono bottini appetitosi o bersagli facili nei paraggi o se qualcuno è disposto a offrire un rifugio :Sicuro a un ladro in fuga.",
      },
      {
        lv: 2,
        type: 'azioneScaltra',
        name: 'Azione Scaltra',
        description:
          "La prontezza di spirito e l'agilità del ladro gli consentono di muoversi e di agire in fretta. Il ladro può effettuare un'azione bonus in ognuno dei suoi turni in combattimento. Questa azione può essere usata solo per effettuare l'azione di Disimpegno, Nascondersi o Scatto.",
      },
      {
        lv: 3,
        type: 'archetipo',
        name: 'Archetipo Ladresco',
        description:
          "Un ladro sceglie un archetipo da emulare nell'esercizio delle sue capacità da ladro: Furfante, Assassino o Mistificatore Arcano",
      },
      {
        lv: 4,
        type: 'aumentoCaratteristiche',
        name: 'Aumento dei punteggi di caratteristica',
        description:
          'Un ladro può aumentare di 2 un punteggio di caratteristica a sua scelta, oppure può aumentare di 1 due punteggi di caratteristica a sua scelta. Come di consueto, non è consentito aumentare un punteggio di caratteristica a più di 20 utilizzando questo privilegio.',
        counterType: 'I',
      },
      {
        lv: 4,
        type: 'schivata',
        name: 'Schivata Prodigiosa',
        description:
          "Quando un attaccante che il ladro è in grado di vedere colpisce il ladro con un attacco, quest'ultimo pub usare la sua reazione per dimezzare i danni che subirebbe dall'attacco.",
      },
      {
        lv: 6,
        type: 'maestria',
        name: 'Maestria',
        description:
          'Un ladro sceglie due tra le sue competenze nelle abilità, oppure una sua competenza in una abilità e la competenza negli arnesi da scasso. Il suo bonus di competenza raddoppia per ogni prova di caratteristica effettuata usando una delle competenze scelte.',
        counterType: 'II',
      },
      {
        lv: 4,
        type: 'elusione',
        name: 'Elusione',
        description:
          'Un ladro può schivare agilmente certi effetti ad area come il soffio di fuoco di un drago rosso o un incantesimo tempesta di ghiaccio. Quando il ladro è soggetto a un effetto che gli consente di effettuare un tiro salvezza su Destrezza per dimezzare i danni, non subisce alcun danno se supera il tiro salvezza, e soltanto la metà dei danni se lo fallisce.',
      },
      {
        lv: 8,
        type: 'aumentoCaratteristiche',
        name: 'Aumento dei punteggi di caratteristica',
        description:
          'Un ladro può aumentare di 2 un punteggio di caratteristica a sua scelta, oppure può aumentare di 1 due punteggi di caratteristica a sua scelta. Come di consueto, non è consentito aumentare un punteggio di caratteristica a più di 20 utilizzando questo privilegio.',
        counterType: 'II',
      },
    ],
  },
  {
    type: 'Stregone',
    name: 'Stregone',
    ts: [StatsType.Carisma, StatsType.Costituzione],
    dice: 6,
    abilitiesCount: 2,
    abilities: [
      AbilitiesEnum.Arcano,
      AbilitiesEnum.Inganno,
      AbilitiesEnum.Intimidire,
      AbilitiesEnum.Intuizione,
      AbilitiesEnum.Persuasione,
      AbilitiesEnum.Religione,
    ],
    spellsByJobLevel: [
      {
        id: 1,
        known: 2,
        spells: [{ level: 0, slot: 4 }, { level: 1, slot: 2 }],
      },
      {
        id: 2,
        known: 3,
        spells: [{ level: 0, slot: 4 }, { level: 1, slot: 3 }],
      },
      {
        id: 3,
        known: 4,
        spells: [
          { level: 0, slot: 4 },
          { level: 1, slot: 4 },
          { level: 2, slot: 2 },
        ],
      },
      {
        id: 4,
        known: 5,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
        ],
      },
      {
        id: 5,
        known: 6,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
          { level: 3, slot: 2 },
        ],
      },
      {
        id: 6,
        known: 7,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
          { level: 3, slot: 3 },
        ],
      },
      {
        id: 7,
        known: 8,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
          { level: 3, slot: 3 },
          { level: 4, slot: 1 },
        ],
      },
      {
        id: 8,
        known: 9,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 4 },
          { level: 2, slot: 3 },
          { level: 3, slot: 3 },
          { level: 4, slot: 2 },
        ],
      },
    ],
    privileges: [
      {
        lv: 1,
        type: 'competenzaBase',
        name: 'Competenza armi e armature',
        description:
          'Uno Stregone è competente nelle balestre leggere, bastoni ferrati, dardi, fionde, pugnali',
        extra: `competenza|{"weaponList":["balestra leggera","bastone ferrato","dardi","fionda","pugnale"]}`,
      },
      {
        lv: 3,
        type: 'metamagia',
        name: 'Metamagia',
        description:
          'uno stregone sviluppa la capacità di plasmare i suoi incantesimi per adattarli ai suoi bisogni e ottiene delle opzioni di Metamagia a sua scelta',
        counter: 2,
      },
    ],
  },
  {
    type: 'Warlock',
    name: 'Warlock',
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
      AbilitiesEnum.Storia,
    ],
    spellsByJobLevel: [
      {
        id: 1,
        known: 2,
        spells: [{ level: 0, slot: 2 }, { level: 1, slot: 2 }],
        slot: 1,
      },
      {
        id: 2,
        known: 3,
        spells: [{ level: 0, slot: 2 }, { level: 1, slot: 2 }],
        slot: 2,
      },
      {
        id: 3,
        known: 4,
        spells: [
          { level: 0, slot: 2 },
          { level: 1, slot: 2 },
          { level: 2, slot: 2 },
        ],
        slot: 2,
      },
      {
        id: 4,
        known: 5,
        spells: [
          { level: 0, slot: 3 },
          { level: 1, slot: 2 },
          { level: 2, slot: 2 },
        ],
        slot: 2,
      },
      {
        id: 5,
        known: 6,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 2 },
          { level: 2, slot: 2 },
          { level: 3, slot: 2 },
        ],
        slot: 2,
      },
      {
        id: 6,
        known: 7,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 2 },
          { level: 2, slot: 2 },
          { level: 3, slot: 2 },
        ],
        slot: 2,
      },
      {
        id: 7,
        known: 8,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 2 },
          { level: 2, slot: 2 },
          { level: 3, slot: 2 },
          { level: 4, slot: 2 },
        ],
        slot: 2,
      },
      {
        id: 8,
        known: 9,
        spells: [
          { level: 0, slot: 5 },
          { level: 1, slot: 2 },
          { level: 2, slot: 2 },
          { level: 3, slot: 2 },
          { level: 4, slot: 2 },
        ],
        slot: 2,
      },
    ],
    multiclass: [
      {
        lv: 1,
        type: 'competenza',
        name: 'Competenza armi e armature (Warlock)',
        description:
          'Un Warlock è competente nelle armature leggere e nelle armi semplici',
        extra: `competenza|{"armorList":["${ArmorType.Leggera}"],"weaponList":["semplice"]}`,
      },
    ],
    privileges: [
      {
        lv: 1,
        type: 'competenzaBase',
        name: 'Competenza armi e armature',
        description:
          'Un Warlock è competente nelle armature leggere e nelle armi semplici',
        extra: `competenza|{"armorList":["${ArmorType.Leggera}"],"weaponList":["semplice"]}`,
      },
      {
        lv: 1,
        type: 'patrono',
        name: 'Patrono Ultraterreno',
        description:
          "Un warlock stipula un patto con un essere extraplanare a sua scelta: il Signore Fatato, l'Immondo o il rande Antico. La scelta del patrono gli conferisce alcuni privilegi",
      },
      {
        lv: 2,
        type: 'suppliche',
        name: 'Suppliche Occulte',
        description:
          "Dedicandosi allo studio delle scienze occulte, un warlock ha scoperto come usare alcune suppliche occulte, frammenti di conoscenze proibite che gli conferiscono persistenti doti magiche.Inoltre, quando acquisisce un nuovo livello, il warlock può scegliere una delle suppliche che conosce e sostituirla con un'altra che potrebbe imparare a quel livello.",
        counter: 2,
        rest: RestType.Long,
      },
      {
        lv: 3,
        type: 'patto',
        name: 'Dono del Patto',
        description:
          'Il patrono ultraterreno elargisce al warlock un dono per ricompensarlo dei suoi fedeli servigi. Il warlock ottiene uno dei privilegi seguenti a sua scelta. (Patto della Catena, Patto della Lama, Patto del Tomo)',
      },
      {
        lv: 4,
        type: 'punteggio',
        name: 'Aumento punteggio caratteristica',
        description:
          "Quando arriva al 4' livello, e poi di nuovo all'8', 12', 16' e 19' livello, un warlock può aumentare di 2 un punteggio di caratteristica a sua scelta, oppure può aumentare di 1 due punteggi di caratteristica a sua scelta. Come di consueto, non è consentito aumentare un punteggio di caratteristica a più di 20 utilizzando questo privilegio.",
      },
    ],
  },
]
