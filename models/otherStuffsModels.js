const mongoose=require('mongoose');

const otherStuffSchema = mongoose.Schema({
    name: { 
        type: String , 
        require
    },
    varients: [],
    prices: [],
    category:{
        type:String,
        require
    },
    image:{
        type: String,
        require
    },
    description:{
        type:String,
        require
    }
});
const otherStuffsModel = mongoose.model('otherstuffdata',otherStuffSchema);
module.exports = otherStuffsModel;