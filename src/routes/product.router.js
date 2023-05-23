import { Router } from "express";
import { ProductManager } from "../manager/productManager.js";

const router = Router();
const product = new ProductManager("/products.json")


router.get('/', async(req, res) =>{
    try {
        const {limit} = req.query
        const products = await product.getProducts()
        
        if (limit) {
            const limitProducts = await products.splice(0, parseFloat(limit))
            res.status(201).send(limitProducts)
        } else {
            res.status(201).send(products)
        }
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})
router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const productById = await product.getProductById(parseInt(pid))
        if(productById == null){
            return res.status(404).json({message:'Product not found'})
        }
        return res.status(201).json(productById)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Ha ocurrido un error' });
    }
});
router.post('/', async(req, res)=>{
    try {
        
        const {title, description, price, thumbnails, code, stock, status} = req.body
        const newProd = await product.addProduct(title, description, price, thumbnails, code, stock, status)
        if(product.existCode){
            res.status(404).json({message: "El producto ya existe"})
        }
        res.status(201).send(`El producto ${newProd.title} fue agregado exitosamente`)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Ha ocurrido un error' });
    }
})
router.put('/:id', async(req,res)=>{ 
    try {
        const prod = req.body
        const {id} = req.params
        const prodFind = await product.getProductById(parseFloat(id))
        if (prodFind) {
            const updateProd = await product.updateProduct(parseFloat(id), prod)
            res.status(201).send(`Product with code: ${updateProd.code} updated successfully`)
        } else{
            res.status(404).send('product not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
router.delete('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const allProducts = await product.getProducts()
        if (allProducts.length > 0) {
            await product.deleteProduct(parseFloat(id))
            res.status(201).send(`product with id: ${id} deleted`)
        }else{
            res.send(`product with id: ${id} not found`)
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

export default router;
