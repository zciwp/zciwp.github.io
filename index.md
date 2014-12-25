---
layout: default
title: 最新文章
---

<script src="js/jpage.js" type="text/javascript"></script>
<script src="js/jpage-custom.js" type="text/javascript"></script>

<div class="g_block">
    <ul id="itemContainer">
        {% for post in site.posts %}
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

    <div class="holder"></div>

</div>



