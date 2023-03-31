const user = require('../models/users')
const bcrypt = require ('bcryptjs')

async function seedData() {
    const findFirstUser = await user.findOne({email: 'lavinabijroniya810@gmail.com'})
    if(!findFirstUser) {
        await user.create({
            firstName: 'Goldy',
            lastName: 'Bijroniya',
            email:'lavinabijroniya810@gmail.com',
            password: await bcrypt.hash('password' , 8)

        })
    }
}