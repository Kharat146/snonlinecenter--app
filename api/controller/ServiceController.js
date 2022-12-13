const { createService, getService } = require("./helpers/Servicehelper")
const { StatusCodes } = require('http-status-codes');
const { sendError } = require('../error/errorHandler');
const { ApiError } = require('./../error');

const createServiceCntrl = async (req,res)=>{
    try {
       const {name,icon}= req.body
       let result = await createService({name,icon})
       res.status(200||result.status)
       res.json(result)

    } catch (error) {
        sendError(error)
    }
}

const getAllServicesCntrl = async (req,res)=>{
    try {
        let result = await getService()
        res.status(200||result.status)
        res.json(result)
    } catch (error) {
        sendError(error)
    }
}

module.exports = {
    createServiceCntrl,
    getAllServicesCntrl
}