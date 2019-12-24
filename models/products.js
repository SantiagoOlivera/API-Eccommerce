//products model

const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;
//var childSchema = new Schema({ name: 'string' });
//Define a schema
const ProductSchema = new Schema({
 title: {
  type: String,
  trim: true,  
  required: true,
 },
 sku: {
  type: String,
  trim: true,
  required: true
 },
 description:{
   type: String,
   required: false
 },
 price: {
  type: Number,
  trim: true,
  required: true
 },
 images: {
    type: Array,
    trim: true,
    required: false
 }
 /* ,
    categoria: {type:Schema.ObjectId, ref:"categorias"},
    relacionados:[childSchema] 
 */
});
//aca definis la paginacion de los resultados del json
//ProductSchema.plugin(mongoose.mongoosePaginate);
module.exports  =  mongoose.model('products', ProductSchema);