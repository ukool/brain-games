export default {

  props: {
    text: {
      type: String,
      default: null,
    },

    iconName: {
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
  },

  computed: {
    onlyIcon() {
      if (this.iconName && !this.text) return 'only-icon';
      return false;
    },
  },

  methods: {
    handlerClick() {
      this.$emit('click');
    },
  },
};
