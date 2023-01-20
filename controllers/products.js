import { request, response } from "express";
import { Product } from "../models/index.js";

//GET API Controller - gets all the products
export const getProducts = async( req = request, res = response ) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    /**
     * Returns the total number of documents and all the products in a list if status = true
     */
    const [ total, products ] = await Promise.all([
        Product.countDocuments( query ),
        Product.find( query )
            //returns the object referenced by its id - user
            .populate( 'user', 'name' )
            //returns the object referenced by its id - category
            .populate( 'category', 'name' )
            .skip( Number( from ) )
            .limit( Number( limit) )
    ]);

    res.json({
        total,
        products
    })

}

//GET API controller - get a category by its id
export const getProductById = async( req = request, res = response ) => {

    const { id } = req.params;

    //Returns the product with the reference of the user and the category
    const product = await Product.findById( id )
                            .populate( 'user', 'name' )
                            .populate( 'category', 'name' );

    res.json( product );

}

//POST API Controller - creates a new product
export const createProduct = async( req = request, res = response ) => {

    const { status, user, ...body } = req.body;

    const name = body.name.toUpperCase();

    //Searches in the database for any product with the same name
    const productDB = await Product.findOne( { name } );

    if( productDB ){
        return res.status(400).json({
            msg: `The product ${productDB.name} already exists in the database`
        });
    }

    //Prepare the data to send
    const data = {
        ...body,
        name,
        user: req.user._id
    }

    const product = new Product( data );

    await product.save();

    res.status(201).json( product );

}


export const updateProduct = async( req = request, res = response ) => {}
export const deleteProduct = async( req = request, res = response ) => {}