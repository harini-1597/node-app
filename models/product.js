const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    "ProductID": {
        type: Number,
        required: true
    },
    "ProductName": {
        type: String,
        required: true,
    },
    "ProductBrand": {
        type: String,
        required: false,
    },
    "Gender": {
        type: String,
        required: false,
    },
    "Price (INR)": {
        type: Number,
        required: true,
    },
    "NumImages": {
        type: Number,
        required: false,
    },
    "Description": {
        type: String,
        required: false,
    },
    "PrimaryColor": {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("Product", productSchema);