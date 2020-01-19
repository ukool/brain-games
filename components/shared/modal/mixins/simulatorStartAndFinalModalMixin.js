import BorderButton from '~/components/shared/components/buttons/BorderButton';

export default {
  components: { BorderButton },

  props: {
    title: {
      type: String,
      default: null,
    },

    iconName: {
      type: String,
      default: null,
    },

    tags: {
      type: Array,
      default: null,
    },

    text: {
      type: [Array, String],
      default: null,
    },
  },

  methods: {
    startSimulator() {
      this.$emit('start-simulator');
    },
  },
};
