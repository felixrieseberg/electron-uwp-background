'use strict'

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // If we're in a Windows Store AppX Container, let's attempt
    // to register our background task.
    const path = require('path')
    const fs = require('fs')
    const registerer = path.join(__dirname, '..', 'registerer', 'BackgroundTaskRegisterer.exe')
    const spawn = require('child_process').spawn

    // Ensure that BackgroundTaskRegisterer.exe exists - if so, call it
    fs.lstat(registerer, (err, stats) => {
      if (err) {
        console.log(err)
      }

      if (stats && stats.isFile()) {
        console.log('Registering background tasks')

        const runningRegisterer = spawn(registerer)
        runningRegisterer.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`)
        })

        runningRegisterer.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`)
        })

        runningRegisterer.on('close', (code) => {
          console.log(`child process exited with code ${code}`)
        })
      } else {
        console.warn('BackgroundTaskRegisterer not found.')
      }
    })
  }
}
