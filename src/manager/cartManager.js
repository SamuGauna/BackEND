import fs from "fs"
import { ProductManager } from "../manager/productManager.js"

const productManager = new ProductManager()

export class CartManager {
    constructor (path) {
        this.dirName = './src/files'
        this.fileName = this.dirName + path              
        this.fs = fs
    }
    createFileCart = async()=>{
        try {
            if(!this.fs.existsSync(this.fileName)) {            
                await this.fs.promises.mkdir(this.dirName, {recursive: true})
                await this.fs.promises.writeFile(this.fileName, "[]")           
            }    
        } catch (error) {
            throw Error `El archivo se encuentra creado ${error}`
        }    
    }
    createCart = async()=>{
        try {
            let cartGet = await this.getCarts()
            const lastProduct = cartGet[cartGet.length - 1];
            const newId = lastProduct ? lastProduct.id + 1 : 1;
            const cart = {
                id: newId,
                products: []
            } 
            cartGet.push(cart)
            await fs.promises.writeFile(this.fileName, JSON.stringify(cartGet, null, 2))
        } catch (error) {
            
        }
    }
    getCarts = async()=>{
        try{
            let readCart = await this.fs.promises.readFile(this.fileName, "utf-8")
            let readCartParse = JSON.parse(readCart) 
            return readCartParse
        } catch(error){
            console.log(error);
        }
    }
    getCartById = async(id)=>{
        try {
            let cartGet = await this.getCarts()
            let findCartId = cartGet.find((cart => cart.id === id))
            if (findCartId) {                                                                             
                return findCartId.products
            } else {
                throw Error ("El id recibido no coincide")
            }
        } catch (error) {
            console.log(error);
        }
    }
    addProductCart = async(idCart, Idproduct)=>{
        try {
            let cartGet = await this.getCarts()
            const lastProduct = cartGet[cartGet.length - 1];
            const newQuantity = lastProduct ? lastProduct.quantity + 1 : 1;
            let findProd = await productManager.getProductById(Idproduct)
            let productId = findProd.id
            const newProdToCart = {
                quantity: newQuantity,
                prod: productId
            }
            cartGet.products.push(newProdToCart)
            await fs.promises.writeFile(this.fileName, JSON.stringify(cartGet, null, 2))
        } catch (error) {
            console.log(error);
        }
    }

}