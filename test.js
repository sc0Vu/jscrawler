var fs = require('fs-extra')
var path = require('path')

fs.readdir(path.join(__dirname, 'tests'))
  .then((files) => {
    function runTest(file) {
      console.log(`Start to run test ${file}`)
      try {
        require(path.join(__dirname, 'tests', file))
      } catch(e) {
        console.log(`Run test ${file} error: ${e.message}`)
      }
    }

    files = files.filter((file) => {
      return /^([a-zA-Z0-9]+)\.js$/.test(file.trim())
    })
    files.forEach(async (file) => {
      runTest(file)
    })
  })
  .catch((err) => {
    console.log(`Read directory error: ${err.message}`)
  })