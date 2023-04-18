
 const fs = require('fs')

class ProductManager {

    constructor (path) {
        this.dirName = './files'
        this.fileName = this.dirName + path              
        this.fs = fs
    }

    static id = 0

    createFile = async() => {       
        try {
            if(!this.fs.existsSync(this.fileName)) {            
                await this.fs.promises.mkdir(this.dirName, {recursive: true})
                await this.fs.promises.writeFile(this.fileName, "[]")           
            }    
        } catch (error) {
            throw Error `El archivo se encuentra creado ${error}`
        }    
    }

    addProduct = async(title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {           
        throw Error ("Falta info")     
        } 
        let product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: ProductManager.id++
        }

        try {
            let readProduct = await this.fs.promises.readFile(this.fileName, "utf-8")          
            let readProductParse = JSON.parse(readProduct)
            let busquedaCode = readProductParse.some((product => product.code === code))
            if(busquedaCode) {
                throw Error ("Mismo código")
            }       
            readProductParse.push(product)
            await fs.promises.writeFile(this.fileName, JSON.stringify(readProductParse, null, 2))
        } catch (error) {
            throw Error ("No se puede agregar el producto.")
        }         

    }

    getProducts = async() => {
        let readProduct = await this.fs.promises.readFile(this.fileName, "utf-8")
        let readProductParse = JSON.parse(readProduct) 
        return readProductParse    
    }

    getProductById = async(id) => {
        try {
            let readProduct = await this.fs.promises.readFile(this.fileName, "utf-8")  
            let readProductParse = JSON.parse(readProduct)   
            let busquedaCode = readProductParse.find((product => product.id === id))  
            if (busquedaCode) {                
                return busquedaCode
            } else {
                throw Error ("El id recibido no coincide")
            }
        } catch (error) {
            throw Error ("El id recibido no coincide")
        } 
    }

    updateProduct = async(id, data) => {
        try {
            let readProduct = await this.fs.promises.readFile(this.fileName, "utf-8")  
            let readProductParse = JSON.parse(readProduct)  
            let busquedaCode = readProductParse.find((product => product.id === id))   
            if (busquedaCode) {                  
            busquedaCode.title = data               
            await fs.promises.writeFile(this.fileName, JSON.stringify(readProductParse, null, 2))                      
            } else {
                throw Error ("El id recibido no coincide")
            }
        } catch {
            throw Error ("El id recibido no coincide")
        }
    }

    deleteProduct = async(id) => {
        try {
            let readProduct = await this.fs.promises.readFile(this.fileName, "utf-8")  
            let readProductParse = JSON.parse(readProduct)  
            let nuevoArray = []
            let busquedaCode = readProductParse.find((product => product.id === id)) 
            if (busquedaCode) {
                nuevoArray = readProductParse.filter((p) => p.id !== id)
                await fs.promises.writeFile(this.fileName, JSON.stringify(nuevoArray, null, 2))
            } else {
                throw Error ("Ningún producto contiene el id recibido.")
            }       
        } catch {
            throw Error ("El id recibido no coincide")
        } 
    }

}
const product = new ProductManager("/products.json")
// product.createFile()
//product.addProduct("Escoba", "Semi nueva", 77, "https://http2.mlstatic.com/D_NQ_NP_2X_780827-MLA52027354635_102022-F.webp", "5s21", 5)

