<template>
<section class="section">
  <div class="container game__field">
    <div class="row">
      <div class="game__field">
        <ConsiderCard />
        vfnt
      </div>
      <aside class="game__sidebar">
        <ConsiderSidebar />
      </aside>
    </div>
  </div>
</section>
</template>

<script>
import ConsiderCard from '~/components/math/consider/ConsiderCard';
import ConsiderSidebar from '~/components/math/consider/ConsiderSidebar';

export default {
  components: {
    ConsiderCard,
    ConsiderSidebar,
  },

  data() {
    return {
      gameSettings: {
        difficulty: 'easy',
        addition: true,
        subtraction: true,
        division: false,
        multiplication: false,
        treeDigit: false,
        fourDigit: false,
        rounds: 10,
        cardsAnswerCount: 4,
        english: false,
        operators: ['-', '+'],
      },
      gameResult: {
        correctAnswers: 0,
        incorrectAnswers: 0,
      },
      gameStatus: {
        start: false,
        complete: false,
      },
      correctAnswer: null,
    };
  },

  mounted() {
    console.log(this.generateGameCondition());
  },

  methods: {
    generateGameCondition() {
      const numberRange = this.calculateNumberRange();
      const firstOperand = this.generateRandomNumber(numberRange);
      const secondOperand = this.generateRandomNumber(numberRange);
      const operatorLength = this.gameSettings.operators.length - 1;
      const operator = this.gameSettings.operators[this.generateRandomNumber(operatorLength)];

      const conditions = `${firstOperand} ${operator} ${secondOperand}`;
      // const answer = parseInt(conditions, 10);
      // console.log(answer)
      return conditions;
    },

    generateRandomNumber(maxLength) {
      const randomNumber = Math.floor(Math.random() * maxLength);

      return randomNumber;
    },

    calculateNumberRange() {
      let numberRange;

      if (this.gameSettings.treeDigit && !this.gameSettings.fourDigit) {
        numberRange = 999;
      } else if (this.gameSettings.fourDigit) {
        numberRange = 9999;
      } else {
        numberRange = 99;
      }

      return numberRange;
    },
  },

};
</script>

<style lang="stylus
" scoped>

</style>