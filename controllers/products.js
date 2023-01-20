import { request, response } from "express";
import { Product } from "../models/index.js";


export const getProducts = async( req = request, res = response ) => {}
export const getProductById = async( req = request, res = response ) => {}

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