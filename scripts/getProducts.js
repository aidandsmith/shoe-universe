const fetchProducts = async () => {
	
    const cachedData = localStorage.getItem('jordan-shoes');
    const cachedTimestamp = localStorage.getItem('jordan-shoes-timestamp');
    const refreshInterval = 30 * 60 * 1000;

    if (cachedData && cachedTimestamp) {
        const isDataFresh = (Date.now() - parseInt(cachedTimestamp)) < refreshInterval;
        if (isDataFresh){
            console.log('Using cached data');
            displayProducts(JSON.parse(cachedData));
            return;
        }
    }
    
    const url = 'https://jordan-shoes.p.rapidapi.com/shoes';
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '7ca7eee599mshb456f14e42bf090p1152b7jsn2a3fce894c21',
			'x-rapidapi-host': 'jordan-shoes.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log('API Response:', result);
        localStorage.setItem('jordan-shoes', JSON.stringify(result));
        localStorage.setItem('jordan-shoes-timestamp', Date.now().toString());
		displayProducts(result);
	} catch (error) {
		console.error(error);
	}
};

// Function to convert UK size to US size
const convertToUSSize = (ukSize) => {
	const uk = parseFloat(ukSize.replace('UK ', ''));
	const usSize = (uk + 1).toFixed(1);
	return `US ${usSize}`;
};

const displayProducts = (products) => {
	const productContainer = document.getElementById('product-container');
	
	products.forEach(product => {
		// Get available sizes and convert to US
		const availableSizes = product.sizes
			? product.sizes
				.filter(size => size.is_available)
				.map(size => convertToUSSize(size.size))
				.sort((a, b) => parseFloat(a.replace('US ', '')) - parseFloat(b.replace('US ', ''))) // Sort sizes numerically
			: [];
		
		const imageUrl = product.img || 'https://via.placeholder.com/300x250?text=No+Image+Available';
		
		const card = document.createElement('section');
		card.className = 'product-card';
		
		card.innerHTML = `
			<section class="product-card">
        <div class="product-image">
            <img src="${imageUrl}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h2 class="product-title">${product.name}</h2>
            <div class="product-price">$${product.price}</div>
            <p class="product-description">
                ${product.overview}
            </p>
            <div class="product-specs">
                <div class="product-color">Color: <span>${product.color}</span></div>
                <div class="product-sizes">Available Sizes:</div>
                <div class="size-grid">
                    ${availableSizes.map(size => `<span class="size">${size}</span>`).join('')}
                </div>
            </div>
            <button class="view-product-btn" data-product-id="${product.id}">
                View Product
                <span class="chevron-right">›</span>
            </button>
        </div>
    </section>
		`;
		
		productContainer.appendChild(card);
		
		// Add click handler for view product button
		const viewProductBtn = card.querySelector('.view-product-btn');
		viewProductBtn.addEventListener('click', () => {
			window.location.href = `product-detail.html?id=${product.id}`;
		});
	});
};

fetchProducts();