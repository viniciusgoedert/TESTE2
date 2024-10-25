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
        const orders = getOrders();
        const order = {
            items: cartItems,
            date: new Date().toLocaleString() // Data e hora da finalização
        };
        orders.push(order);
        saveOrders(orders);

        alert('Pedido finalizado com sucesso!');

        // Limpa o carrinho após finalizar o pedido
        localStorage.removeItem('cartItems');
        cartCount = 0;
        document.getElementById('cart-count').innerText = cartCount;
        closeCart();
    }
});

// Função para obter pedidos do localStorage
function getOrders() {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
}

// Função para salvar pedidos no localStorage
function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Evento para exibir pedidos ao clicar em "Meus Pedidos"
document.getElementById('meus-pedidos').addEventListener('click', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do link

    const orderList = document.getElementById('pedido-lista');
    const orders = getOrders();

    // Limpa a lista de pedidos anterior
    orderList.innerHTML = ''; 

    // Verifica se há pedidos
    if (orders.length === 0) {
        document.getElementById('empty-orders-message').style.display = 'block';
    } else {
        document.getElementById('empty-orders-message').style.display = 'none';

        // Adiciona cada pedido à lista
        orders.forEach(order => {
            const orderDiv = document.createElement('div');
            const orderDate = document.createElement('p');
            orderDate.innerText = `Pedido finalizado em: ${order.date}`;
            
            const itemList = document.createElement('ul');
            order.items.forEach(item => {
                const li = document.createElement('li');
                li.innerText = item.name;
                itemList.appendChild(li);
            });

            orderDiv.appendChild(orderDate);
            orderDiv.appendChild(itemList);
            orderList.appendChild(orderDiv);
        });
    }

    // Adiciona a classe 'show' para exibir a lista
    orderList.classList.add('show');
});
