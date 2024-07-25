const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = mongoose.Schema.Types; // Use ObjectId correctly


const fileFolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: ObjectId,
        ref: "Users",
        required: true,
    },
    sharedWith: [{
        type: ObjectId,
        ref: "Users",
    },
    ],
    type: {
        type: String,
        required: true,
    },
    link: String,
    parentId: {
        type: ObjectId,
        ref: "fileFolder",
    },
    children: {
        type: ObjectId,
        ref: "fileFolder"
    },
    metaData: {
        type: Object,
    }
},
    {
        Timestamp: true,
    }
);


const FileFolderModel = mongoose.model("fileFolder", fileFolderSchema);

module.exports = FileFolderModel;