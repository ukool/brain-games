<template>
<GameField
  :simulator-info="simulatorInfo"
  :game-pause="gameStatus.pause"
  :game-final="gameStatus.final"
  :final-modal-data="finalData"
  @start-game="setGameOnPlayed"
  @start-game-after-pause="setGameOnPlayed"
>
  <template #game>
    <div class="counting">
      <transition name="fade">
        <ConsiderCard
          v-if="!pauseBeforeNewRound"
          :condition="condition"
          :correct-answer="correctAnswer"
          @submit-answer="checkAnswer"
        />
      </transition>

      <transition name="fade">
        <ResultModal
          v-if="showResultModal && condition"
          :correct-answer="correctAnswer"
          :answer-is-right="userAnswerAnswerIsRight"
        />
      </transition>
    </div>
  </template>

  <template #sidebar>
    <Sidebar
      :settings="settings"
      @change-difficulty="changeSwitchableSettings"
      @change-settings="changeGameSettings"
      @reset="resetGame"
    >
      <template #info>
        <ul class="sidebar-list">
          <li class="sidebar-item">
            Текущий раунд: {{ currentRound }}
          </li>
        </ul>
      </template>
    </Sidebar>
  </template>
</GameField>
</template>

<script>
import firebase from 'firebase/app';
import GameField from '~/components/shared/layouts/GameField';
import Sidebar from '~/components/shared/layouts/Sidebar';
import ConsiderCard from '~/components/mind/verbalCounting/ConsiderCard';
import ResultModal from '~/components/mind/verbalCounting/ResultModal';

export default {
  name: 'VerbalCountingSimulator',

  components: {
    ResultModal,
    GameField,
    Sidebar,
    ConsiderCard,
  },

  data() {
    return {
      settings: {
        difficulty: {
          title: 'Сложность',
          value: 'easy',
          name: 'difficulty',
          description: 'легкая',
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
        addition: {
          title: 'Сложение',
          enabled: true,
          name: 'addition',
          type: 'switchable',
          disabled: false,
        },
        subtraction: {
          title: 'Вычитание',
          enabled: true,
          name: 'subtraction',
          type: 'switchable',
          disabled: false,

        },
        // division: {
        //   title: 'Деление',
        //   enabled: true,
        //   name: 'division',
        //   type: 'switchable',
        // },
        multiplication: {
          title: 'Умножение',
          enabled: true,
          name: 'multiplication',
          type: 'switchable',
          disabled: false,
        },
      },
      configDifficulty: {
        easy: {
          maxNumber: 100,
        },
        medium: {
          maxNumber: 999,
        },
        hard: {
          maxNumber: 9999,
        },
      },
      // gameSettings: {
      //   treeDigit: false,
      //   fourDigit: false,
      //   cardsAnswerCount: 4,
      // },
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
      results: {
        correctAnswers: 0,
        incorrectAnswers: 0,
      },
      gameStatus: {
        played: false,
        final: false,
        pause: false,
      },
      condition: null,
      operators: ['-', '+', '*'],
      hasOnlyOneOperator: false,
      previousOperator: null,
      currentRound: 1,
      correctAnswer: null,
      userAnswer: null,
      userAnswerAnswerIsRight: false,
      pauseBeforeNewRound: true,
      showResultModal: false,
      simulatorInfo: null,
    };
  },

  computed: {
    difficulty() {
      return this.settings.difficulty.value;
    },
  },

  watch: {
    operators(operators) {
      if (operators.length === 1) {
        this.hasOnlyOneOperator = true;
        const disabledSetting = this.convertMathOperatorToSettingName(operators[0]);
        this.settings[disabledSetting].disabled = true;
      } else {
        this.hasOnlyOneOperator = false;
      }
    },
    hasOnlyOneOperator(value) {
      if (!value) {
        this.settings.addition.disabled = false;
        this.settings.subtraction.disabled = false;
        this.settings.multiplication.disabled = false;
      }
    },
  },

  asyncData() {
    return firebase.database().ref('simulatorsInfo/memory/remember-number')
      .once('value')
      .then(snap => ({ simulatorInfo: snap.val() }));
  },

  mounted() {
    this.setGameOnPlayed();
  },

  methods: {
    /**
     * Устанавливает игру в режим "игра начата"
     */
    setGameOnPlayed() {
      this.gameStatus.played = true;
      this.gameStatus.pause = false;
      this.gameStatus.final = false;

      this.startGame();
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
      this.gameStatus.pause = false;
      this.gameStatus.final = true;

      this.finalData.difficulty.value = this.settings.difficulty.description;
      this.finalData.correctAnswers.value = this.results.correctAnswers;
      this.finalData.incorrectAnswers.value = this.results.incorrectAnswers;
      this.finalData.rounds.value = this.settings.rounds.value;
    },

    startGame() {
      this.pauseBeforeNewRound = false;

      this.condition = this.generateCondition();
      this.correctAnswer = this.calculateAnswer(this.condition);
    },

    /**
     * Сбрасывает игру
     */
    resetGame() {
      this.pauseBeforeNewRound = true;

      setTimeout(() => {
        this.pauseBeforeNewRound = false;
        this.startGame();
        this.currentRound = 1;
      }, 700);
    },

    generateCondition() {
      const { maxNumber } = this.configDifficulty[this.difficulty];

      const firstOperand = this.generateRandomNumber(1, maxNumber);
      const secondOperand = this.generateRandomNumber(1, maxNumber);

      const operator = this.generateMathOperator();

      return `${firstOperand} ${operator} ${secondOperand}`;
    },

    generateMathOperator() {
      if (this.hasOnlyOneOperator) return this.operators[0];

      const generateOperator = () => {
        const number = this.generateRandomNumber(0, this.operators.length);
        const operator = this.operators[number];

        if (operator !== this.previousOperator) {
          this.previousOperator = operator;
          return operator;
        }

        return generateOperator();
      };

      return generateOperator();
    },

    calculateAnswer(condition) {
      const splitConditions = condition.split(' ');
      const firstOperator = Number(splitConditions[0]);
      const operand = splitConditions[1];
      const secondOperator = Number(splitConditions[2]);

      let answer;

      switch (operand) {
      case '+':
        answer = firstOperator + secondOperator;
        break;
      case '-':
        answer = firstOperator - secondOperator;
        break;
      case '*':
        answer = firstOperator - secondOperator;
        break;
      default:
      }

      return answer;
    },

    generateRandomNumber(min = 0, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    checkAnswer(userAnswer) {
      if (this.correctAnswer === Number(userAnswer)) {
        this.results.correctAnswers += 1;
        this.userAnswerAnswerIsRight = true;
      } else {
        this.results.incorrectAnswers += 1;
        this.userAnswerAnswerIsRight = false;
      }

      this.currentRound += 1;

      if (this.currentRound === this.settings.rounds.value + 1) {
        setTimeout(() => {
          this.showResultModal = false;
          this.setGameOnFinal();
        }, 1500);
      } else {
        this.showResultModal = true;
        this.pauseBeforeNewRound = true;

        setTimeout(() => {
          this.showResultModal = false;
          this.startGame();
        }, 1500);
      }
    },

    changeSwitchableSettings(settingName, settingValue) {
      this.setGameOnPause();
      this.settings[settingName].value = settingValue;
      this.settings[settingName].description = settingValue;

      this.resetGame();
    },

    convertSettingNameToMathOperator(settingsName) {
      let operator;

      if (settingsName === 'addition') operator = '+';
      else if (settingsName === 'subtraction') operator = '-';
      else if (settingsName === 'multiplication') operator = '*';

      return operator;
    },

    convertMathOperatorToSettingName(operator) {
      let settingName;

      if (operator === '+') settingName = 'addition';
      else if (operator === '-') settingName = 'subtraction';
      else if (operator === '*') settingName = 'multiplication';

      return settingName;
    },

    changeGameSettings(value, settingsName) {
      const operator = this.convertSettingNameToMathOperator(settingsName);

      if (value) {
        this.operators.push(operator);
        this.settings[settingsName].enabled = value;
      } else if (!value && !this.hasOnlyOneOperator) {
        const operatorIndex = this.operators.indexOf(operator);
        this.operators.splice(operatorIndex, 1);
        this.settings[settingsName].enabled = value;
      }

      this.setGameOnPause();
      this.resetGame();
    },
  },

};
</script>

<style lang="stylus" scoped>
.counting
  position relative
  width 300px
  height 300px
</style>
