import { request, response } from "express";

//GET request controller
export const usersGet = (req = request, res = response) => {

    const { q, name = 'no name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'GET request - controller',
        q,
        name,
        apikey,
        page,
        limit
    });
}

//POST request controller
export const usersPost = (req = request, res = response) => {

    const { name, age } = req.body;

    res.json({
        msg: 'POST request - controller',
        name,
        age
    });
}

//PUT request controller
export const usersPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'PUT request - controller',
        id
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