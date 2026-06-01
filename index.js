const url = 'https://fakestoreapi.com/products';
async function carregarProdutos() {
    const lista = document.querySelector('#product-list');
    lista.innerHTML = '<p>Carregando...</p>';
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error('Erro HTTP: ' + resposta.status);
        const produtos = await resposta.json();
        lista.innerHTML = '';
        produtos.forEach((produto) => {
            const item = document.createElement('article');
            const descricao = document.createElement('p');
            const avaliacao = document.createElement('p');
            const cupom = document.createElement('p');
            const category = document.createElement ('p');
            const shippingP = document.createElement('p');
            const shipping = produto.price > 100 ? 'Frete grátis' : 'Frete: R$ 20,00';
            
            item.classList.add("product-item"); 
            descricao.classList.add("product-description");
            avaliacao.classList.add("product-avaliacao");
            cupom.classList.add("product-cupom");
            shippingP.classList.add("product-shipping");

            item.innerHTML = `
            <p class="product-category">${produto.category}</p>
            <img src="${produto.image}" alt="${produto.title}" width="100">
            <h3>${produto.title}</h3>
            <p class="product-description">${produto.description}</p>
            <p class="product-price">R$ ${produto.price}</p>
            <p class="product-cupom"> cupom: PROMO10 para 10% OFF</p>
            <p class="product-shipping">${shipping}</p>
              <button>Comprar</button>
        `;
        avaliacao.innerHTML = `
        <Avaliação: ${produto.rating.rate} (${produto.rating.count} avaliações)>
        <span class="estrela">⭐</span>
        <span class="numero-avaliacao">${produto.rating.rate}</span>
        <span class="numero-avaliacao">(${produto.rating.count} avaliações)</span>
        `;
        item.appendChild(avaliacao);
            lista.appendChild(item);
        });
    } 
    catch  (erro) {
        lista.innerHTML = `<p class="erro">${erro.message}</p>`;
    }
}

await carregarProdutos();

console.log("Fim do código!");