---
layout: tag_page # Atau 'default', sesuai layout Anda
title: Semua Tag
permalink: /tags/ # URL untuk halaman ini
---

<h1>Daftar Semua Tag</h1>

<ul class="tag-cloud">
  {% assign sorted_tags = site.tags | sort %} {# Urutkan tag berdasarkan abjad #}
  {% for tag_name_and_posts in sorted_tags %}
    {% assign tag_name = tag_name_and_posts[0] %} {# Mendapatkan nama tag #}
    {% assign posts = tag_name_and_posts[1] %}   {# Mendapatkan daftar postingan untuk tag ini #}
    <li>
      <a href="/tag/{{ tag_name | slugify }}/">
        {{ tag_name }} ({{ posts.size }}) {# Menampilkan nama tag dan jumlah postingan #}
      </a>
    </li>
  {% endfor %}
</ul>
