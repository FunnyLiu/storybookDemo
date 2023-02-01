import { initProps } from '../../storybook/index'
import DoAnimate from './index.vue'
import { earth, position, head } from './animate'

export default {
  title: 'Basic基础/Animate动画',
  component: DoAnimate
}

const Template = (args, { argTypes }) => ({
  // props: initProps(argTypes),
  setup() {
    return { args }
  },
  data() {
    return {
      animationSpeed: 1
    }
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim
    },

    stop: function() {
      this.anim.stop()
    },

    play: function() {
      this.anim.play()
    },

    pause: function() {
      this.anim.pause()
    },

    onSpeedChange: function() {
      this.anim.setSpeed(this.animationSpeed)
    }
  },
  components: { DoAnimate },
  template: `<div>
    <do-animate  v-bind="args" v-on:animCreated="handleAnimation" />
    <div>
      <p>Speed: x{{animationSpeed}}</p>
      <input type="range" value="1" min="0" max="3" step="0.5"
             v-on:change="onSpeedChange" v-model="animationSpeed">
    </div>
    <button v-on:click="stop">stop</button>
    <button v-on:click="pause">pause</button>
    <button v-on:click="play">play</button>
  </div>`
})
export const 基础用法 = Template.bind({})
基础用法.args = {
  options: { animationData: earth },
  height: 400,
  width: 400
}

export const 自动播放 = Template.bind({})
自动播放.args = {
  options: { animationData: position, autoplay: false },
  height: 400,
  width: 400
}
自动播放.parameters = {
  docs: {
    storyDescription: '不要自动播放'
  }
}

export const 循环播放 = Template.bind({})
循环播放.args = {
  options: { animationData: head, loop: false },
  height: 400,
  width: 400
}
循环播放.parameters = {
  docs: {
    storyDescription: '不要循环播放'
  }
}
