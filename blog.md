---
layout: page
title: "Blog"
permalink: /blog/
---

Thoughts on DevOps, cloud infrastructure, and platform engineering.

{% if site.posts.size > 0 %}
<ul class="post-list">
  {% for post in site.posts %}
    <li>
      <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      {% if post.excerpt %}
        <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
      {% endif %}
    </li>
  {% endfor %}
</ul>
{% else %}
Coming soon.
{% endif %}
