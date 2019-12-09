<template>
<SimulatorsList
  simulators-title="Тренажеры для скорочтения"
  :simulators="simulators"
/>
</template>

<script>
import SimulatorsList from '~/components/shared/layouts/SimulatorsList';

export default {
  name: 'SpeedReadingSimulatorsPage',

  components: { SimulatorsList },

  data() {
    return {
      simulators: [
        {
          iconName: 'sudoku',
          name: 'Таблица Шульте',
          description: 'Таблица Шульте представляет собой таблицу, в ячейках которой хаотичным образом размещены последовательно идущие числа',
          target: 'Найди все числа по порядку',
          page: '/simulators/speed-reading/schulte',
        },
        {
          iconName: 'stroop',
          name: 'Тест струпа',
          description: 'На игровом поле на несколько секунд появляются и затем исчезают цифры',
          target: 'Запомни как можно больше чисел',
          page: '/simulators/speed-reading/stroop',
        },
        {
          iconName: 'homophones',
          name: 'Омофоны',
          description: 'На игровом поле на несколько секунд появляются и затем исчезают цифры.',
          target: 'Найди все омофоны',
          page: '/simulators/speed-reading/homophones',
        },
      ],
    };
  },
};
</script>
