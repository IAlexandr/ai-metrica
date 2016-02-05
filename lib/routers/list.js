module.exports = [
  {
    mountPoint: '/visits',
    module: require('./stuff/visits'),
    restricted: true
  },
  {
    mountPoint: '/register',
    module: require('./stuff/register'),
    restricted: true
  },
  {
    mountPoint: '/visits',
    module: require('./stuff/visits'),
    restricted: true
  },
  {
    mountPoint: '/log',
    module: require('./stuff/log'),
    restricted: true
  },
  {
    mountPoint: '/history',
    module: require('./stuff/history'),
    restricted: true
  }
];
