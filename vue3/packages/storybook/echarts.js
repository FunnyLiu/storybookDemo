/*
 * @FileName:
 * @Author: huzhifu
 * @Date: 2022-08-05 14:46:55
 * @LastEditors: huzhifu
 * @LastEditTime: 2022-08-05 15:23:07
 * @Descripttion:
 */
import * as echarts from 'echarts'
import { app } from '@storybook/vue3'

app.config.globalProperties.$echarts = echarts;

