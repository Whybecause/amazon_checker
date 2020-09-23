const mongoose = require('mongoose');
require('mongoose-type-url');

const uriSchema = mongoose.Schema({
        uri1: {type : mongoose.SchemaTypes.Url, required: true},
        uri2: {type: String, required: true}
});

module.exports = mongoose.model('Uri', uriSchema);