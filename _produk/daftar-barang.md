---
layout: produk_kami # Atau layout lain yang Anda gunakan
title: Daftar Produk Kami
image: /assets/images/produk-kami-wallp.jpg
---

<style>
  /* CSS untuk galeri video yang responsif */
  .product-gallery {
    display: flex;
    flex-wrap: wrap;
    gap:1rem;
    padding: 5px; /* Padding di sekitar galeri */
    background-color: #3c3836; /* Warna latar belakang galeri */
    justify-content: space-between;
  }

  .product-card-item {
background-color: #282828;
flex-basis: 47%;
margin-bottom: 10px;
  }
.product-image {
  width: 100%;
  height: auto;
}

.product-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 0px 10px;
  height: 120px;
}
.price {
margin: 0;
font-size: 1.1rem;
font-weight: bold;
color: #ffa700;
}

.buy-button {
display: inline-block;
background-color: #2c974b;
color: white;
padding: 8px 15px;
text-decoration: none;
transition: background-color 0.3s ease;
border: 1px solid #000;
width: 100%;
}
.product-info h2 {
  margin: 0;
  font-size: 1rem;
  height: 50px;
}
.jenstock {
  display: flex;
  justify-content: space-between;
}

  .product-card-item .product-info h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.2em;
    color: #fbf1c7;
  }

  /* Media queries untuk responsivitas */
  @media (max-width: 992px) {

  }

  @media (max-width: 768px) {
  .product-gallery {
  flex-direction: column;
}

.product-image {
  width: 100%px;
}
.product-info h2 {
  margin: 0;
  font-size: 0.9rem;
}

.buy-button {
  margin-bottom: 20px;
}
  }
</style>

<div class="product-gallery">
  {% for item in site.data.barang %}
    <div class="product-card-item">
      <div class="product-wrapper">
        {% if item.gambar_url %}
            <img src="{{ item.gambar_url | relative_url }}" alt="{{ item.nama_barang }}" class="product-image">
        {% endif %}
      </div>
      <div class="product-info">
        <h2>{{ item.nama_barang }}</h2>
<p class="price">Rp. {{ item.harga }}</p>
        <div class="jenstock">
          <p class="stock">Stok: {{ item.stok }}</p>
          <p class="jenis">Jenis: {{ item.jenis }}</p>
        </div>
      </div>
      <button class="buy-button">Hubungi</button>
    </div>
  {% endfor %}
</div>






