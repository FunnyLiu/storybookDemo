import { initProps } from '../../storybook/index'
import DoImageClipUploader from './index.vue'

export default {
  title: 'Dialog弹框/ImageClipUploader图片裁切上传',
  component: DoImageClipUploader
}

const Template = (args, { argTypes }) => {
  return {
    setup() {
      return {
        args
      }
    },
    methods: {
      test() {
        this.$refs.dialog.show('')
      }
    },
    components: { DoImageClipUploader },
    template: `<div>
        <button @click="test()" >打开弹框</button>
        <do-image-clip-uploader ref="dialog" v-bind="args" />
      </div>`
  }
}

export const 基础用法 = Template.bind({})
基础用法.args = {}

export const 图片尺寸 = Template.bind({})
图片尺寸.args = {
  width: 300,
  height: 120
}
图片尺寸.parameters = {
  docs: {
    storyDescription: '自定义裁切比例'
  }
}

export const base64模式 = Template.bind({})
base64模式.args = {
  needUpload: false
}
base64模式.parameters = {
  docs: {
    storyDescription: '不走上传流程，返回的结果base64，而不是url'
  }
}

const TemplateWithInit = (args, { argTypes }) => ({
  setup() {
    return {
      args
    }
  },

  methods: {
    test() {
      this.$refs.dialog.show(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAADo1JREFUeF7tnHmoVsUbx+dmpmnlLmppbrgr4U6WGZKKJooobqhpmZkbbWZJi0SLf1iggpaIlrmg4i6KuIDgggZulVZWtmG5dFPLtPIan4e+L+Ppvd57vbcfw+/MgZf3fc+Zc87M9/tsM/PM5Jw7d+6qi0cwCOREQoLhwioSCQmLD5eTm5sbTVZApOScP38+EhISIVFDAmIDHxI1JDBC8vLyoskKiJOcq1evRkJCIiRqSEBs4EOihkRCwkIgsNpEDYmEBIZAYNWJGhIJCQyBwKoTNSQSEhgCgVUnakgkJDAEAqtO1JBISGAIBFadqCGRkMAQCKw6UUMiIYEhEFh1ooZEQgJDILDqRA2JhASGQGDViRoSCQkMgcCqEzUkEhIYAoFVJ2pIJKRgBP766y93880351vw3LlzrkKFCnbdL3vx4kV366232rnSpUu7y5cvu1tuucXl5OS48+fPuzvuuMP9/vvvrmzZsu6PP/5wZcqUsWdcunTJzvlHXl6eu+mmmxyZttzP4b+X/1z7888/rZzqy3N555UrV1ypUqWy3sdJruvZ/OYejqA1BKDUMBrHh8Zz/Prrr/Z922232W+uQQaHwBTYNBbgRICIpJyA4BxleA7v5AOpkKF3ijDqxXmu65qI5rxPhk9ybm6uK1++fOYdejckQijPCpIQgKFh+WnJ6dOnXbVq1dzGjRtdr169riFB1y5cuOBuv/12AxngRBSagjZISyAFoiiPBmU70AykuWLFinZZkv3bb78ZwDogBbIqVapk2smzJSS+Nvta5z8veA2hgjQSEwRoECTpHzVqlGnHuHHjXKNGjdzw4cPd6NGjXZcuXQwfSamvLQC4Z88et337dvfcc8+5cuXKGbiQA4C8gzJoCe/it0yjQD979qwB/umnn7rp06e7ypUrG+GU5z6knvv4tG/f3o0YMSJDGAL0448/GrG0SdrIb+pi5jXEZGt8gcCSP6BVqPbHH3/sXn/9ddejRw8jQWbok08+MUI4P3LkSFe7dm0DQhoi2/7KK684nv/MM88YETxfIAI+gKGd9erVs/sRiC1btriff/7ZyqJ13H/nnXeaNlSvXt3uefnll00YunXrZoBDCMLQs2dPK88xaNAg02yeQX2ktXzTXjOFIRKSVGkqTKOXLFniFi1aZI2qWbOmNRrAaDiNBDTs9AMPPOCmTJliYCUPAPrpp5/cXXfd5X744QfTJAjBlCH5kvRHHnnE9evXz567adMmt3fvXtOsunXrulq1armxY8fab70fYZg8ebJr1aqV++WXX0xzdEAIbUJY5s+f7+rXr2915l0KGPhG+4IkRA3x7T+OGy34/PPPDRAk6vnnn3dz586132gE5Wn4pEmT3LBhwwwc3+TgJ7p37+62bdtmZQEBwJMHJHFNH8oive+8846RgGZi4iBt37599u7Dhw+7zp07u++//97ABnwIkt/hHVx/9913XePGjTPP9t9NG4MkhAYpyqHCOOqvv/7aQKSBXMd+czz11FN2HoeM88WvyNRUrVrVNAENgIwTJ064F154wW3YsCFrJAaZFunk5Jh54r8CC96JALRr184NHDjQ7ieggCTMmwIDvlesWOE++ugj9/bbb1s7eB7+okOHDu7+++83R897OIfp4j0IBiQHSYicMpVGMlevXu3Wr19vzpOo5rvvvjOC2rZtayRgwtAewGvZsqU1EFMCeE888UQmNJ0zZ447ePCg+SDMCuBJC9R/kSDgX3gX1zGDmDMkvkmTJqYhEDJmzBg3YMAA8xP4JoQB30R9IX3BggUZBeAZ+LY2bdq4Bg0amLnlXZg2iFDoGyQhgCVV90NLzgMojV61apW7++67rVE7duwwIvr3729S3Lp1azNrOjAFkIvj3b17t/1GayABMCCPA63gGt846DfeeCMTMnN94sSJrmvXrq5Pnz6mlY8//rg5aoh/7733rM4IAGYUgZk6deo1oTQOH63BZEk7IFzhsZnREJ26Iip1BgGdSgMm4ers2bOt8WvXrjVHi7946KGHDCTAwqHj2DFZHDh7JNEPgTkPGdwjMycCX3rpJSP7sccey5CKJvLuBx980PXu3dvuQQAmTJhg75o5c6aZ1tdee80tXrzYffPNN+7FF1/MEI32durUyc2aNcsExj/8egVLCFKK5GJbjx49ao2j4o8++qhbuHChgUmkg2YAHuRgTiABQDFrffv2tfKy0/INEI258oddeJeGU8aPH+/uu+8+IxctoizvfvPNNy264xpCgoagDS1atDDzdc8991id0JZdu3a5999/30wuz8XHQQSah/aoH0LQgeZTzkxkiBqicSdJ0QcffGCNwl7T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'
      )
    }
  },
  components: { DoImageClipUploader },
  template: `<div>
      <button @click="test()" >打开弹框</button>
      <do-image-clip-uploader ref="dialog" v-bind="args" />
    </div>`
})

export const 初始化 = TemplateWithInit.bind({})
初始化.parameters = {
  docs: {
    storyDescription:
      '指定初始图片（base64格式）裁切，通过this.$refs.dialog.show("base64编码")'
  }
}

const TemplateWithInitRemote = (args, { argTypes }) => ({
  setup() {
    return {
      args
    }
  },

  methods: {
    test() {
      this.$refs.dialog.show(
        'http://minio.mw.zqdev.project.virtueit.net/icon/user/e693c8a890d4b7555c28cab4642134a2'
      )
    }
  },
  components: { DoImageClipUploader },
  template: `<div>
      <button @click="test()" >打开弹框</button>
      <do-image-clip-uploader ref="dialog" v-bind="args" />
    </div>`
})

export const 初始化远程 = TemplateWithInitRemote.bind({})
初始化远程.parameters = {
  docs: {
    storyDescription:
      '指定初始图片（远端url）裁切，通过this.$refs.dialog.show("remote url")'
  }
}

export const 初始化远程不上传 = TemplateWithInitRemote.bind({})
初始化远程不上传.args = {
  needUpload: false
}
初始化远程不上传.parameters = {
  docs: {
    storyDescription:
      '指定初始图片（远端url）裁切，不需要上传，只是做裁切，通过this.$refs.dialog.show("remote url")'
  }
}
