const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {

        pseudo: {
            type: Schema.Types.String,
            required: true
        },

        password: {
            type: Schema.Types.String,
            required: true
        },

        isSuperAccount: {
            type: Schema.Types.Boolean,
            default: false
        },

        createdAt: {
            type: Date,
            default: Date.now
        },

        token: {
            type: Schema.Types.String,
            required : false,
        }
    });

const tweetSchema = new Schema(
    {
        data : {
            type: Schema.Types.Mixed,
            required: true
        },

        type : {
            type: Schema.Types.Mixed,
            required: true
        },

        matching_rules : {
            type: Schema.Types.Mixed,
            required: true
        }
    });

const ruleSchema = new Schema(
    {
        value : {
            type : Schema.Types.String,
            required : true
        },

        tag : {
            type : Schema.Types.String,
            required : true
        }
    });

module.exports = {
    Account: mongoose.model('account', AccountSchema)
}