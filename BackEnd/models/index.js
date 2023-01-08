import mongoose from "mongoose";
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
        },

        tweets: {
            type: Schema.Types.Array,
            required: false
        },

        autoConnect: {
            type: Schema.Types.Boolean,
            required: false
        }
    });

const TweetSchema = new Schema(
    {
        data: {
            type: Schema.Types.Mixed
        },

        matching_rules: {
            type: Schema.Types.Mixed
        }
    });

const RuleSchema = new Schema(
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
export const Account = mongoose.model('account', AccountSchema);
export const Tweet = mongoose.model('tweet', TweetSchema);
