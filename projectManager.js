class ProductManager {
    constructor(){
        this.products = []
    }
    addProduct(title, description, price, thumbnail, id, stock){
        if(title && description && price && thumbnail && id && stock){
            const newProduct = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                id: id,
                stock: stock
            }
            return this.products.push(newProduct)
        } else {
            console.error("Al producto le faltan datos")
        }
    }
    getProducts(){
        console.log(this.products)
        return this.products
    }
    getProductsById(id){
        if(this.products.find(item => item.id == id)){
            console.log('El producto que buscas si esta en tu inventario')
        } else {
            console.log("Not Found");
        }

    }
}

const product = new ProductManager()
product.addProduct("Escoba", "Semi nueva", 77, "https://http2.mlstatic.com/D_NQ_NP_2X_780827-MLA52027354635_102022-F.webp", 1, 5)
product.getProducts()
product.getProductsById(1)
product.getProductsById(2)