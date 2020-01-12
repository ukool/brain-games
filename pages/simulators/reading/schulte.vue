<template>
<GameField
  :simulator-info="simulatorInfo"
  :game-pause="gameStatus.pause"
  :game-final="gameStatus.final"
  :final-modal-data="gameFinalData"
  @start-game="setGameOnPlayed"
  @start-game-after-pause="setGameOnPlayed"
>
  <template v-slot:game>
    <div
      class="game__wrapper"
      :class="[
        gameCardSize,
        { 'disabled': gameStatus.pause }
      ]"
    >
      <p
        v-if="gameSettings.tip.enabled && gameStatus.played"
        class="game__tip"
      >
        Найдите число {{ currentCardNumber }}
      </p>
      <span
        v-if="gameSettings.dotInCenter.enabled && gameStatus.played"
        class="game__dot-in-center"
      />
      <SchulteCard
        v-for="card in cards"
        :key="`${card.number}_shulte-card`"
        :card="card"
        :fill-cards="gameSettings.highlight.enabled"
        :colored-cards="gameSettings.coloredCards.enabled"
        :animation-cards="gameSettings.animation.enabled"
        class="game__card"
        :class="gameCardSize"
        @card-click="compareCardNumbers"
      />
    </div>
  </template>

  <template v-slot:sidebar>
    <Sidebar
      :settings="gameSettings"
      @change-difficulty="changeDifficultyLevel"
      @change-settings="changeGameSettings"
      @reset="resetGame(true)"
    />
  </template>
</GameField>
</template>

<script>
import firebase from 'firebase/app';
import SchulteCard from '~/components/reading/schulte/SchulteCard';
import GameField from '~/components/shared/layouts/GameField';
import Sidebar from '~/components/shared/layouts/Sidebar';

export default {
  name: 'SchulteGame',

  components: {
    Sidebar,
    GameField,
    SchulteCard,
  },

  data() {
    return {
      gameSettings: {
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
              { value: '3x3', title: '3x3', selected: false },
              { value: '4x4', title: '4x4', selected: false },
              { value: '5x5', title: '5x5', selected: false },
              { value: '6x6', title: '6x6', selected: false },
              { value: '7x7', title: '7x7', selected: false },
            ],
          },
          type: 'selectable',
        },
        tip: {
          title: 'Показывать подсказку',
          enabled: true,
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
        // orally: {
        //   title: 'Устная игра',
        //   enabled: false,
        //   name: 'orally',
        //   type: 'switchable',
        // },
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
        cardAmount: 25,
      },
      gameStatus: {
        played: false,
        final: false,
        pause: false,
      },
      gameResult: {
        moves: 0,
        time: 0,
      },
      gameFinalData: {
        difficulty: {
          title: 'Сложность',
          value: null,
        },
        moves: {
          title: 'Количество ходов',
          value: null,
        },
      },
      currentCardNumber: 1,
      cards: null,
      simulatorInfo: null,
    };
  },

  computed: {
    gameCardSize() {
      let size;

      switch (this.gameSettings.difficulty.value) {
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
    this.cards = this.shuffleCardsArray();
  },

  methods: {
    /**
     * Генерирует массив карточек
     * в завимости от количества cardAmount в gameSettings
     * @returns { Array }
     */
    generateCardsArray() {
      return Array.from(Array(this.gameSettings.cardAmount).keys()).map(i => ({
        number: i + 1,
        status: null,
      }));
    },

    /**
     * Перемешивает массив карточек
     * @returns { Array }
     */
    shuffleCardsArray() {
      const cardsArray = this.generateCardsArray();
      cardsArray.sort(() => Math.random() - 0.5);
      cardsArray.sort(() => Math.random() - 0.5);

      return cardsArray;
    },

    /**
     * Сравнивает номер карточки на которую кликнули,
     * с текущим номером
     * @param number
     */
    compareCardNumbers(number) {
      this.gameResult.moves += 1;

      const card = this.findCardByNumber(number);

      if (number === this.currentCardNumber) {
        card.status = 'success';
      } else {
        card.status = 'error';
        setTimeout(() => {
          card.status = null;
        }, 500);
      }

      if (this.currentCardNumber === this.gameSettings.cardAmount) {
        this.setGameOnFinal();
        this.resetGame();
      }

      if (this.currentCardNumber === number) this.currentCardNumber += 1;
    },

    findCardByNumber(number) {
      return this.cards.find(card => card.number === number);
    },

    /**
     * Изменяет сложность уровня игры
     * @param value
     */
    changeDifficultyLevel(value) {
      this.setGameOnPause();
      this.gameSettings.difficulty.value = value;
      this.gameSettings.cardAmount = value[0] * value[2];

      this.resetGame(true);
    },

    /**
     * Изменяет настройки игры
     * @param value
     * @param settingsName
     */
    changeGameSettings(value, settingsName) {
      const gameMustContinue = settingsName.includes('tip')
        || settingsName.includes('animation')
        || settingsName.includes('dotInCenter');

      if (gameMustContinue) {
        this.gameSettings[settingsName].enabled = value;
        return;
      }

      this.setGameOnPause();
      this.gameSettings[settingsName].enabled = value;
      this.resetGame(true);
    },

    /**
     * Сбрасывает игру
     * @param pause - ставит игру на паузу
     */
    resetGame(pause = false) {
      this.currentCardNumber = 1;
      this.cards = this.shuffleCardsArray();

      if (pause) this.setGameOnPause();
    },

    /**
     * Устанавливает игру в режим паузы
     */
    setGameOnPause() {
      this.gameStatus.played = false;
      this.gameStatus.pause = true;
    },

    /**
     * Устанавливает игру в режим игры
     */
    setGameOnPlayed() {
      this.gameStatus.played = true;
      this.gameStatus.pause = false;
      this.gameStatus.final = false;
    },

    /**
     * Устанавливает игру в режим "игра закончена"
     */
    setGameOnFinal() {
      this.gameStatus.played = false;
      this.gameStatus.final = true;

      this.gameFinalData.difficulty.value = this.gameSettings.difficulty.value;
      this.gameFinalData.moves.value = this.gameResult.moves;
    },
  },
};
</script>
<style scoped lang="stylus">
.game
  &__wrapper
    display flex
    flex-wrap wrap
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
        left 0
        bottom -20px
        width 100%
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
