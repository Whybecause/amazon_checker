const { set } = require('mongoose');
const Uri = require('../models/uri.model');

exports.createUri = async (req, res) => {
    const uri = new Uri(req.body);
    try {
        const result = await uri.save();
        return res.status(201).json({
            message: 'Uri added successfully',
        });
    } catch(e) {
        return res.status(500).json({
            error: 'Something went wrong...'
        });
        
    }
}

exports.getUris = async (req, res) => {
    const uris = await Uri.findOne({_id: '5f6bd8296cef6f40097f8657'});
    try {
        return res.send({id: uris.id, uri1 : uris.uri1, uri2: uris.uri2});
    } catch(error) {
        return res.send(error);
    }
}

exports.updateUris = async (req, res) => {
    const urisId = req.params.id;
    const urisData = req.body
    try {
    const uris = await Uri.findById(urisId);
    uris.set(urisData);
    uris.save(err => {
        if (err) {
            return console.log(err);
        }
        return res.status(200).send({ message: 'Uri updated successfully'});
    })
    } catch(error) {
        return res.send({message: 'Something went wrong...'});
    }
}