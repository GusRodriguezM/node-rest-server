import { request, response } from "express";
import { Category } from '../models/index.js';

export const createCategory = async( req = request, res = response ) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne( { name } );

    //Searchs in the database for any other category with the same data
    if( categoryDB ){
        return res.status(400).json({
            msg: `The category ${categoryDB.name} already exists`
        });
    }

    //Prepare the data to save in the DB
    const data = {
        name,
        user: req.user._id
    }

    //Saving the data into the database
    const category = new Category( data );

    await category.save();

    res.json( category );

}