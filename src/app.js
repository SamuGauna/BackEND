import express from "express";
import { ProductManager } from "../projectManager.js";


const app = express()
const PORT = 8080
const product = new ProductManager("/products.json")

app.listen(PORT, ()=>{
    console.log("server ok en puerto 8080");
})
app.get('/products/', async(req, res) =>{
    try {
        const {limit} = req.query
        const objectJS = await product.getProducts()
        let objectJSParse = JSON.parse(objectJS)
        if (limit) {
            const limitProducts = await objectJSParse.splice(0, parseFloat(limit))
            res.status(200).send(limitProducts)
        } else {
            res.status(200).send(objectJS)
        }
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})
app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const objectJS = await product.getProducts()
        let objectJSParse = JSON.parse(objectJS)
        
        if(pid){
            const paramFind = objectJSParse.find(p=> p.id === parseFloat(pid))
            if(paramFind){
                res.status(200).send(paramFind)
            }else{
                res.status(404).json({message:'Product not found'})
            }
        }
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});



// const testing = async()=> {
//     try {
//         await product.createFile()
//         const consulta1 = await product.getProducts()
//         console.log("consulta1", consulta1);
//         // se agrega un producto 
//         await product.addProduct("Escoba", "Semi nueva", 77, "https://http2.mlstatic.com/D_NQ_NP_2X_780827-MLA52027354635_102022-F.webp", "5s21", 5)
//         await product.addProduct("Mopa", "Nueva", 88, "https://http2.mlstatic.com/D_NQ_NP_2X_724551-MLA32041668736_092019-F.webp", "2b51ss", 20 )
//         await product.addProduct("Secador de piso", "Un solo uso", 99, "https://http2.mlstatic.com/D_NQ_NP_2X_775191-MLA53364171913_012023-F.webp", "3sd5c", 2)
//         // consulta por id
//         // const consulta2 = await product.getProductById(1)
//         // console.log("consulta 2", consulta2);
//         // // actualizar el producto por id
//         // await product.updateProduct(1,{price:300, stock:30})
//         // const consulta3 = await product.getProducts()
//         // console.log("consulta 3", consulta3);
//         // // eliminar producto por id
//         // const consulta4 = await product.deleteProduct(1)
//         // console.log("consulta 4", consulta4);
//         // // consulta el array
//         // const consulta5 = await product.getProducts()
//         // console.log("consulta 5", consulta5);
//     } catch (error) {
//         console.log(error)
//     }
// }
// testing();