<template>
<SimulatorsList
  simulators-title="Тренажеры для мышления"
  :simulators="simulators"
/>
</template>

<script>
import SimulatorsList from '~/components/shared/layouts/SimulatorsList';

export default {
  name: 'MathSimulatorsPage',

  components: { SimulatorsList },

  data() {
    return {
      simulators: [
        {
          iconName: 'calculator',
          name: 'Усный счет',
          description: 'Таблица Шульте представляет собой таблицу, в ячейках которой хаотичным образом размещены последовательно идущие числа.',
          target: 'Найди все числа по порядку',
          page: '/math/consider',
        },
      ],
    };
  },
};
</script>

