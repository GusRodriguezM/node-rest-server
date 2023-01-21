import { request, response } from "express";

export const search = ( req = request, res = response) => {

    const { collection, searchTerm } = req.params;

    res.json({
        msg: 'Search',
        collection,
        searchTerm
    });

}