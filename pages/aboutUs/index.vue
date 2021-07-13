<template>
  <div>
    <div class="pl-8 md:pl-32 lg:pl-60 mx-auto flex flex-row mic">
    <div class="wrapper pt-20 overflow-visible">
      <div>
        <h2 class="mission">Mission</h2>
        <div class="flex flex-row items-center gap-8">
          <img src="~/assets/images/hand-shake.png" alt="" width="60px" />
          <p class="self-start">
            <strong>Coinvolgere</strong> giovani in azioni di socializzazione,
            informazione e comunicazione utilizzando le tecnologie digitali per
            favorire l’integrazione, contrastare fenomeni di discriminazione, di
            isolamento e di intolleranza.
          </p>
        </div>

        <div class="flex flex-row items-center gap-8 mt-8">
          <img src="~/assets/images/directions.png" alt="" width="60px" />
          <p>
            <strong>Orientare</strong> i giovani verso la cultura tecnologica in
            modo sano contribuendo a sviluppare quella capacità critica
            necessaria per esercitare una cittadinanza attiva.
          </p>
        </div>

        <div class="flex flex-row items-center gap-8 mt-8">
          <img src="~/assets/images/questions.png" alt="" width="60px" />
          <p>
            <strong>Favorire</strong> lo sviluppo del dialogo e progettazione
            tra Istituti e docenti che condividono la necessità della
            sperimentazione di nuove modalità ed azioni per la didattica
          </p>
        </div>
        <h2 class="first">Storia del progetto</h2>

        <h3>Anno scolastico 2019/20:</h3>
        <p>
          l’IPRASE promuove un percorso di formazione per i docenti dal titolo
          “Dall’Alternanza Scuola Lavoro alla creazione di una start-up: come
          nasce una radio web” e che durante gli incontri è stata presentata, in
          particolare, l’esperienza del Liceo “Kennedy” di Roma, dove da anni,
          in collaborazione con una rete di scuole della Capitale, è attiva una
          web radio scolastica in cui sono protagonisti gli stessi studenti.
        </p>

        <h3>Settembre – Dicembre 2020:</h3>
        <p>
          studio e progettazione della realizzazione di una web radio promossa
          da una rete scolastica diffusa sul territorio provinciale. Matura la
          convinzione che il progetto può rappresentare una opportunità
          importante per sviluppare competenze tecniche, culturali e di
          cittadinanza. La web radio scolastica può diventare un valido
          strumento di innovazione didattica: innanzi tutto permette il
          coinvolgimento di studenti e docenti di Istituzioni Scolastiche
          differenti, favorendo la collaborazione e lo sviluppo di relazioni tra
          le diverse realtà dello stesso territorio; in secondo luogo, è un tipo
          di esperienza che si può attivare anche in tempi segnati
          dall’emergenza epidemiologica, rientrando a pieno titolo all’interno
          delle attività di alternanza scuola-lavoro, estremamente sentita e
          apprezzata dai giovani.
        </p>
        <h3>Novembre 2020:</h3>
        <p>
          l’I. T. T. “G. Marconi” di Rovereto, in qualità di capofila degli
          istituti I. T. E. “A. Tambosi” di Trento e I. I. La Rosa Bianca di
          Cavalese, partecipa al bando “Comunità scolastiche che ripartono”
          della FONDAZIONE CARITRO con il progetto “WeBeRadio”. Il progetto è
          ritenuto valido dall’apposita commissione CARITRO che ne sostiene
          economicamente l’iniziativa;
        </p>
        <h3>Gennaio 2021:</h3>
        <p>
          sottoscritto e firmato l’accordo di rete tra i tre istituti scolastici
          per la creazione di un’esperienza di web radio scolastica diffusa sul
          territorio, che fissa finalità e organizzazione e prevede tra l’altro
          la possibilità di ampliare la rete ad altri istituti o enti. Avvio di
          una collaborazione con IPRASE (patrocinio dell’IPRASE) e stretta
          collaborazione fin dall’ideazione del progetto con il Dipartimento
          Istruzione e Cultura della Provincia.
        </p>
        <h3>30 marzo 2021:</h3>
        <p>KICKOFF del progetto Webe radio</p>

        <h2>Attività previste</h2>

        <h3>Fase di formazione e sperimentazione (a.s. 2020/21)</h3>

        <ul>
          - formazione studenti e docenti - produzione di podcast -
          progettazione e attivazione portale dedicato - attività di speaking
        </ul>

        <h3>Fase di consolidamento e diffusione (a.s 2021/22)</h3>
        <ul>
          - produzione di trasmissione live - produzione di podcast -
          consolidamento portale - dedicato creazione eventuale app su
          smartphone
        </ul>

        <h2>Progetto MADE</h2>

        <p>
          Il Progetto MADE ha coinvolto le classi quarte del Liceo Artistico F.
          Depero (indirizzo Grafica) e dell’Istituto Tecnico Tecnologico G.
          Marconi di Rovereto. Cllaborando, nel corso di tre giorni hanno creato
          un sito web all’interno del progetto WeBe Radio che permette la
          visualizzazione di podcast e, per ogni podcast, i relativi episodi.
        </p>
      </div>
      </div>
      <div class="wrapper overflow-visible">
      <img
        class="-ml-44"
        :src="cuffie()"
        alt="Cuffiette"
        width="509px"
        height="2204px"
      />
      </div>
    </div>
    <img
      v-if="isDarkTheme"
      class="mx-auto mt-4 mb-4"
      src="~/assets/images/loghiBgBlack.png"
      alt="loghi"
    />
    <img
      v-else
      class="mx-auto bottom-4"
      src="~/assets/images/loghiBgWhite.png"
      alt="loghi"
    />
  </div>
</template>
<style lang="postcss" scoped>
.wrapper {
  min-width: 249px;
  overflow: visible;
}

h2,
h3 {
  @apply text-3xl font-bold mt-6;
}

h2.mission {
  margin-left: calc(2rem + 60px);
  margin-bottom: 1em;
}

h2.first {
  margin-top: 3em;
}

h3 {
  @apply text-xl font-semibold;
}
p {
  @apply text-justify;
}

ul {
  @apply list-inside pl-4;
}
li::before {
  content: "";
  color: red;
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-left: -1em;
  background-image: url("~/assets/images/hand-shake.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}

</style>
<script>
import aboutUsQuery from "~/apollo/queries/single/aboutUs";
export default {
  data() {
    return {
      // Initialize an empty variabkle
      aboutUs: {},
      query: "",
    };
  },
  apollo: {
    aboutUs: {
      prefetch: true,
      query: aboutUsQuery,
    },
  },
  computed: {
    // Replace Image reference
    filteredMarkdown() {
      return this.$markdownImage(String(this.aboutUs.about));
    },
    isDarkTheme() {
      return this.$colorMode.value === "dark";
    },
  },
  methods: {
    cuffie() {
      return this.$colorMode.value === "dark"
        ? require("~/assets/images/cuffie-filo-bianche.png")
        : require("~/assets/images/cuffie-filo-nere.png");
    },

  }
};
</script>
