import express from 'express'
import axios from 'axios'

const app = express()

let taskQueue = [];
let runningTasks = 0;
const maxConcurrency = 20;

app.use(express.json())

app.post('/submit-task', (req, res) => {
  const taskData = req.body

  const task = () => {
    return new Promise((resolve, reject) => {
      axios.post('...', taskData)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  taskQueue.push({ task, res })

  executeTasks()
})

function executeTasks(res) {
  if (runningTasks < maxConcurrency && taskQueue.length > 0) {
    const { task, res } = taskQueue.shift()
    runningTasks++

    task()
      .then(result => {
        res.send(result)
      })
      .catch(error => {
        res.status(500).send(error)
      })
      .finally(() => {
        runningTasks--
        executeTasks()
      })
  }
}

const PORT = 3000
app.listen(PORT, () => {
  console.log('中间层服务器已启动')
})