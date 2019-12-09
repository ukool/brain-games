<template>
<SimulatorsList
  simulators-title="Тренажеры для развитие памяти"
  :simulators="simulators"
/>
</template>

<script>
import SimulatorsList from '~/components/shared/layouts/SimulatorsList';

export default {
  components: { SimulatorsList },

  data() {
    return {
      simulators: [
        {
          iconName: 'pair',
          name: 'Найди пару',
          description: 'На игровом поле имеются переврнутые карточки, под каждой из которой, находится изображение. При клике на карточку появляется изображение. Карточке следует найти пару.',
          target: 'Найди всем картам пару.',
          page: 'memory/pair',
        },
        {
          iconName: 'number',
          name: 'Запомни число',
          description: 'На игровом поле на несколько секунд появляются и затем исчезают цифры.',
          target: 'Запомни как можно больше чисел.',
          page: 'memory/remember-number',
        },
      ],
    };
  },
};
</script>
