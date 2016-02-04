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
  }
];
