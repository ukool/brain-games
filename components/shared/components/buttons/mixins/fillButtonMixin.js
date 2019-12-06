export default {
  props: {
    text: {
      type: String,
      default: null,
    },

    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['md', 'sm', 'xs'].indexOf(value) !== -1;
      },
    },

    wide: {
      type: Boolean,
      default: false,
    },

    light: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handlerClick() {
      this.$emit('click');
    },
  },
};
