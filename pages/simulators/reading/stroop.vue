<template>
<GameField
  :simulator-info="simulatorInfo"
  :game-pause="gameStatus.pause"
  :game-final="gameStatus.final"
  :final-modal-data="gameFinalData"
>
  <template #game>
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
      :settings="gameSettings"
      @change-difficulty="changeSwitchableSettings"
      @reset="resetGame"
    >
      <template #info>
        Текущий раунд: {{ currentRound }}
      </template>
    </Sidebar>
  </template>
</GameField>
</template>

<script>
import firebase from 'firebase/app';
import colors from '~/helpers/colorsForStroopSimulator';
import StroopCard from '~/components/reading/stroop/StroopCard';
import GameField from '~/components/shared/layouts/GameField';
import Sidebar from '~/components/shared/layouts/Sidebar';
import { shuffleArray, searchDuplicateItem } from '~/helpers/functions';

export default {
  name: 'StroopSimulator',

  components: {
    GameField,
    Sidebar,
    StroopCard,
  },

  data() {
    return {
      gameSettings: {
        difficulty: {
          title: 'Сложность',
          value: 'easy',
          name: 'difficulty',
          options: {
            default: {
              value: 'easy',
              title: 'легкий',
            },
            list: [
              { value: 'easy', title: 'легкий' },
              { value: 'medium', title: 'средний' },
              { value: 'hard', title: 'сложный' },
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
      gameResult: {
        correctAnswers: 0,
        incorrectAnswers: 0,
      },
      gameStatus: {
        played: false,
        final: false,
        pause: false,
      },
      errorCardIndex: null,
      roundColors: [],
      gameFinalData: {},
      answers: [],
      currentRound: 1,
      colors,
      simulatorInfo: null,
    };
  },

  computed: {
    difficulty() {
      return this.gameSettings.difficulty.value;
    },

    language() {
      return this.gameSettings.language.value;
    },
  },

  asyncData() {
    return firebase.database().ref('simulatorsInfo/reading/schulte')
      .once('value')
      .then(snap => ({ simulatorInfo: snap.val() }));
  },

  mounted() {
    this.setGameOnPlayed();
  },

  destroyed() {
    this.currentCard = null;
    this.answers = null;
  },

  methods: {
    /**
     * Устанавливает игру в режим игры
     */
    setGameOnPlayed() {
      this.gameStatus.played = true;
      this.gameStatus.pause = false;
      this.gameStatus.final = false;

      this.startGame();
    },

    /**
     * Запускает или перезапускает игру
     */
    startGame() {
      this.roundColors = this.generateRoundCards();
      this.answers = this.fillAnswersArray();
    },

    /**
     * Устанавливает игру в режим паузы
     */
    setGameOnPause() {
      this.gameStatus.played = false;
      this.gameStatus.pause = true;
    },

    /**
     * Устанавливает игру в режим "игра закончена"
     */
    setGameOnFinal() {
      this.gameStatus.played = false;
      this.gameStatus.final = true;

      // this.gameFinalData.difficulty.value = this.gameSettings.difficulty.value;
      // this.gameFinalData.moves.value = this.gameResult.moves;
    },

    /**
     * Сбрасывает игру
     */
    resetGame() {
      this.startGame();
      this.currentRound = 1;
    },

    /**
     * Генерирует случайное число где максимальное число это длинна массива colors
     */
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

    comparisonAnswers(answer, propName) {
      const answers = [];
      const corrects = [];

      answer.forEach((item) => {
        answers.push(item[propName]);
      });

      this.roundColors.forEach((item) => {
        corrects.push(item[propName]);
      });

      let coincidence = 0;

      corrects.forEach((item) => {
        if (answers.includes(item)) coincidence += 1;
      });

      return coincidence === corrects.length;
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
        this.gameResult.correctAnswers += 1;
        console.log(this.gameResult.correctAnswers, this.gameSettings.rounds.value);
        console.log(this.gameResult.correctAnswers === this.gameSettings.rounds.value);
        if (this.gameResult.correctAnswers === this.gameSettings.rounds.value) {
          this.setGameOnFinal();
        }
        this.currentRound += 1;
        this.startGame();
      } else {
        this.errorCardIndex = index;
        setTimeout(() => {
          this.errorCardIndex = null;
        }, 200);
        this.gameResult.incorrectAnswers += 1;
      }
    },

    changeSwitchableSettings(settingName, settingValue) {
      this.setGameOnPause();
      this.gameSettings[settingName].value = settingValue;

      this.resetGame();
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
  flex-wrap wrap
  width 100%
  background-color $white
</style>
