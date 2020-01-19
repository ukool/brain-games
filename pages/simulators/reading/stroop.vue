<template>
<SimulatorField
  :simulator-info="simulatorInfo"
  :simulator-pause="status.pause"
  :simulator-final="status.final"
  :final-data="finalData"
  @start-simulator="startSimulator"
  @start-simulator-after-pause="startSimulatorAfterPause"
>
  <template #simulator>
    <div class="stroop">
      <StroopCard
        v-if="answers.length"
        :round-card="roundColors"
        :answers="answers"
        :difficulty="difficulty"
        :error-card-index="errorCardIndex"
        @click-to-answer="checkAnswer"
      />
    </div>
  </template>
  <template #sidebar>
    <Sidebar
      :settings="settings"
      @change-selectable="changeSelectableSettings"
      @reset="resetSimulator"
    >
      <template #info>
        Текущий раунд: {{ currentRound }}
      </template>
    </Sidebar>
  </template>
</SimulatorField>
</template>

<script>
import firebase from 'firebase/app';
import colors from '~/helpers/colorsForStroopSimulator';
import StroopCard from '~/components/reading/stroop/StroopCard';
import SimulatorField from '~/components/shared/layouts/SimulatorField';
import Sidebar from '~/components/shared/layouts/Sidebar';
import { shuffleArray, searchDuplicateItem } from '~/helpers/functions';

export default {
  name: 'StroopSimulator',

  components: {
    SimulatorField,
    Sidebar,
    StroopCard,
  },

  data() {
    return {
      settings: {
        difficulty: {
          title: 'Сложность',
          value: 'easy',
          name: 'difficulty',
          options: {
            default: {
              value: 'easy',
              title: 'легкая',
            },
            list: [
              { value: 'easy', title: 'легкая' },
              { value: 'medium', title: 'средняя' },
              { value: 'hard', title: 'сложная' },
            ],
          },
          type: 'selectable',
        },
        language: {
          title: 'Язык',
          value: 'rus',
          name: 'language',
          options: {
            default: {
              value: 'rus',
              title: 'русский',
            },
            list: [
              { value: 'rus', title: 'русский' },
              { value: 'eng', title: 'английский' },
            ],
          },
          type: 'selectable',
        },
        rounds: {
          title: 'Раундов',
          value: 10,
          name: 'rounds',
          options: {
            default: {
              value: 10,
              title: 10,
            },
            list: [
              { value: 10, title: 10 },
              { value: 15, title: 15 },
              { value: 20, title: 20 },
            ],
          },
          type: 'selectable',
        },
      },
      configDifficulty: {
        easy: {
          quantityColorNames: 1,
          quantityAnswers: 4,
        },
        medium: {
          quantityColorNames: 2,
          quantityAnswers: 4,
        },
        hard: {
          quantityColorNames: 3,
          quantityAnswers: 4,
        },
      },
      results: {
        correctAnswers: 0,
        incorrectAnswers: 0,
      },
      status: {
        played: false,
        final: false,
        pause: false,
      },
      errorCardIndex: null,
      roundColors: [],
      finalData: {
        difficulty: {
          title: 'Сложность',
          value: null,
        },
        correctAnswers: {
          title: 'Правильных ответов',
          value: null,
        },
        incorrectAnswers: {
          title: 'Неправильных ответов',
          value: null,
        },
        rounds: {
          title: 'Количество раундов',
          value: null,
        },
      },
      answers: [],
      currentRound: 1,
      colors,
      simulatorInfo: null,
    };
  },

  computed: {
    difficulty() {
      return this.settings.difficulty.value;
    },

    language() {
      return this.settings.language.value;
    },
  },

  asyncData() {
    return firebase.database().ref('simulatorsInfo/reading/stroop')
      .once('value')
      .then(snap => ({ simulatorInfo: snap.val() }));
  },

  mounted() {
    this.startSimulator();
  },

  methods: {
    setSimulatorOnPlayed() {
      this.status.played = true;
      this.status.final = false;
      this.status.pause = false;
    },

    setSimulatorOnPause() {
      this.status.played = false;
      this.status.final = false;
      this.status.pause = true;
    },

    setSimulatorOnFinal() {
      this.status.played = false;
      this.status.final = true;
      this.status.pause = false;

      this.finalData.difficulty.value = this.settings.difficulty.description;
      this.finalData.correctAnswers.value = this.results.correctAnswers;
      this.finalData.incorrectAnswers.value = this.results.incorrectAnswers;
      this.finalData.rounds.value = this.settings.rounds.value;
    },

    startSimulator() {
      this.setSimulatorOnPlayed();
      this.roundColors = this.generateRoundCards();
      this.answers = this.fillAnswersArray();
    },

    startSimulatorAfterPause() {
      this.resetSimulator();
      this.startSimulator();
    },

    resetSimulator() {
      this.roundColors = [];
      this.answers = [];
      this.currentRound = 1;
      this.results.correctAnswers = 0;
      this.results.incorrectAnswers = 0;
    },

    generateRandomNumber() {
      return Math.floor(Math.random() * this.colors.length);
    },

    /**
     * Заполняет текущую активную карточку
     */
    generateRoundCards() {
      const { quantityColorNames } = this.configDifficulty[this.difficulty];

      const fillCards = (index, acc) => {
        if (index === quantityColorNames) return this.shuffleArray(acc);

        const randomId = this.generateRandomNumber();
        const randomItem = this.colors.find(item => item.id === randomId);

        const randomName = this.colors[this.generateRandomNumber()][this.language];

        if (!this.searchDuplicateItem(acc, 'id', randomId)) {
          acc.push({
            id: randomItem.id,
            color: randomItem.color,
            name: randomName,
          });
          return fillCards(index + 1, acc);
        }

        return fillCards(index, acc);
      };

      return fillCards(0, []);
    },

    /**
     * Заполняет массив с ответами: одним правильным и тремя неправильными
     */
    fillAnswersArray() {
      this.answers = [];

      let correctAnswer = [];

      this.roundColors.forEach((item) => {
        const name = this.colors.find(i => i.id === item.id)[this.language];
        correctAnswer.push({
          color: item.color,
          name,
        });
      });

      correctAnswer = this.shuffleArray(correctAnswer);

      let incorrectAnswers;
      if (this.difficulty === 'easy') {
        incorrectAnswers = this.fillEasyAnswers();
      } else {
        incorrectAnswers = this.fillMediumAndHardAnswers();
      }

      let allAnswers = [correctAnswer, ...incorrectAnswers];
      allAnswers = this.shuffleArray(allAnswers);

      return allAnswers;
    },

    fillEasyAnswers() {
      const maxLengthIncorrectAnswers = this.configDifficulty[this.difficulty].quantityAnswers - 1;
      const correctColorName = this.colors.find(item => item.id === this.roundColors[0].id)[this.language];

      const fillingArray = (index, acc) => {
        if (index === maxLengthIncorrectAnswers) return acc;

        const randomId = this.generateRandomNumber();
        const { color } = this.colors.find(item => item.id === randomId);
        const name = this.colors[this.generateRandomNumber()][this.language];

        if (!this.comparisonAnswers(acc, 'name') && name !== correctColorName) {
          acc.push([{
            color,
            name,
          }]);
          return fillingArray(index + 1, acc);
        }
        return fillingArray(index, acc);
      };

      return fillingArray(0, []);
    },

    fillMediumAndHardAnswers() {
      const maxLengthIncorrectAnswers = this.configDifficulty[this.difficulty].quantityAnswers - 1;

      const fillAnswers = (index, acc) => {
        if (index === maxLengthIncorrectAnswers) return this.shuffleArray(acc);

        const supportingArray = this.fillInnerArrayForMediumAndHardAnswers(0, []);
        acc.push(supportingArray);
        return fillAnswers(index + 1, acc);
      };

      return fillAnswers(0, []);
    },

    fillInnerArrayForMediumAndHardAnswers() {
      const { quantityColorNames } = this.configDifficulty[this.difficulty];

      const fillInnersAnswers = (count, acc) => {
        if (count === quantityColorNames) return this.shuffleArray(acc, 2);
        if (!this.comparisonAnswers(acc, 'name')) {
          const randomNumber = this.generateRandomNumber();
          const { color } = this.colors[randomNumber];
          const name = this.colors[randomNumber][this.language];

          acc.push({ name, color });
          return fillInnersAnswers(count + 1, acc);
        }

        return fillInnersAnswers(count, acc);
      };

      return fillInnersAnswers(0, []);
    },

    comparisonAnswers(array, propName, index) {
      // let uniqueAnswer = '';
      //
      // this.roundColors.forEach((item) => {
      //   uniqueAnswer += item[propName];
      // });
      //
      // const allTextAnnwers = [];


      // let currentAnswer = '';
      // const answers = [];
      //
      // answer.forEach((item) => {
      //   item.forEach((inner) => {
      //     currentAnswer += inner[propName];
      //   });
      // });

      // array.forEach((item) => {
      //   item.forEach((inner) => {
      //     answers.push(inner[propName]);
      //   });
      // });

      // console.log('currentAnswer', currentAnswer);
      // console.log('answers', currentAnswer);
      //
      //
      //
      // console.log('uniqueAnswer', uniqueAnswer);

      // const maxDuplicateCount = uniqueAnswer.length;
      // let duplicateCount = 0;

      // answers.forEach((item) => {
      //   if (uniqueAnswer.includes(item) || answers.includes(item)) {
      //     duplicateCount += 1;
      //   }
      // });
      // console.log('>=', uniqueAnswer === currentAnswer);
      // console.log('count', duplicateCount);
      return false;// duplicateCount >= maxDuplicateCount;
    },

    checkAnswer({ answer, index }) {
      // const answers = [];
      // const corrects = [];
      //
      // answer.forEach((item) => {
      //   answers.push(item);
      // });
      //
      // console.log('answers', answers);
      //
      // this.roundColors.forEach((item) => {
      //   console.log(2222, item);
      //   corrects.push(item[0].color);
      // });
      //
      // console.log('corrects', corrects);
      //
      // let coincidence = 0;
      //
      // corrects.forEach((item) => {
      //   console.log(1111, item);
      //   if (answers.includes(item)) coincidence += 1;
      // });
      const coincidence = this.comparisonAnswers(answer, 'color');

      if (coincidence) {
        this.results.correctAnswers += 1;
        if (this.results.correctAnswers === this.settings.rounds.value) {
          this.setSimulatorOnFinal();
        }
        this.currentRound += 1;
        this.startSimulator();
      } else {
        this.errorCardIndex = index;
        setTimeout(() => {
          this.errorCardIndex = null;
        }, 200);
        this.results.incorrectAnswers += 1;
      }
    },

    changeSelectableSettings({ settingName, settingValue, settingDescription }) {
      this.settings[settingName].value = settingValue;
      this.settings[settingName].description = settingValue;
      this.settings[settingName].description = settingDescription;
      this.resetSimulator();
    },

    shuffleArray,
    searchDuplicateItem,
  },
};
</script>

<style lang="stylus" scoped>
.stroop
  position relative
  display flex
  justify-content center
  align-self center
  flex-wrap wrap
  width 100%
  background-color $white
</style>
