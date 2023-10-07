const { response, json } = require("express");
const Evento = require("../models/Evento");

const getEvents = async( request, response = response ) => {
    const eventos = await Evento.find()
        .populate("user", "name");

    response.status(200).json({
        ok: true,
        msg: eventos
    });
}

const createEvent = async( request, response = response ) => {
    const evento = new Evento( request.body );

    try{
        evento.user = request.uid;

        const eventoGuardado = await evento.save();
        response.status(201).json({
            ok: true,
            msg: eventoGuardado
        });
    } catch(error){
        console.log( error );
        response.status(500).json({
            ok: false,            
            msg: "Failure in the request"
        })
    }
}

const updateEvent = async( request, response = response ) => {
    const eventoId = request.params.id;

    try{
        const evento = await Evento.findById( eventoId );
        const uid = request.uid;

        if( !evento ){
            return response.status(404).json({
                ok: false,            
                msg: "No existe ningun evento con ese id"
            });
        }

        if( evento.user.toString() !== uid ){
            return response.status(401).json({
                ok: false,            
                msg: "No tienes permiso para editar este evento"
            });
        }

        const nuevoEvento = {
            ...request.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );
        return response.status(200).json({
            ok: true,
            evento: eventoActualizado
        });
    } catch(error){
        console.log( error );
        response.status(500).json({
            ok: false,            
            msg: "Failure in the request"
        })
    }
}

const deleteEvent = async( request, response = response ) => {
    const eventoId = request.params.id;

    try{
        const evento = await Evento.findById( eventoId );
        if( !evento ){
            return response.status(404).json({
                ok: false,            
                msg: "No existe ningun evento con ese id"
            });
        }

        if( evento.user.toString() !== request.uid ){
            return response.status(401).json({
                ok: false,            
                msg: "No tienes permiso para eliminar este evento"
            });
        }

        await Evento.findByIdAndDelete( eventoId );
        response.status(200).json({
            ok: true,
            msg: "Evento eliminado"
        });

    } catch(error){
        console.log( error );
        response.status(500).json({
            ok: false,            
            msg: "Failure in the request"
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};