<template>
<SimulatorField
  :simulator-info="simulatorInfo"
  :simulator-pause="status.pause"
  :simulator-final="status.final"
  :final-data="finalData"
  @start-simulator="startSimulator"
  @start-simulator-after-pause="startSimulator"
>
  <template #simulator>
    <div class="counting">
      <transition name="fade">
        <ConsiderCard
          v-if="!pauseBeforeNewRound && status.played"
          :condition="roundCondition"
          @submit-answer="checkAnswer"
        />
      </transition>

      <transition name="fade">
        <ResultModal
          v-if="showResultModal && roundCondition"
          :correct-answer="correctAnswer"
          :answer-is-right="userAnswerAnswerIsRight"
        />
      </transition>
    </div>
  </template>

  <template #sidebar>
    <Sidebar
      :settings="settings"
      @change-selectable="changeSelectableSettings"
      @change-switchable="changeSwitchableSettings"
      @reset="resetSimulator"
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
</SimulatorField>
</template>

<script>
import firebase from 'firebase/app';
import SimulatorField from '~/components/shared/layouts/SimulatorField';
import Sidebar from '~/components/shared/layouts/Sidebar';
import ConsiderCard from '~/components/mind/verbalCounting/ConsiderCard';
import ResultModal from '~/components/mind/verbalCounting/ResultModal';

export default {
  name: 'VerbalCountingSimulator',

  components: {
    ResultModal,
    SimulatorField,
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
          maxNumber: 1000,
        },
        hard: {
          maxNumber: 9999,
        },
      },
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
      status: {
        played: false,
        final: false,
        pause: false,
      },
      roundCondition: null,
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
    this.setSimulatorOnPlayed();
  },

  methods: {
    setSimulatorOnPlayed() {
      this.status.played = true;
      this.status.final = false;
      this.status.pause = false;
    },

    setSimulatorOnPause() {
      this.currentRound = 1;
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
      this.pauseBeforeNewRound = false;

      this.roundCondition = this.generateCondition();
      this.correctAnswer = this.calculateAnswer(this.roundCondition);
    },

    resetSimulator() {
      this.setSimulatorOnPause();
      this.roundCondition = null;
      this.correctAnswer = null;
      this.userAnswer = null;
      this.pauseBeforeNewRound = true;

      setTimeout(() => {
        this.pauseBeforeNewRound = false;
        this.startSimulator();
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

    calculateAnswer(roundCondition) {
      const splitConditions = roundCondition.split(' ');
      const firstOperator = Number(splitConditions[0]);
      const operand = splitConditions[1];
      const secondOperator = Number(splitConditions[2]);

      let answer;

      if (operand === '+') answer = firstOperator + secondOperator;
      else if (operand === '-') answer = firstOperator - secondOperator;
      else if (operand === '*') answer = firstOperator * secondOperator;

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

      if (this.currentRound === this.settings.rounds.value) {
        this.showResultModal = true;
        setTimeout(() => {
          this.showResultModal = false;
          this.setSimulatorOnFinal();
        }, 1500);
      } else {
        this.currentRound += 1;
        this.showResultModal = true;
        this.pauseBeforeNewRound = true;

        setTimeout(() => {
          this.showResultModal = false;
          this.startSimulator();
        }, 1500);
      }
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

    changeSelectableSettings(settingName, settingValue) {
      this.setSimulatorOnPause();
      this.settings[settingName].value = settingValue;
      this.settings[settingName].description = settingValue;

      this.setSimulatorOnPause();
    },

    changeSwitchableSettings(value, settingsName) {
      const operator = this.convertSettingNameToMathOperator(settingsName);

      if (value) {
        this.operators.push(operator);
        this.settings[settingsName].enabled = value;
      } else if (!value && !this.hasOnlyOneOperator) {
        const operatorIndex = this.operators.indexOf(operator);
        this.operators.splice(operatorIndex, 1);
        this.settings[settingsName].enabled = value;
      }

      this.setSimulatorOnPause();
    },
  },

};
</script>

<style lang="stylus" scoped>
.counting
  position relative
  width 300px
  height 300px
  align-self center
</style>
