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
    <div
      v-show="!status.pause && roundNumber !== null"
      class="remember-number"
    >
      <RememberNumberCard
        :round-number="roundNumber"
        :number-length="configDifficulty[difficulty].numberLength"
        :status-end-round="status.complete"
        :visible-time="configDifficulty[difficulty].visibleTime"
        :difficulty="difficulty"
        :number-in-filed="configDifficulty[difficulty].numberInFiled"
        @submit-answer="checkSubmitAnswer"
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
import RememberNumberCard from '~/components/memory/rememberNumber/RememberNumberCard';

export default {
  name: 'RememberNumberSimulator',

  components: {
    SimulatorField,
    Sidebar,
    RememberNumberCard,
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
      },
      configDifficulty: {
        easy: {
          visibleTime: 1100,
          numberLength: 4,
          minimalNumberLength: 4,
          numberInFiled: 1,
        },
        medium: {
          visibleTime: 1000,
          numberLength: 6,
          minimalNumberLength: 6,
          numberInFiled: 2,
        },
        hard: {
          visibleTime: 900,
          numberLength: 9,
          minimalNumberLength: 9,
          numberInFiled: 3,
        },
      },
      results: {
        correctAnswers: 0,
        incorrectAnswers: 0,
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
      status: {
        played: false,
        final: false,
        pause: false,
      },
      showTimer: false,
      userAnswer: null,
      roundNumber: null,
      currentRound: 1,
      simulatorInfo: null,
    };
  },

  computed: {
    difficulty() {
      return this.settings.difficulty.value;
    },
  },

  asyncData() {
    return firebase.database().ref('simulatorsInfo/memory/remember-number')
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
      this.roundNumber = this.generateRoundNumber();
    },

    startSimulatorAfterPause() {
      this.resetSimulator();
      this.startSimulator();
    },

    resetSimulator() {
      this.setSimulatorOnPause();
      this.roundNumber = null;
      this.userAnswer = null;
      this.currentRound = 1;
      this.results.correctAnswers = 0;
      this.results.incorrectAnswers = 0;
    },

    generateRandomNumber() {
      return Math.floor(Math.random() * 9);
    },

    generateRoundNumber() {
      const maxLength = this.configDifficulty[this.difficulty].numberLength;
      let roundNumber = '';

      for (let i = 1; i <= maxLength; i += 1) {
        roundNumber += this.generateRandomNumber();
      }

      return roundNumber;
    },

    increaseNumbersLength() {
      if (this.results.correctAnswers % 3 !== 0) return;

      if (this.difficulty === 'easy') {
        this.configDifficulty.easy.numberLength += 1;
      } else if (this.difficulty === 'medium') {
        this.configDifficulty.medium.numberLength += 2;
      } else if (this.difficulty === 'hard') {
        this.configDifficulty.hard.numberLength += 3;
      }

      this.configDifficulty[this.difficulty].visibleTime -= 50;
    },

    decreaseNumberLength() {
      const { numberLength, minimalNumberLength } = this.configDifficulty[this.difficulty];

      if (numberLength > minimalNumberLength && this.difficulty === 'easy') {
        this.configDifficulty.easy.numberLength -= 1;
      } else if (numberLength > minimalNumberLength && this.difficulty === 'medium') {
        this.configDifficulty.medium.numberLength -= 2;
      } else if (numberLength > minimalNumberLength && this.difficulty === 'hard') {
        this.configDifficulty.hard.numberLength -= 3;
      }

      this.configDifficulty[this.difficulty].visibleTime += 50;
    },

    checkSubmitAnswer(answer) {
      let rightAnswer;
      const difficulty = this.settings.difficulty.value;
      const delay = this.configDifficulty[difficulty].visibleTime;

      setTimeout(() => {
        rightAnswer = Number(answer) === Number(this.roundNumber);

        if (rightAnswer) {
          this.results.correctAnswers += 1;
          this.increaseNumbersLength();
        } else {
          this.results.incorrectAnswers += 1;
          this.decreaseNumberLength();
        }

        if (this.currentRound === this.settings.rounds.value) {
          this.setSimulatorOnFinal();
        } else {
          this.currentRound += 1;
          this.startSimulator();
        }
      }, delay);
    },

    changeSelectableSettings({ settingName, settingValue, settingDescription }) {
      this.settings[settingName].value = settingValue;
      this.settings[settingName].description = settingValue;
      this.settings[settingName].description = settingDescription;
      this.resetSimulator();
    },
  },
};
</script>

<style lang="stylus" scoped>
.remember-number
  position relative
  display flex
  justify-content center
  flex-wrap wrap
  width 75%
  margin-right auto
  align-self center
  background-color #fff
</style>
