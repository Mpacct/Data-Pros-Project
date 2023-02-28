const sequelize = require('../config/connection');


const seedDB = async () => {
    await sequelize.sync({force: true});
    
    const users = await User.bulkCreate()
}