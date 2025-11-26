document.addEventListener("DOMContentLoaded", () => {
    // Asigură-te că coșul este ascuns la început
    const body = document.querySelector('body');
    body.classList.remove('showCart');

    let cart = []; // Coșul de cumpărături
    const listProductHTML = document.querySelector('.listProduct');
    const listCartHTML = document.querySelector('.listCart');
    const iconCart = document.querySelector('.icon-cart span');
    const closeCart = document.querySelector('.close');
    const clearCartBtn = document.querySelector('.clearCart');

    // Funcția de actualizare a coșului în UI
    const updateCartHTML = () => {
        listCartHTML.innerHTML = '';

        if (cart.length === 0) {
            listCartHTML.innerHTML = '<p>Coșul este gol!</p>';
        } else {
            cart.forEach((product, index) => {
                let cartItem = document.createElement('div');
                cartItem.classList.add('items');
                cartItem.innerHTML = `
                    <div class="image">
                        <img src="${product.image}" alt="${product.name}" class="produsecos">
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price}</div>
                    <div class="quantity">
                        <span class="minus" data-index="${index}">-</span>
                        <span>${product.quantity}</span>
                        <span class="plus" data-index="${index}">+</span>
                    </div>
                    <button class="removeItem" data-index="${index}">Remove</button>
                `;
                listCartHTML.appendChild(cartItem);
            });
        }

        iconCart.textContent = cart.reduce((total, product) => total + product.quantity, 0);

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Funcția de adăugare în coș
    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({...product, quantity: 1 });
        }

        updateCartHTML();

        setTimeout(() => {
            alert(`${product.name} a fost adăugat în coș!`);
        }, 500);
    };

    const clearCart = () => {
        cart = [];
        localStorage.removeItem('cart'); // Elimină datele din localStorage
        updateCartHTML(); // Actualizează interfața
        alert("Coșul a fost golit!");
    };


    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart); // Convertim din string în array de obiecte
    }

    updateCartHTML();

    // Eveniment pentru a detecta click pe butonul Add To Cart
    listProductHTML.addEventListener('click', (event) => {
        if (event.target.classList.contains('addCart')) {
            const productElement = event.target.closest('.items');
            const product = {
                name: productElement.querySelector('.desc').textContent,
                price: parseFloat(productElement.querySelector('.price').textContent.replace('$', '')),
                image: productElement.querySelector('img').src
            };

            addToCart(product);
        }
    });

    // Evenimente pentru butoanele din coș
    listCartHTML.addEventListener('click', (event) => {
        const index = parseInt(event.target.dataset.index, 10);

        if (event.target.classList.contains('removeItem')) {
            cart.splice(index, 1); // Elimină produsul din coș
        } else if (event.target.classList.contains('plus')) {
            cart[index].quantity++; // Crește cantitatea
        } else if (event.target.classList.contains('minus')) {
            cart[index].quantity--; // Scade cantitatea
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1); // Elimină produsul dacă cantitatea e 0
            }
        }

        updateCartHTML(); // Actualizează coșul
    });

    // Afișare coș la click pe iconiță
    iconCart.addEventListener('click', () => {
        body.classList.toggle('showCart'); // Activează/Dezactivează clasa pentru afișarea coșului
    });

    closeCart.addEventListener('click', () => {
        body.classList.remove('showCart'); // Elimină clasa pentru afișarea coșului
    });

    // Eveniment pentru golirea coșului
    clearCartBtn.addEventListener('click', () => {
        clearCart();
    });

});