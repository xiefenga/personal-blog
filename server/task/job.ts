import { scheduleJob } from 'node-schedule'
import { saveDailyQuote } from '../services/daily'
import { DAILY_TASK_TIME } from '../utils/constants'

const tasks = () => {
  saveDailyQuote();
}

const job = scheduleJob(DAILY_TASK_TIME, tasks);

export default job
