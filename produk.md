---
layout: default
title: Tim Kami
permalink: /produk/
---


<h1>Tim Kami</h1>
<p>Kenali para individu di balik kesuksesan kami.</p>

<div class="team-grid">
    {% for lstproduk in site.produk %} {# Loop melalui Collection "produk" #}
        <div class="team-member-card">
            {% if lstproduk.image %}
                <img src="{{ lstproduk.image | relative_url }}" alt="{{ lstproduk.title }}" class="lstproduk-photo">
            {% endif %}
            <h2><a href="{{ lstproduk.url | relative_url }}">{{ lstproduk.title }}</a></h2>
            <p class="role">{{ lstproduk.role }}</p>
            <p>{{ lstproduk.content | strip_html | truncatewords: 20 }}</p> {# Tampilkan sebagian konten #}
        </div>
    {% endfor %}
</div>

