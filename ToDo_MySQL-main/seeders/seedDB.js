const user = require('../models/users')
const bcrypt = require('bcrypt')
async function seedData() {



    const findFirstRole = await roles.findOne({
        authority:'ROLE_SUPERADMIN'
    })

    if(!findFirstRole){
        await roles.bulkCreate([
            {
                authority :'ROLE_SUPERADMIN',

            } , {
                authority :'ROLE_ADMIN',
            } , {
                authority :'ROLE_USER',
            }
        ])
    }
    
    const findFirstUser = await user.findOne({email: 'lavinabijroniya810@gmail.com'})
    console.log(findFirstUser);
    if(!findFirstUser) {
        await user.create({
            firstName: 'Goldy',
            lastName: 'Bijroniya',
            email:'lavinabijroniya810@gmail.com',
            password: await bcrypt.hash('password' , 8)
            roleId:findAdminRole.id

        })
    }
}
module.exports = {seedData}