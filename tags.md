---
layout: default
title: Semua Tag
permalink: /tags/ # URL untuk halaman ini
---

<h1>Daftar Semua Tag</h1>

<ul class="tag-cloud">
  {% assign sorted_tags = site.tags | sort %}
  {% for tag_name_and_posts in sorted_tags %}
    {% assign tag_name = tag_name_and_posts[0] %}
    {% assign posts = tag_name_and_posts[1] %}
    <li>
      <a href="/tag/{{ tag_name | slugify }}/">
        {{ tag_name }} ({{ posts.size }})
      </a>
    </li>
  {% endfor %}
</ul>
