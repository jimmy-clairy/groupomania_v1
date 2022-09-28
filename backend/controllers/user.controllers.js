const bcrypt = require('bcrypt');
const UserModel = require('../models/user.models');

const admin = {
    pseudo: "Admin",
    email: "admin@test.fr",
    password: "Admin123"
}

exports.signup = (req, res) => {
    let verifAdmin = false;
    let messageUser = "Utilisateur";

    if (req.body.pseudo === admin.pseudo && req.body.email === admin.email && req.body.password === admin.password) {
        verifAdmin = true;
        messageUser = "Administrateur"
    }

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new UserModel({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
                admin: verifAdmin
            });
            user.save()
                .then(() => res.status(201).json({ message: messageUser + ' créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};