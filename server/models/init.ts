import sequelize from './db'

sequelize.sync({ force: true })
  .then(() => console.log('所有模型同步完成'))
  .catch(err => console.log('模型同步失败', '\n', err));