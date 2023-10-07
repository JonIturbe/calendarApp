const { response, json } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJwt } = require("../helpers/jwt"); 

const crearUsuario = async( request, response = response ) => {
    const { email, password } = request.body;
    try{
        let user = await User.findOne({ email: email });
        if( user ){
            return response.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con ese correo"
            })
        }
        user = new User( request.body );

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();
        const token = await generateJwt( user.id, user.name );

        response.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch(error){
        response.status(500).json({
            ok: false,            
            msg: "Failure in the request"
        })
    }
}

const loginUsuario = async( request, response = response ) => {
    const { email, password } = request.body;

    try {
        const user = await User.findOne({ email: email });
        if( !user ){
            return response.status(400).json({
                ok: false,
                msg: "No existen usuarios con ese email"
            })
        }

        const validPassword = bcrypt.compareSync( password, user.password );
        if( !validPassword ){
            return response.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            })
        }

        const token = await generateJwt( user.id, user.name );

        response.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        response.status(500).json({
            ok: false,            
            msg: "Failure in the request"
        })
    }
}

const revalidarToken = async( request, response = response ) => {
    const { uid, name } = request;

    const token = await generateJwt( uid, name );

    response.status(200).json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};