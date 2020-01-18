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
    <div class="schulte">
      <transition name="fade">
        <div
          v-if="showSimulator"
          class="schulte__wrapper"
          :class="[
            simulatorCardSize,
            { 'disabled': status.pause }
          ]"
        >
          <p
            v-if="settings.tip.enabled && status.played"
            class="schulte__tip"
          >
            Найдите число {{ cardNumberToBeClicked }}
          </p>
          <span
            v-if="settings.dotInCenter.enabled && status.played"
            class="schulte__dot-in-center"
          />
          <SchulteCard
            v-for="card in roundCards"
            :key="`${card.number}_schulte-card`"
            :card="card"
            :fill-cards="settings.highlight.enabled"
            :colored-cards="settings.coloredCards.enabled"
            :animation-cards="settings.animation.enabled"
            class="schulte__card"
            :class="simulatorCardSize"
            @card-click="checkClickedCard"
          />
        </div>
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
          <li class="sidebar-item">
            Осталось найти: {{ remainsFind }}
          </li>
        </ul>
      </template>
    </Sidebar>
  </template>
</SimulatorField>
</template>

<script>
import firebase from 'firebase/app';
import { shuffleArray } from '~/helpers/functions';
import SchulteCard from '~/components/reading/schulte/SchulteCard';
import SimulatorField from '~/components/shared/layouts/SimulatorField';
import Sidebar from '~/components/shared/layouts/Sidebar';

export default {
  name: 'SchulteSimulator',

  components: {
    Sidebar,
    SimulatorField,
    SchulteCard,
  },

  data() {
    return {
      settings: {
        difficulty: {
          title: 'Сложность',
          value: '5x5',
          name: 'difficulty',
          options: {
            default: {
              value: '5x5',
              title: '5x5',
            },
            list: [
              { value: '3x3', title: '3x3' },
              { value: '4x4', title: '4x4' },
              { value: '5x5', title: '5x5' },
              { value: '6x6', title: '6x6' },
              { value: '7x7', title: '7x7' },
            ],
          },
          type: 'selectable',
        },
        rounds: {
          title: 'Раундов',
          value: 5,
          name: 'rounds',
          options: {
            default: {
              value: 5,
              title: 5,
            },
            list: [
              { value: 1, title: 1 },
              { value: 5, title: 5 },
              { value: 10, title: 10 },
              { value: 15, title: 15 },
            ],
          },
          type: 'selectable',
        },
        tip: {
          title: 'Показывать подсказку',
          enabled: false,
          name: 'tip',
          type: 'switchable',
        },
        highlight: {
          title: 'Закрашивать угаданные карточки',
          enabled: true,
          name: 'highlight',
          type: 'switchable',
        },
        coloredCards: {
          title: 'Цветные карточки',
          enabled: false,
          name: 'coloredCards',
          type: 'switchable',
        },
        animation: {
          title: 'Анимации',
          enabled: true,
          name: 'animation',
          type: 'switchable',
        },
        dotInCenter: {
          title: 'Точка в центре',
          enabled: false,
          name: 'dotInCenter',
          type: 'switchable',
        },
      },
      configDifficulty: {
        '3x3': {
          cardsQuantity: 9,
        },
        '4x4': {
          cardsQuantity: 16,
        },
        '5x5': {
          cardsQuantity: 25,
        },
        '6x6': {
          cardsQuantity: 36,
        },
        '7x7': {
          cardsQuantity: 49,
        },
      },
      status: {
        played: false,
        final: false,
        pause: false,
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
          value: 0,
        },
        incorrectAnswers: {
          title: 'Неправильных ответов',
          value: 0,
        },
        rounds: {
          title: 'Количество раундов',
          value: 5,
        },
      },
      roundCards: null,
      cardNumberToBeClicked: 1,
      currentRound: 1,
      pauseBeforeNewRound: false,
      simulatorInfo: null,
    };
  },

  computed: {
    showSimulator() {
      return !!(this.roundCards && this.roundCards.length && !this.pauseBeforeNewRound && this.status.played);
    },

    difficulty() {
      return this.settings.difficulty.value;
    },

    remainsFind() {
      return this.configDifficulty[this.difficulty].cardsQuantity - (this.cardNumberToBeClicked - 1);
    },

    simulatorCardSize() {
      let size;

      switch (this.difficulty) {
      case '3x3':
        size = 'three';
        break;
      case '4x4':
        size = 'four';
        break;
      case '5x5':
        size = 'five';
        break;
      case '6x6':
        size = 'six';
        break;
      case '7x7':
        size = 'seven';
        break;
      default:
      }

      return size;
    },
  },

  asyncData() {
    return firebase.database().ref('simulatorsInfo/reading/schulte')
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
      this.cardNumberToBeClicked = 1;
      this.status.played = false;
      this.status.final = false;
      this.status.pause = true;
    },

    setSimulatorOnFinal() {
      this.status.played = false;
      this.status.final = true;
      this.status.pause = false;

      this.finalData.difficulty.value = this.settings.difficulty.value;
      this.finalData.correctAnswers.value = this.results.correctAnswers;
      this.finalData.incorrectAnswers.value = this.results.incorrectAnswers;
      this.finalData.rounds.value = this.settings.rounds.value;
    },

    startSimulator() {
      this.roundCards = [];
      this.cardNumberToBeClicked = 1;
      this.setSimulatorOnPlayed();
      this.roundCards = this.generateRoundCardsArray();
      this.roundCards = this.shuffleArray(this.roundCards);
    },

    resetSimulator() {
      this.cardNumberToBeClicked = 1;
      this.roundCards = [];
      this.setSimulatorOnPause();
    },

    /**
     * Генерирует массив карточек
     * в завимости от уровня сложности configDifficulty
     * @returns { Array }
     */
    generateRoundCardsArray() {
      let roundCards = Array.from(Array(this.configDifficulty[this.difficulty].cardsQuantity).keys());
      roundCards = roundCards.map(i => ({
        number: i + 1,
        status: null,
      }));

      return roundCards;
    },

    /**
     * Сравнивает номер карточки на которую кликнули,
     * с текущим номером
     * @param number
     */
    checkClickedCard(number) {
      const card = this.findCardByNumber(number);

      if (number === this.cardNumberToBeClicked) {
        card.status = 'success';
        this.cardNumberToBeClicked += 1;
        this.results.correctAnswers += 1;
      } else {
        card.status = 'error';
        this.results.incorrectAnswers += 1;
        setTimeout(() => {
          card.status = null;
        }, 500);
      }

      if (this.cardNumberToBeClicked === this.configDifficulty[this.difficulty].cardsQuantity + 1) {
        if (this.currentRound === this.settings.rounds.value) {
          this.setSimulatorOnFinal();
        } else {
          this.currentRound += 1;
          this.pauseBeforeNewRound = true;
          this.startSimulator();
          setTimeout(() => {
            this.pauseBeforeNewRound = false;
          }, 200);
        }
      }
    },

    findCardByNumber(number) {
      return this.roundCards.find(card => card.number === number);
    },

    /**
     * Изменяет настройки игры
     * @param settingName - имя настройки в объекте settings
     * @param settingValue - новое значение настройки
     */
    changeSelectableSettings(settingName, settingValue) {
      this.setSimulatorOnPause();
      this.settings[settingName].value = settingValue;
      this.cardsQuantity = settingValue[0] * settingValue[2];

      this.resetSimulator();
    },

    /**
     * Изменяет настройки игры
     * @param value - новое значение настройки
     * @param settingsName - имя настройки в объекте settings
     */
    changeSwitchableSettings(value, settingsName) {
      const simulatorMustContinue = settingsName.includes('tip')
        || settingsName.includes('animation')
        || settingsName.includes('dotInCenter');

      if (simulatorMustContinue) {
        this.settings[settingsName].enabled = value;
        return;
      }

      this.setSimulatorOnPause();
      this.settings[settingsName].enabled = value;
      this.resetSimulator();
    },

    shuffleArray,
  },
};
</script>
<style scoped lang="stylus">
.schulte
  display flex
  justify-content center
  align-items center
  width 100%

  &__wrapper
    display flex
    flex-wrap wrap
    position relative
    &.three
      width 25%
    &.four
      width 35%
    &.five,
    &.six,
    &.seven
      width 50%

    &.disabled
      pointer-events none
      &::before
        content ''
        position absolute
        top -20px
        right -20px
        bottom -20px
        left -20px
        background $white
        z-index 20

  &__card
    &.three
      width calc(100% / 3 - 2px)
    &.four
      width calc(100% / 4 - 2px)
    &.five
      width calc(100% / 5 - 2px)
      &::after
        padding-top 90%
    &.six
      width calc(100% / 6 - 2px)
    &.seven
      width calc(100% / 7 - 2px)

  &__tip
    position absolute
    top -12%
    left 50%
    transform translateX(-50%)
    width 100%
    text-align center

  &__dot-in-center
    position absolute
    top 50%
    left 50%
    z-index 20
    width 25px
    height 25px
    pointer-events none
    background-color rgba($red, 0.5)
    border-radius 50%
    transform translate(-50%, -50%)
</style>
