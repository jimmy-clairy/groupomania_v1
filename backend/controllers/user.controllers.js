const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.models');

const Admin = {
    pseudo: "Admin",
    email: "admin@test.fr",
    password: "Admin123"
}

exports.signup = (req, res) => {
    let verifAdmin = false;
    let messageUser = "Utilisateur";

    if (req.body.pseudo === Admin.pseudo && req.body.email === Admin.email && req.body.password === Admin.password) {
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

exports.login = (req, res) => {
    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
            }
            // bcrypt compare le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                    } else {
                        res.status(200).json({
                            userId: user._id,
                            // Fonction sign() permet de chiffrer un nouveau token
                            token: jwt.sign(
                                { userId: user._id },
                                process.env.TOKEN_SECRET,
                                { expiresIn: '24h' })
                        });
                    }
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res) => {
    UserModel.findOne({ _id: req.params.id }).select('-password')
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find(/*{ admin: false }*/)/*.select('-password')*/
    res.status(200).json(users)
};

exports.deleteOneUser = (req, res) => {
    UserModel.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyOneUser = async (req, res) => {

    const user = {
        pseudo: req.body.pseudo,
        email: req.body.email,
    };

    if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10)
    };

    UserModel.updateOne({ _id: req.params.id }, { ...user })
        .then(() => res.status(200).json({ message: "Utilisateur modifié" }))
        .catch(error => res.status(400).json({ error }));

};