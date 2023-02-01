import dayjs from 'dayjs'
import { app } from '@storybook/vue3'
app.config.globalProperties.$moment = dayjs;
