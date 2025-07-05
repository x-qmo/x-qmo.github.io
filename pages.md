---
layout: default
title: Selamat Datang di Blog Landing Page Kami!
---

<h1>Video Terbaru Kami</h1>

<div class="video-list">
    {% assign video_pages = site.pages | where:"layout", "video_page" | sort: "date" | reverse %}
    {% for video in video_pages %}
        <div class="video-item">
            <h2><a href="{{ video.url | relative_url }}">{{ video.title }}</a></h2>
            <p>{{ video.description | default: video.excerpt | strip_html | truncatewords: 30 }}</p>
            {% if video.thumbnail %}
                <a href="{{ video.url | relative_url }}">
                    <img src="{{ video.thumbnail | relative_url }}" alt="{{ video.title }} Thumbnail">
                </a>
            {% endif %}
        </div>
    {% endfor %}
</div>
