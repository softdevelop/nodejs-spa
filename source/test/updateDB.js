const { User } = require('../app/models/users');
const Entertainer = require('../app/models/entertainers');
const { entertainer_typeService } = require("../app/services");

module.exports = async () => {
    console.log('updateDB starts')
    try {
      
        const talents = await Entertainer.find();
        console.log("talents", talents.length)
        talents.forEach(async (u, index) => {
            u.act_name = u.act_name.trim().replace(/\s\s+/g, ' ').split(" ").join("-");
            await u.save();
        })

        console.log('updateDB ends')
    } catch (error) {
        console.log("error", error)
    }
}