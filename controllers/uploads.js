import { request, response } from "express";

export const uploadFiles = ( req = request, res = response) => {

    res.json({
        msg: 'Upload files'
    });

}