const mongoose = require('mongoose');
const Convert = require('../../util/mongoose');
const Schema = mongoose.Schema;

const Sup = new Schema({
    name: { type: String },
    image: { type: String },
    address: { type: String },
    phonenumber: { type: String }
}, {
    versionKey: false
});

const supplier = mongoose.model('supplier', Sup);

class Supplier {
    async findAll(data){
        await supplier.find({})
        .then((suppliers)=>{
            suppliers = Convert.cvDataToObjects(suppliers);
            data.suppliers = suppliers;
        })
        .catch(()=>{
            data.suppliers = [];
            console.log('[ERROR] Get supplier fail');
        })
    }

    async create(data, result){
        let sup = new supplier(data);
        await sup.save()
        .then(()=>{
            result.status = 'success';
        })
        .catch((err)=>{
            result.status = 'fail';
            result.err = err;
        })
    }
}

module.exports = new Supplier;