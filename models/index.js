const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {

        /**
         * Le pseudo de l'utilisateur
         */
        pseudo: {
            type: Schema.Types.String,
            required: true
        },

        /**
         * Le mot de passe de l'utilisateur
         */
        password: {
            type: Schema.Types.String,
            required: true
        },

        /**
         * SI l'utilisateur est un "super utilisateur"
         */
        isSuperAccount: {
            type: Schema.Types.Boolean,
            default: false
        },

        /**
         * Quand le compte a été crée
         */
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

// On exporte le model
module.exports = {
    // On dit que le Model Account est créé à partir du Schema AccountSchema et le Model sera stocké dans la base de donnée MongoDB sous le nom "account"
    Account: mongoose.model('account', AccountSchema)
}