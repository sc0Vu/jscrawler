var Pachong = require('../index')
var now = new Date().getTime()

async function runBenchmark(options, callback) {
  var crawler = new Pachong({
    method: 'GET',
    uri: 'https://httpbin.org/uuid'
  }, options)

  for (var i=9; i>0; i--) {
    crawler.queue({
      method: 'GET',
      uri: 'https://httpbin.org/uuid'
    })
  }
  var type = (options.parallel) ? 'parallelly' : 'sequentially'
  var start = new Date().getTime()

  console.log(`Start to crawl 10 pages ${type}`)

  try {
    var res = await crawler.run()
    console.log(`Crawl 10 pages ${type} success, total time ${(new Date().getTime() - start)} ms`)
    callback(res)
  } catch (err) {
    console.log(`Crawl 10 pages ${type} failed, total time ${(new Date().getTime() - start)} ms`)
    callback(err)
  }
}


console.log('Benchmark')
runBenchmark({
  parallel: true
}, () => {
  runBenchmark({
    parallel: false
  }, () => {
    console.log(`Finished benchmark! Total execute time ${new Date().getTime() - now} ms`)
  })
})
