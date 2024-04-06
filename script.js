const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const CartCounter = document.getElementById("cart-count")
const addresInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")


let cart = [];

//Abrir modal ao clicar no carrinho
cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex"
    uptadeCartModal();
})

//Fechar modal ao clicar fora
cartModal.addEventListener("click",function(event){
    if (event.target === cartModal){
        cartModal.style.display = "none"
    }
})

//Fechar no botao "fechar"
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){


    let ParenButton = event.target.closest(".add-to-cart-btn")

    if(ParenButton){
        const name = ParenButton.getAttribute ("data-name")
        const price = parseFloat(ParenButton.getAttribute ("data-price"))

        //Adicionar no carrinho.
        addToCart(name, price)

    }
        
})

//Função para adcionar no carrinho
function addToCart(name, price){
    const existingItem =  cart.find(item => item.name === name)

    if (existingItem){
        //Se o item já existe, aumenta apenas a quantidade +1
        existingItem.quantity +=1;
        
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    uptadeCartModal()
    
}


//Atualiza o carrinho
function uptadeCartModal(){
    cartItemsContainer. innerHTML = "";
    let total =0;

    cart.forEach(item =>{
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex" , "justify=between", "mb-4" , "flex-col")
        
        cartItemElement.innerHTML = `
            <div class= "flex items-center justify-between">
                <div>
                <p class="font-medium">${item.name}</p>
                <p>Quantidade: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

        
        <button class="remove-from-cart-btn" data-name="${item.name}">
            Remover
        </button>
        

            </div>
        `

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    CartCounter.innerHTML = cart.length;

}

//funcão para remover item do carrinho
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity > 1){
            item.quantity -=1;
            uptadeCartModal();
            return;
        }

        cart.splice(index, 1);
        uptadeCartModal();
    }
}


addresInput.addEventListener("input", function(event)
{
    let inputValue = event.target.Value;

    if(inputValue !== ""){
        addresInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")

    }
})



        //Finalizar pedido

checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurantOpen();
    if(!isOpen){
   
        Toastify({
            text: "Ops, o restaurante está fechado",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "rigth", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
        }).showToast();


    return;
    }

    if(cart.length === 0) return;
    if(addresInput.value === ""){
        addressWarn.classList.remove("hidden")
        addresInput.classList.add("border-red-500")
        return;
    }

    //Enviar pedido para o whatsaap

    const cartItems = cart.map((item)=>{
        return (
            `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "11987057553"
    
    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addresInput.value}`, "_blank")

    cart = [];
    uptadeCartModal();
})

//Manipular horario
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 0.0 && hora <22;
    //true = Restaurante aberto
} 
//ALTERAR AQUI!

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen ();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");

    }else{
        spanItem.classList.remove("bg-green-600");
        spanItem.classList.add("bg-red-500");
    
}