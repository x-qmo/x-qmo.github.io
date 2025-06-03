---
layout: post
title: Membangun Blog Jekyll Dari Nol
description: Mulai blog Jekyll-mu dari nol! Panduan lengkap ini akan memandumu membangun blog Jekyll dari awal, termasuk instalasi, konfigurasi, hingga publikasi. Sempurna untuk pemula!
date: 2025-05-25 10:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
image: /assets/images/membangun-blog-jekyll.jpg
---

Membuat template blog Jekyll dari nol dengan fitur lengkap seperti header, menu navigasi, main content, sidebar, footer, tag, kategori, dan kotak pencarian membutuhkan sedikit lebih banyak detail. Mari kita bangun ini langkah demi langkah.

## Persiapan Awal

Pastikan Anda sudah menginstal Ruby dan Jekyll. Jika belum, ikuti panduan instalasi resmi Jekyll: `https://jekyllrb.com/docs/installation/`

### Langkah 1: Buat Proyek Jekyll Baru

Buka terminal atau command prompt dan jalankan perintah berikut:

{% raw %}
```
jekyll new my-complete-blog
cd my-complete-blog
```
{% endraw %}

Ini akan membuat struktur dasar. Anda bisa membersihkan file tema default jika ingin benar-benar memulai dari nol (seperti yang dijelaskan di respons sebelumnya).

### Langkah 2: Konfigurasi `_config.yml`

Buka `_config.yml` dan sesuaikan dengan informasi blog Anda. Tambahkan gems untuk fitur tambahan seperti RSS feed dan sitemap, serta permalink yang bagus.

{% raw %}
```
title: Blog Lengkap Saya
description: Panduan membangun blog Jekyll dari nol dengan fitur lengkap.
baseurl: "" # Jika di-deploy ke root domain (misal: mydomain.com)
url: "http://localhost:4000" # URL dasar situs Anda

# Struktur permalink untuk postingan
permalink: /:categories/:year/:month/:day/:title/

# Jekyll Plugins
gems:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag # Opsional, untuk SEO yang lebih baik

# Exclude dari proses build
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor/bundle/
  - vendor/cache/
  - vendor/gems/
  - vendor/ruby/

# Markdown processor
markdown: kramdown
kramdown:
  input: GFM # GitHub Flavored Markdown
```
{% endraw %}

### Langkah 3: Bangun Struktur Direktori

Inilah struktur yang akan kita gunakan. Perhatikan penambahan folder `_data` untuk menu navigasi dan `_pages` untuk halaman statis.

{% raw %}
```
my-complete-blog/
├── _config.yml
├── _data/
│   └── navigation.yml  <-- Untuk data menu navigasi
├── _layouts/
│   ├── default.html    <-- Layout utama
│   └── post.html       <-- Layout untuk postingan
│   └── page.html       <-- Layout untuk halaman statis (about, contact, dll)
├── _includes/
│   ├── header.html
│   ├── footer.html
│   ├── post_meta.html
│   ├── sidebar.html    <-- Konten sidebar
│   ├── search_box.html <-- Kotak pencarian
├── _posts/
│   └── 2025-05-26-post-pertama.md
├── _pages/             <-- Opsional, untuk halaman statis
│   └── about.md
│   └── contact.md
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── search.js   <-- Javascript untuk pencarian
├── index.html
├── tags.html           <-- Halaman daftar semua tag
├── categories.html     <-- Halaman daftar semua kategori
└── search.html         <-- Halaman hasil pencarian
```
{% endraw %}

### Langkah 4: Buat Layout Utama (`_layouts/default.html`)

Ini adalah kerangka dasar yang akan membungkus semua konten. Perhatikan struktur header, main, sidebar, dan footer.

{% raw %}
```
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ page.title }} | {{ site.title }}</title>
    <link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
    {% seo %}
</head>
<body>
    {% include header.html %}

    <div class="wrapper site-content">
        <main class="main-content">
            {{ content }}
        </main>

        <aside class="sidebar">
            {% include sidebar.html %}
        </aside>
    </div>

    {% include footer.html %}

    <script src="{{ '/assets/js/search.js' | relative_url }}"></script>
</body>
</html>
```
{% endraw %}

### Langkah 5: Buat Layout Postingan (`_layouts/post.html`) dan Halaman (`_layouts/page.html`)

`_layouts/post.html`:

{% raw %}
```
---
layout: default
---
<article class="post">
    <header class="post-header">
        <h1 class="post-title">{{ page.title }}</h1>
        <p class="post-meta">
            Tanggal: {{ page.date | date: "%d %B %Y" }}
            {% include post_meta.html %}
        </p>
    </header>

    <div class="post-content">
        {{ content }}
    </div>

    <div class="post-navigation">
        {% if page.previous.url %}
            <a href="{{ page.previous.url }}" class="previous-post">← Post Sebelumnya</a>
        {% endif %}
        {% if page.next.url %}
            <a href="{{ page.next.url }}" class="next-post">Post Selanjutnya →</a>
        {% endif %}
    </div>
</article>
```
{% endraw %}

`_layouts/page.html`: (Untuk halaman statis seperti "Tentang Kami", "Kontak")

{% raw %}
```
---
layout: default
---
<div class="page-content">
    <h1 class="page-title">{{ page.title }}</h1>
    {{ content }}
</div>
```
{% endraw %}

### Langkah 6: Buat `_data/navigation.yml` (Data Menu Navigasi)

Ini akan membuat menu Anda lebih mudah dikelola.

{% raw %}
```
- title: Home
  url: /
- title: Blog
  url: /
- title: Tags
  url: /tags/
- title: Kategori
  url: /categories/
- title: Tentang Kami
  url: /about/
- title: Kontak
  url: /contact/
```
{% endraw %}

### Langkah 7: Buat File Includes

`_includes/header.html`: (Header dan Menu Navigasi)

{% raw %}
```
<header class="site-header">
    <div class="wrapper header-wrapper">
        <a class="site-title" href="{{ '/' | relative_url }}">{{ site.title }}</a>
        <nav class="site-nav">
            <ul>
                {% for item in site.data.navigation %}
                    <li><a href="{{ item.url | relative_url }}">{{ item.title }}</a></li>
                {% endfor %}
            </ul>
        </nav>
    </div>
</header>
```
{% endraw %}

`_includes/footer.html`:

{% raw %}
```
<footer class="site-footer">
    <div class="wrapper">
        <p>&copy; {{ site.time | date: "%Y" }} {{ site.title }}. Hak Cipta Dilindungi.</p>
    </div>
</footer>
```
{% endraw %}

`_includes/post_meta.html`: (Untuk menampilkan tag/kategori di postingan dan daftar postingan)

{% raw %}
```
{% if post %}
    {% assign current_post = post %}
{% else %}
    {% assign current_post = page %}
{% endif %}

{% if current_post.categories.size > 0 %}
    <span class="post-categories">
        Kategori:
        {% for category in current_post.categories %}
            <a href="{{ '/categories/' | relative_url }}#{{ category | slugify }}">{{ category | capitalize }}</a>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
    </span>
{% endif %}

{% if current_post.tags.size > 0 %}
    <span class="post-tags">
        Tags:
        {% for tag in current_post.tags %}
            <a href="{{ '/tags/' | relative_url }}#{{ tag | slugify }}">{{ tag | capitalize }}</a>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
    </span>
{% endif %}
```
{% endraw %}

`_includes/sidebar.html`: (Konten Sidebar)

{% raw %}
```
<div class="sidebar-section">
    {% include search_box.html %}
</div>

<div class="sidebar-section">
    <h3>Kategori</h3>
    <ul class="sidebar-list">
        {% for category in site.categories %}
            {% assign category_name = category | first %}
            {% assign posts_in_category = category | last %}
            <li>
                <a href="{{ '/categories/' | relative_url }}#{{ category_name | slugify }}">
                    {{ category_name | capitalize }} ({{ posts_in_category.size }})
                </a>
            </li>
        {% endfor %}
    </ul>
</div>

<div class="sidebar-section">
    <h3>Tags Populer</h3>
    <ul class="sidebar-list tags-cloud">
        {% assign sorted_tags = site.tags | sort_natural %}
        {% for tag in sorted_tags %}
            {% assign tag_name = tag | first %}
            {% assign posts_with_tag = tag | last %}
            <li>
                <a href="{{ '/tags/' | relative_url }}#{{ tag_name | slugify }}">
                    {{ tag_name | capitalize }} ({{ posts_with_tag.size }})
                </a>
            </li>
        {% endfor %}
    </ul>
</div>

<div class="sidebar-section">
    <h3>Postingan Terbaru</h3>
    <ul class="sidebar-list">
        {% for post in site.posts limit:5 %}
            <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
        {% endfor %}
    </ul>
</div>
```
{% endraw %}

`_includes/search_box.html`: (Kotak Pencarian)

{% raw %}
```
<div class="search-container">
    <input type="text" id="search-input" placeholder="Cari postingan...">
    <ul id="results-container"></ul>
</div>
```
{% endraw %}

### Langkah 8: Buat Halaman Indeks (`index.html`)

{% raw %}
```
---
layout: default
title: Home
---
<div class="home">
    <h1 class="page-heading">Postingan Terbaru</h1>
    <ul class="post-list">
        {% for post in site.posts limit: 5 %}
        <li>
            <h3>
                <a class="post-link" href="{{ post.url | relative_url }}">
                    {{ post.title | escape }}
                </a>
            </h3>
            <span class="post-meta">{{ post.date | date: "%d %B %Y" }}</span>
            <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
            {% include post_meta.html post=post %}
        </li>
        {% endfor %}
    </ul>

    <p class="rss-subscribe">Berlangganan via <a href="{{ "/feed.xml" | relative_url }}">RSS Feed</a></p>
</div>
```
{% endraw %}

### Langkah 9: Buat File Postingan dan Halaman Statis

`_posts/2025-05-26-post-pertama.md`:

{% raw %}
```
---
layout: post
title: Postingan Pertama Saya dengan Fitur Lengkap
date: 2025-05-26 10:00:00 +0700
categories: [Teknologi, Tutorial Jekyll]
tags: [jekyll, blog, pemula, tutorial]
---
Ini adalah isi dari postingan pertama saya dengan fitur lengkap. Saya akan membahas tentang bagaimana membangun blog yang komprehensif.

Fitur **tag** dan **kategori** akan sangat membantu dalam mengelola konten blog Anda. Gunakan keduanya secara efektif!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
```
{% endraw %}

`_pages/about.md`:

{% raw %}
```
---
layout: page
title: Tentang Kami
permalink: /about/
---
Selamat datang di halaman Tentang Kami!

Blog ini dibuat untuk berbagi pengetahuan dan pengalaman dalam membangun website statis dengan Jekyll. Kami berharap konten di sini dapat bermanfaat bagi Anda.
```
{% endraw %}

### Langkah 10: Halaman Tag (`tags.html`) dan Kategori (`categories.html`)

`tags.html`:

{% raw %}
```
---
layout: default
title: Semua Tags
permalink: /tags/
---
<div class="tags-page">
    <h1 class="page-heading">Tags</h1>

    {% if site.tags.size > 0 %}
        <ul class="tags-list">
            {% assign sorted_tags = site.tags | sort_natural %}
            {% for tag in sorted_tags %}
                {% assign tag_name = tag | first %}
                {% assign posts_with_tag = tag | last %}
                <li>
                    <h2 id="{{ tag_name | slugify }}">{{ tag_name | capitalize }} ({{ posts_with_tag.size }})</h2>
                    <ul class="post-list-by-tag">
                        {% for post in posts_with_tag %}
                            <li>
                                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                                <span class="post-meta">{{ post.date | date: "%d %B %Y" }}</span>
                            </li>
                        {% endfor %}
                    </ul>
                </li>
            {% endfor %}
        </ul>
    {% else %}
        <p>Belum ada tag yang tersedia.</p>
    {% endif %}
</div>
```
{% endraw %}

`categories.html`:

{% raw %}
```
---
layout: default
title: Semua Kategori
permalink: /categories/
---
<div class="categories-page">
    <h1 class="page-heading">Kategori</h1>

    {% if site.categories.size > 0 %}
        <ul class="categories-list">
            {% assign sorted_categories = site.categories | sort_natural %}
            {% for category in sorted_categories %}
                {% assign category_name = category | first %}
                {% assign posts_in_category = category | last %}
                <li>
                    <h2 id="{{ category_name | slugify }}">{{ category_name | capitalize }} ({{ posts_in_category.size }})</h2>
                    <ul class="post-list-by-category">
                        {% for post in posts_in_category %}
                            <li>
                                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                                <span class="post-meta">{{ post.date | date: "%d %B %Y" }}</span>
                            </li>
                        {% endfor %}
                    </ul>
                </li>
            {% endfor %}
        </ul>
    {% else %}
        <p>Belum ada kategori yang tersedia.</p>
    {% endif %}
</div>
```
{% endraw %}

### Langkah 11: Implementasi Kotak Pencarian (`Lunr.js`)

Jekyll adalah generator situs statis, jadi Anda tidak bisa melakukan pencarian real-time di sisi server. Kita akan menggunakan `Lunr.js` untuk pencarian di sisi klien (browser).

#### A. Buat Halaman Pencarian (`search.html`)

Ini akan menjadi halaman yang menampilkan hasil pencarian.

{% raw %}
```
---
layout: default
title: Cari Postingan
permalink: /search/
---
<div class="search-page">
    <h1 class="page-heading">Cari Postingan</h1>
    <div class="search-container-page">
        <input type="text" id="search-input-page" placeholder="Ketik kata kunci...">
        <ul id="results-container-page"></ul>
        <p id="no-results" style="display: none;">Tidak ada hasil ditemukan.</p>
    </div>
</div>

<script>
    // Memastikan Lunr.js dan data search di-load
    // Ini adalah script placeholder, yang sebenarnya ada di assets/js/search.js
    // atau Anda bisa load langsung di halaman ini jika hanya untuk halaman search.html
    // Untuk tujuan sidebar, kita load di default.html
</script>
```
{% endraw %}

#### B. Buat file `assets/js/search.js`

Anda perlu mengunduh `Lunr.js` atau menggunakannya dari CDN. Untuk kesederhanaan, kita akan anggap `Lunr.js` diunduh dan ditempatkan di `assets/js/lunr.min.js`.

{% raw %}
```
// Anda perlu mengunduh lunr.js dari https://lunrjs.com/
// dan letakkan di assets/js/lunr.min.js
// Atau tambahkan tag script untuk CDN Lunr.js di default.html sebelum search.js

(function() {
    // Fungsi untuk memuat script secara dinamis (jika menggunakan Lunr dari CDN)
    function loadScript(src, callback) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // Hanya load Lunr.js jika belum ada (misal dari CDN)
    if (typeof lunr === 'undefined') {
        loadScript('https://unpkg.com/lunr/lunr.min.js', initializeSearch);
    } else {
        initializeSearch();
    }

    function initializeSearch() {
        var searchInput = document.getElementById('search-input');
        var resultsContainer = document.getElementById('results-container');
        var searchInputPage = document.getElementById('search-input-page');
        var resultsContainerPage = document.getElementById('results-container-page');
        var noResultsMessage = document.getElementById('no-results');

        var posts = [];
        var idx; // Lunr index

        // Fetch the JSON index of posts (Jekyll build this for us)
        fetch('/search.json') // Pastikan file search.json digenerate (lihat di bawah)
            .then(response => response.json())
            .then(data => {
                posts = data;
                idx = lunr(function () {
                    this.ref('url');
                    this.field('title', { boost: 10 });
                    this.field('content');
                    this.field('tags');
                    this.field('categories');

                    posts.forEach(function (post) {
                        this.add(post);
                    }, this);
                });
            })
            .catch(error => console.error('Error fetching search index:', error));

        function displaySearchResults(query, container, isPage = false) {
            container.innerHTML = '';
            if (query.length < 2) { // Minimal 2 karakter untuk memulai pencarian
                if (isPage) noResultsMessage.style.display = 'none';
                return;
            }

            var results = idx.search(query);

            if (results.length === 0) {
                if (isPage) noResultsMessage.style.display = 'block';
                return;
            } else {
                if (isPage) noResultsMessage.style.display = 'none';
            }

            results.forEach(function (result) {
                var post = posts.find(p => p.url === result.ref);
                if (post) {
                    var li = document.createElement('li');
                    var link = document.createElement('a');
                    link.href = post.url;
                    link.textContent = post.title;
                    li.appendChild(link);
                    container.appendChild(li);
                }
            });
        }

        // Event listener untuk kotak pencarian di sidebar
        if (searchInput) {
            searchInput.addEventListener('keyup', function() {
                displaySearchResults(this.value, resultsContainer);
            });
            // Sembunyikan hasil saat klik di luar kotak pencarian
            document.addEventListener('click', function(event) {
                if (!searchInput.contains(event.target) && !resultsContainer.contains(event.target)) {
                    resultsContainer.innerHTML = '';
                }
            });
        }

        // Event listener untuk kotak pencarian di halaman search.html
        if (searchInputPage) {
            searchInputPage.addEventListener('keyup', function() {
                displaySearchResults(this.value, resultsContainerPage, true);
            });
        }
    }
})();
```
{% endraw %}

#### C. Buat File search.json di Root Proyek

Jekyll tidak secara otomatis membuat indeks JSON untuk Lunr. Anda perlu membuat file search.json di root direktori proyek Anda. File ini akan digenerate oleh Jekyll saat build.

{% raw %}
```
---
layout: null
---
[
  {% for post in site.posts %}
    {
      "title"    : {{ post.title | jsonify }},
      "url"      : {{ post.url | relative_url | jsonify }},
      "date"     : {{ post.date | date: "%Y-%m-%d" | jsonify }},
      "content"  : {{ post.content | strip_html | strip_newlines | remove_chars: "'" | remove_chars: '"' | normalize_whitespace | jsonify }},
      "tags"     : {{ post.tags | jsonify }},
      "categories": {{ post.categories | jsonify }}
    }
    {% unless forloop.last %},{% endunless %}
  {% endfor %}
]
```
{% endraw %}

**Penting:**

* `layout: null` agar Jekyll tidak membungkusnya dengan layout HTML.
* `strip_html`, `strip_newlines`, `remove_chars`, `normalize_whitespace` digunakan untuk membersihkan konten agar indeks Lunr lebih efektif.

### Langkah 12: Styling Lengkap (`assets/css/style.css`)

Ini adalah CSS yang jauh lebih lengkap untuk mengatur tata letak dan tampilan semua elemen.

{% raw %}
```
/* General Styling */
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background: #f8f8f8;
    color: #333;
}

.wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

h1, h2, h3, h4, h5, h6 {
    color: #333;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
}

ul, ol {
    margin-bottom: 1em;
}

/* Header */
.site-header {
    background: #283747;
    color: #fff;
    padding: 1.5rem 0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.site-title {
    color: #fff;
    text-decoration: none;
    font-size: 2.5rem;
    font-weight: bold;
}

.site-nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.site-nav li {
    margin-left: 25px;
}

.site-nav a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1rem;
    padding: 5px 0;
    position: relative;
}

.site-nav a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background: #007bff;
    left: 0;
    bottom: 0;
    transition: width 0.3s ease-in-out;
}

.site-nav a:hover::after,
.site-nav a.active::after {
    width: 100%;
}

/* Main Content and Sidebar Layout */
.site-content {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 30px;
}

.main-content {
    flex: 3; /* Mengambil 3 bagian lebar */
    margin-right: 30px;
}

.sidebar {
    flex: 1; /* Mengambil 1 bagian lebar */
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    align-self: flex-start; /* Agar sidebar tidak memanjang full tinggi main content */
    position: sticky; /* Agar sidebar tetap di layar saat scroll */
    top: 20px; /* Jarak dari atas */
}

@media (max-width: 992px) {
    .site-content {
        flex-direction: column;
    }
    .main-content {
        margin-right: 0;
        margin-bottom: 30px;
    }
    .sidebar {
        position: static; /* Nonaktifkan sticky di mobile */
    }
}

/* Post and Page Styles */
.post, .page-content {
    background: #fff;
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.post-header .post-title, .page-title {
    font-size: 2.5rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: #283747;
}

.post-meta {
    font-size: 0.95em;
    color: #777;
    margin-bottom: 20px;
    display: block;
}

.post-content img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 20px auto;
    border-radius: 5px;
}

.post-navigation {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    font-size: 1.1em;
}

/* Tags and Categories styling */
.post-categories, .post-tags {
    display: inline-block;
    margin-top: 10px;
    font-size: 0.85em;
}

.post-categories a, .post-tags a {
    background-color: #e6f2ff;
    color: #007bff;
    padding: 5px 10px;
    border-radius: 20px;
    text-decoration: none;
    margin-right: 8px;
    margin-bottom: 5px;
    display: inline-block; /* Agar bisa wrapping */
    transition: background-color 0.3s ease;
}

.post-categories a:hover, .post-tags a:hover {
    background-color: #cce0ff;
}

/* Sidebar Specific Styles */
.sidebar-section {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.sidebar-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.sidebar-section h3 {
    font-size: 1.4rem;
    color: #283747;
    margin-top: 0;
    margin-bottom: 15px;
}

.sidebar-list {
    list-style: none;
    padding: 0;
}

.sidebar-list li {
    margin-bottom: 8px;
}

.sidebar-list a {
    display: block;
    padding: 5px 0;
    color: #555;
}

.sidebar-list a:hover {
    color: #007bff;
    text-decoration: underline;
}

.tags-cloud li {
    display: inline-block;
    margin: 0 5px 8px 0;
}

.tags-cloud a {
    background-color: #f2f2f2;
    color: #555;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 0.9em;
    transition: background-color 0.3s ease;
}

.tags-cloud a:hover {
    background-color: #e0e0e0;
}

/* Search Box Styles */
.search-container, .search-container-page {
    position: relative;
    margin-bottom: 20px;
}

#search-input, #search-input-page {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    box-sizing: border-box; /* Include padding in width */
}

#results-container, #results-container-page {
    list-style: none;
    padding: 0;
    margin: 5px 0 0 0;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 5px;
    position: absolute;
    width: 100%;
    z-index: 10; /* Pastikan di atas elemen lain */
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    max-height: 300px; /* Batasi tinggi hasil */
    overflow-y: auto; /* Scroll jika hasil banyak */
}

#results-container li, #results-container-page li {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
}

#results-container li:last-child, #results-container-page li:last-child {
    border-bottom: none;
}

#results-container li a, #results-container-page li a {
    color: #333;
    display: block;
}

#results-container li a:hover, #results-container-page li a:hover {
    background-color: #f5f5f5;
    text-decoration: none;
}

#no-results {
    color: #888;
    text-align: center;
    margin-top: 15px;
    font-style: italic;
}

/* List of Posts on Home/Tags/Categories Pages */
.post-list {
    list-style: none;
    padding: 0;
}

.post-list li {
    background: #fff;
    margin-bottom: 25px;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.post-list h3 {
    margin-top: 0;
    font-size: 1.8rem;
}

.post-list .post-link {
    color: #283747;
    font-weight: bold;
}

.post-list .post-link:hover {
    color: #007bff;
}

/* Footer */
.site-footer {
    background: #283747;
    color: #fff;
    text-align: center;
    padding: 1.5rem 0;
    margin-top: 50px;
    font-size: 0.9em;
}
```
{% endraw %}

### Langkah 13: Jalankan Jekyll

Simpan semua file, lalu buka terminal di root folder proyek Anda (my-complete-blog) dan jalankan:

{% raw %}
```
bundle install
bundle exec jekyll serve
```
{% endraw %}

Buka `http://localhost:4000` di browser Anda. Sekarang Anda akan melihat blog dengan tata letak yang lebih lengkap, termasuk:

* Header dengan judul situs dan menu navigasi.
* Menu Navigasi yang diambil dari `_data/navigation.yml`.
* Main Content yang menampilkan postingan atau halaman.
* Sidebar dengan daftar kategori, tag populer, postingan terbaru, dan kotak pencarian.
* Footer dengan informasi hak cipta.
* Halaman Tags dan Kategori yang menampilkan daftar dan link ke postingan terkait.
* Kotak Pencarian yang berfungsi untuk mencari postingan secara real-time di browser.

Tips Lanjutan untuk Pengembangan:

* **Responsiveness:** CSS yang diberikan adalah dasar. Untuk blog yang sepenuhnya responsif, Anda perlu menambahkan lebih banyak media queries untuk menyesuaikan tata letak pada berbagai ukuran layar.
* **Gambar:** Untuk manajemen gambar yang lebih baik, buat direktori `assets/images/` dan referensikan gambar dari sana.
* **Formulir Kontak:** Karena Jekyll statis, formulir kontak memerlukan layanan pihak ketiga seperti Formspree, Netlify Forms, atau Getform. Anda cukup membuat formulir HTML dan mengarahkan aksi formulir ke URL layanan tersebut.
* **Komentar:** Sistem komentar juga memerlukan layanan pihak ketiga seperti Disqus atau Commento.
* **Analytics:** Integrasikan Google Analytics atau alat analitik lainnya dengan menempatkan kode pelacakan di `_includes/footer.html` atau langsung di `_layouts/default.html`.
* **SEO Lanjutan:** Plugin `jekyll-seo-tag` sudah membantu. Anda juga bisa secara manual menambahkan meta deskripsi di front matter postingan.
* **Kecepatan:** Optimasi gambar, minifikasi CSS/JS dapat meningkatkan kecepatan load blog Anda.

Selamat membangun blog Jekyll impian Anda! Ini adalah dasar yang kuat untuk Anda kembangkan lebih lanjut.

