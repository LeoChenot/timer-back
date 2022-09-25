const User = require("./User");
const List = require("./List");
const Timer = require("./Timer");

User.hasMany(List, {
  as: 'lists',
  foreignKey: 'user_id',
});

List.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
});

// ---------------------

User.hasMany(Timer, {
  as: 'timers',
  foreignKey: 'user_id',
});

Timer.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
});

// ---------------------

List.hasMany(Timer, {
  as: 'timers',
  foreignKey: 'list_id',
});

Timer.belongsTo(List, {
  as: 'list',
  foreignKey: 'list_id',
});

module.exports = {
  User,
  List,
  Timer,
}