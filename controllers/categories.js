import { request, response } from "express";
import { Category } from '../models/index.js';

//GET API controller - gets all the categories
export const getCategories = async( req = request, res = response ) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ]);

    res.json({
        total,
        categories
    });

}

export const getCategoryById = async( req = request, res = response ) => {

    const { id } = req.params;

    const category = await Category.findById( id );

    res.json( category );

}

//POST API Controller - creates a new category
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