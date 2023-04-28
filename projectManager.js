import fs from "fs"

export class ProductManager {

    constructor (path) {
        this.dirName = './files'
        this.fileName = this.dirName + path              
        this.fs = fs
    }

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
        try {
            let productJS = await this.getProducts() 
            let busquedaCode = productJS.some((product => product.code === code))
            if(busquedaCode) {
                throw Error ("Mismo código")
            }
            const lastProduct = productJS[productJS.length - 1];
            const newId = lastProduct ? lastProduct.id + 1 : 1;
            const product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: newId
        }       
            productJS.push(product)
            await fs.promises.writeFile(this.fileName, JSON.stringify(productJS, null, 2))
        } catch (error) {
            throw Error ("No se puede agregar el producto.")
        }         

    }

    getProducts = async() => {
        try{
            let readProduct = await this.fs.promises.readFile(this.fileName, "utf-8")
            // let readProductParse = JSON.parse(readProduct) 
            // return readProductParse
            return readProduct
        } catch(error){
            console.log(error);
        }
    }

    getProductById = async(id) => {
        try {
            let productJS = await this.getProducts() 
            let busquedaCode = productJS.find((product => product.id === id))  
            if (busquedaCode) {                
                return busquedaCode
            } else {
                throw Error ("El id recibido no coincide")
            }
        } catch (error) {
            throw Error ("El id recibido no coincide")
        } 
    }

    updateProduct = async(idUpdate, updateData) => {
        try {
            let productJS = await this.getProducts()
            let indexProduct = productJS.findIndex((product => product.id === idUpdate))   
            if (indexProduct != -1) {                  
                const updatedProduct = {
                    ...productJS[indexProduct],
                    ...updateData,
                };
                productJS[indexProduct] = updatedProduct
                await fs.promises.writeFile(this.fileName, JSON.stringify(productJS, null, 2));
                console.log(`Producto actualizado exitosamente`);
            } else {
                throw Error ("El id recibido no coincide")
            }
        } catch(error) {
            throw Error (error)
        }
    }

    deleteProduct = async(id) => {
        try {
            let productJS = await this.getProducts()
            let nuevoArray = []
            let busquedaCode = productJS.find((product => product.id === id)) 
            if (busquedaCode) {
                nuevoArray = productJS.filter((p) => p.id !== id)
                await fs.promises.writeFile(this.fileName, JSON.stringify(nuevoArray, null, 2))
            } else {
                throw Error ("Ningún producto contiene el id recibido.")
            }       
        } catch {
            throw Error ("El id recibido no coincide")
        } 
    }

}
