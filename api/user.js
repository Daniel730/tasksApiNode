const bcrypt = require("bcrypt-nodejs")

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash
            let users = req.body;
            app.db('users')
                .insert({name: users.name, email: users.email, password})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).json(err))
        })
    }

    return {save}
}