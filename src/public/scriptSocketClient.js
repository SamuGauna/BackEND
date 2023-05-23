const socketClient = io();

const form = document.getElementById('form')
const nameForm = document.getElementById('name')
const priceForm = document.getElementById('price')
const listProduct = document.getElementById('products')

form.onsubmit =(e)=>{
    e.preventDefault();
    const name = nameForm.value;
    const price = priceForm.value;
    socketClient.emit('newProductFromSocketClient', {name, price})
}
socketClient.on('updateArrayProducts', (array)=>{
    console.log(array);
    let infoProd = '';
    array.forEach(e => {
        infoProd += `${e.name} - ${e.price}`
    });
    listProduct.innerHTML = infoProd;
})