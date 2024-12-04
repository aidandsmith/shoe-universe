const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        productId: params.get('id')
    };
};

const convertToUSSize = (ukSize) => {
	const uk = parseFloat(ukSize.replace('UK ', ''));
	const usSize = (uk + 1).toFixed(1);
	return `US ${usSize}`;
};

const displayProductDetail = (product) => {
    const productDetailContainer = document.getElementById('product-detail');
    // Gets 3 random products to display as related products
    const cachedData = localStorage.getItem('jordan-shoes');
    let relatedProducts = [];
    if (cachedData) {
        const allProducts = JSON.parse(cachedData);
        relatedProducts = allProducts
            .filter(p => p.id !== product.id) 
            .sort(() => 0.5 - Math.random()) 
            .slice(0, 3); 
    }
    
    const sizes = product.sizes;
    
    productDetailContainer.innerHTML = `
        <section class="product-card">
            <h1 class="product-title">${product.name}</h1>

            <div class="product-main">
                <div class="product-image">
                    <img src="${product.img || 'https://via.placeholder.com/500?text=No+Image+Available'}" 
                         alt="${product.name}">
                </div>

                <div class="product-details">
                    <div class="size-section">
                        <h3 class="size-title">Select Size</h3>
                        <div class="size-grid">
                            ${sizes
                                .filter(size => size.is_available)
                                .map(size => `
                                    <button class="size-btn" data-size="${size.size}">
                                        ${convertToUSSize(size.size)}
                                    </button>
                                `).join('')}
                        </div>
                    </div>

                    <div class="price-section">
                        <div class="price-content">
                            <div class="price-label">Price</div>
                            <div class="price-amount">$${product.price}</div>
                        </div>
                        <button class="btn btn-buy" id="addToCartBtn" disabled>
                            <span class="btn-text">Add to Cart</span>
                            <span class="btn-icon">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <div class="related-products">
            <h2 class="related-title">Related Products</h2>
            <div class="product-grid">
                ${relatedProducts.map(relatedProduct => `
                    <div class="product-item" data-product-id="${relatedProduct.id}">
                        <div class="product-item-image">
                            <img src="${relatedProduct.img || 'https://via.placeholder.com/160?text=No+Image'}" 
                                 alt="${relatedProduct.name}">
                        </div>
                        <div class="product-item-details">
                            <h3 class="product-item-title">${relatedProduct.name}</h3>
                            <div class="product-item-price">$${relatedProduct.price}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="product-card">
            <div class="product-info">
                <div class="product-description">
                    <h3>Product Description</h3>
                    <p>${product.overview || 'No description available.'}</p>
                </div>
            </div>
        </div>
    `;

    const sizeButtons = productDetailContainer.querySelectorAll('.size-btn');
    const buyNowBtn = productDetailContainer.querySelector('#addToCartBtn');

    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove selected class from all buttons
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            // Add selected class to clicked button
            button.classList.add('selected');
            // Enable buy now button
            buyNowBtn.disabled = false;
        });
    });

    const relatedProductItems = productDetailContainer.querySelectorAll('.product-item');
    relatedProductItems.forEach(item => {
        item.addEventListener('click', () => {
            const productId = item.dataset.productId;
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
};

const init = async () => {
    const { productId } = getUrlParams();
    
    // Get from localStorage
    const cachedData = localStorage.getItem('jordan-shoes');
    if (cachedData) {
        const products = JSON.parse(cachedData);
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            displayProductDetail(product);
            return;
        }
    }

    productDetailContainer.innerHTML = `
        <div class="error-message">
            <h2>Product Not Found</h2>
            <p>Sorry, we couldn't find the product you're looking for.</p>
            <a href="product.html">Return to Products</a>
        </div>
    `;
};

init(); 