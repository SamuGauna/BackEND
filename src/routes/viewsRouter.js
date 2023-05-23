import { Router } from "express";
const router = Router()
import { ProductManager } from "../manager/productManager.js";
const p = new ProductManager("/products.json")

const listProduct = await p.getProducts()

router.get('/', async(req, res) =>{
    try {
        
        res.render('home', {listProduct})
    } catch (error) {
        console.log(error);
    }
    
})
router.get('/realtimeproducts', async(req, res) =>{
    try {
        res.render('realTimeProducts')
    } catch (error) {
        console.log(error);
    }
    
})
export default router