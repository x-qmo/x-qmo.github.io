---
layout: default # Atau layout lain yang Anda gunakan
title: Daftar Produk Kami
---

# Daftar Produk

<p>Berikut adalah daftar produk terbaru kami:</p>

<div class="product-grid">
  {% for item in site.data.barang %}
    <div class="product-card">
      {% if item.gambar_url %}
        <img src="{{ item.gambar_url | relative_url }}" alt="{{ item.nama_barang }}" class="product-image">
      {% endif %}
      <h2>{{ item.nama_barang }}</h2>
      <p class="price">Harga: Rp. {{ item.harga | number_with_delimiter }}</p>
      <p class="description">{{ item.deskripsi }}</p>
      <p class="stock">Stok: {{ item.stok }}</p>
      {% if item.stok > 0 %}
        <button class="buy-button">Beli Sekarang</button>
      {% else %}
        <button class="out-of-stock-button" disabled>Stok Habis</button>
      {% endif %}
    </div>
  {% endfor %}
</div>

<style>
  /* Contoh CSS sederhana untuk tampilan */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 20px 0;
  }
  .product-card {
    border: 1px solid #786d61;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .product-image {
    max-width: 100%;
    height: 200px;
    object-fit: contain;
    margin-bottom: 10px;
  }
  .product-card h2 {
    font-size: 1.5em;
    margin-top: 0;
    margin-bottom: 10px;
    color: #ffd700;
  }
  .product-card .price {
    font-size: 1.2em;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 10px;
  }
  .product-card .description {
    font-size: 0.9em;
    color: #bbb496;
    margin-bottom: 15px;
  }
  .product-card .stock {
    font-size: 0.85em;
    color: #777;
    margin-bottom: 15px;
  }
  .buy-button, .out-of-stock-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }
  .out-of-stock-button {
    background-color: #dc3545;
    cursor: not-allowed;
  }
</style>
