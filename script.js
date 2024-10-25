// script.js

// Inicializa o contador de produtos no carrinho
let cartCount = 0;

// Seleciona todos os botões "Adicionar ao Carrinho"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Adiciona um evento de clique a cada botão
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.querySelector('h3').innerText;
        
        addToCart(productId, productName);
    });
});

// Função para adicionar produto ao carrinho
function addToCart(id, name) {
    const cartItems = getCartItems();
    cartItems.push({ id, name });
    cartCount++;
    saveCartItems(cartItems);
    document.getElementById('cart-count').innerText = cartCount;
    alert(`${name} adicionado ao carrinho!`);
}

// Função para obter itens do localStorage
function getCartItems() {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
}

// Função para salvar itens no localStorage
function saveCartItems(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
}

// Função para exibir o modal do carrinho
function openCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItemsList = document.getElementById('cart-items');
    const cartItems = getCartItems();

    cartItemsList.innerHTML = ''; // Limpa o conteúdo da lista
    if (cartItems.length === 0) {
        document.getElementById('empty-cart-message').style.display = 'block';
    } else {
        document.getElementById('empty-cart-message').style.display = 'none';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item.name;
            cartItemsList.appendChild(li);
        });
    }
    cartModal.style.display = 'block';
}

// Função para fechar o modal do carrinho
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Evento para abrir o modal do carrinho
document.getElementById('open-cart').addEventListener('click', openCart);

// Evento para fechar o modal do carrinho
document.querySelector('.close').addEventListener('click', closeCart);

// Evento para limpar o carrinho
document.getElementById('clear-cart').addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    cartCount = 0;
    document.getElementById('cart-count').innerText = cartCount;
    closeCart();
    alert('Carrinho limpo!');
});

// Evento para finalizar o pedido
document.getElementById('checkout').addEventListener('click', () => {
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        alert('Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.');
    } else {
        alert('Pedido finalizado com sucesso!');
        // Limpa o carrinho após finalizar o pedido
        localStorage.removeItem('cartItems');
        cartCount = 0;
        document.getElementById('cart-count').innerText = cartCount;
        closeCart();
    }
});
