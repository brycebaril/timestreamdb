timestreamdb
=====

[![NPM](https://nodei.co/npm/timestreamdb.png)](https://nodei.co/npm/timestreamdb/)

[![david-dm](https://david-dm.org/brycebaril/timestreamdb.png)](https://david-dm.org/brycebaril/timestreamdb/)
[![david-dm](https://david-dm.org/brycebaril/timestreamdb/dev-status.png)](https://david-dm.org/brycebaril/timestreamdb#info=devDependencies/)

Super early alpha version!

Docs coming, there is a *LOT* in there. Uses [timestream](http://npm.im/timestream) for a query engine.

Supports joins, aggregates, map operations, filters...

```javascript
var TsDB = require("timestreamdb")
var level = require("level")

var orig = level("./testdb", {valueEncoding: "json"})

var statware = require("statware")

// Using statware to make some numbers to look at...
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
    .numbers()
    .mean(1000)
    .toArray(console.log)
}, 1000)
```

API
===

Docs coming soon! Take a peek at [timestream](http://npm.im/timestream) for query docs.

LICENSE
=======

MIT
