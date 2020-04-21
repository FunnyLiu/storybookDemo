import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MyButton from './MyButton2.vue';

export default {
  title: 'Button2',
  component: MyButton,
};

export const Normal = () => ({
  components: { MyButton },
  template: '<el-button @click="action">Hello Button</el-button>',
  methods: { action: action('clicked') },
});

export const Disabled = () => ({
  components: { MyButton },
  template: '<el-button @click="action" :disabled="true">Hello Button</el-button>',
  methods: { action: action('clicked') },
});
