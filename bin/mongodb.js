var mongoose = require('mongoose');
//var mongoosePaginate = require('mongoose-paginate-v2');
mongoose.connect('mongodb://' +  process.env.MONGO_DB_HOST + '/' + process.env.MONGO_DB_DB, { useUnifiedTopology: true, useNewUrlParser: true  }, function(error){
//mongoose.connect('mongodb://' + process.env.MONGO_DB_HOST + '/' + process.env.MONGO_DB_DB, { useUnifiedTopology: true, useNewUrlParser: true }, function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});
/* mongoosePaginate.paginate.options = { 
   lean:  true,
   limit: process.env.MONGO_DB_LIMIT
};
mongoose.mongoosePaginate = mongoosePaginate */
module.exports = mongoose; 

