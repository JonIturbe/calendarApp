const { response, json } = require("express");

const getEvents = async( request, response = response ) => {
    response.status(200).json({
        ok: true,
        msg: "getEventos"
    });
}

const createEvent = async( request, response = response ) => {
    try{
        response.status(201).json({
            ok: true,
            msg: "crearEvento"
        });
    } catch(error){
        response.status(500).json({
            ok: false,            
            msg: "Failure in the request"
        })
    }
}

const updateEvent = async( request, response = response ) => {
    response.status(200).json({
        ok: true,
        msg: "updateEvent"
    });
}

const deleteEvent = async( request, response = response ) => {
    response.status(200).json({
        ok: true,
        msg: "deleteEvent"
    });
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};