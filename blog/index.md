---
layout: default
---


<ul class="g_block js_cate" name="blog">
    {% for post in site.categories.blog %}
    <li class="article">
        <div class="t {{ post.categories }}">
            <h6><a href="{{ post.url }}">{{ post.title }}</a></h6>
        </div>
        <div class="article_summary">
            {{ post.description }}
        </div>
    </li>
    {% endfor %}
    <!-- <li class="article">
        <div class="t translate">
            <h6><a href="">title</a></h6>
        </div>
        <div class="article_summary">
            article_summary
        </div>
    </li>
    <li class="article">
        <div class="t summary">
            <h6><a href="">title</a></h6>
        </div>
        <div class="article_summary">
            article_summary
        </div>
    </li> -->
</ul>