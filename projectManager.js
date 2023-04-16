
const fs = require('fs')

class ProductManager {
    constructor(){
        this.products = []
        this.path = './products.json'
    }
    static id = 0
    addProduct = async(title, description, price, thumbnail, stock, code)=>{
        try{
            if(title && description && price && thumbnail && stock && code){
                const newProduct = {
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    stock: stock,
                    code: code,
                    id: ProductManager.id++,
                }
                this.products.push(newProduct)
                await fs.promises.writeFile(this.path, JSON.stringify(newProduct, null, 2))
            } else {
                console.error("Al producto le faltan datos")
            }
        }catch(error){
            console.log(`error en el add products ${error}`)
        }
        
    }
    getProducts = async()=>{
        try{
            if(fs.existsSync(this.path)){
                const readFileGetProducts = await fs.promises.readFile(this.path, "utf-8")
                const parseGetProducts = JSON.parse(readFileGetProducts)
                return parseGetProducts
            }else {
                await fs.promises.writeFile(this.path, "[]")
            }
        }catch(error){
            console.log(`error en el get products ${error}`);
        }
    }
    getProductsById = async(id)=>{
        try{
            if(fs.existsSync(this.path)){
                const searchId = await fs.promises.readFile(this.path, "utf-8")
                const searchIdParse = JSON.parse(searchId)
                const productFind = searchIdParse.forEach((item)=>{
                    if(item.id == id){
                        console.log('El producto que buscas si esta en tu inventario')
                        return productFind
                    }
                }) 
                
            } else {
                console.log("Not Found");
            }
        }catch(error){
            console.log(`error en el getProductsById ${error}`);
        }
    }
    updateProduct(){

    }
    deleteProduct(){

    }
}

const product = new ProductManager()
product.getProducts()
product.addProduct("Escoba", "Semi nueva", 77, "https://http2.mlstatic.com/D_NQ_NP_2X_780827-MLA52027354635_102022-F.webp", 5, 1545484)
product.getProducts()
