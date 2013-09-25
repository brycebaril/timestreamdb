module.exports = TimestreamDB
module.exports.open = function (path, options, callback) {
  // TODO force valueEncoding = json?
  if (callback) {
    levelup(path, options, function (err, db) {
      if (err) return callback(err)
      callback(err, TimestreamDB(db, options))
    })
  }
  else
    return TimestreamDB(levelup(path, options), options)
}

var levelup = require("levelup")
var Version = require("level-version")
var through2map = require("through2-map")
var ts = require("timestream")

var toTimestream = through2map.ctor({objectMode: true},
  function _transform(record) {
    var tsRecord = record.value
    tsRecord._t = record.version
    tsRecord._key = record.key
    return tsRecord
  }
)

/**
 * Create a new TimestreamDB
 * @param {LevelUp} instance   A LevelUp instance
 * @param {object} options Configuration options for level-version
 */
function TimestreamDB(instance, options) {
  if (!(this instanceof TimestreamDB))
    return new TimestreamDB(instance, options)

  var db = Version(instance, options)

  db.ts = function (key) {
    return ts(db.versionStream(key, {reverse: true}).pipe(toTimestream()))
  }
  db.timeStream = db.ts

  return db
}