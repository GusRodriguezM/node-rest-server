import { response } from "express";

//GET request controller
export const usersGet = (req, res = response) => {
    res.json({
        msg: 'GET request - controller'
    });
}

//POST request controller
export const usersPost = (req, res = response) => {
    res.json({
        msg: 'POST request - controller'
    });
}

//PUT request controller
export const usersPut = (req, res = response) => {
    res.json({
        msg: 'PUT request - controller'
    });
}

//DELETE request controller
export const usersDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE request - controller'
    });
}

//PATCH request controller
export const usersPatch = (req, res = response) => {
    res.json({
        msg: 'PATCH request - controller'
    });
}