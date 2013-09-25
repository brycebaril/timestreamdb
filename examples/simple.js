var TsDB = require("../timestreamdb")
var level = require("level")

var orig = level("./testdb", {valueEncoding: "json"})

var statware = require("statware")

var stats = statware()
stats.registerHelper(statware.memstats)
stats.registerHelper(statware.procstats)
stats.registerHelper(statware.sysstats)

var db = TsDB(orig)

setInterval(function () {
  stats.getStats(function (s) {
    db.put("foo", s)
  })
}, 100)

setInterval(function () {
  db.ts("foo")
    .flatten()
    .mean(1000)
    .nest()
    .toArray(console.log)
}, 1000)
