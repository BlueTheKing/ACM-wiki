---
layout: null
is_wiki_page: false
---
{% if site.search_engine == "js" %}
var jsondata=[
  {% for post in site.posts %}
    {
      "title"    : "{{ post.title | escape }}",
      "category" : "{{ post.category }}",
      "tags"     : "{{ post.tags | join: ', ' }}",
      "url"      : "{{ site.baseurl }}{{ post.url }}",
      "date"     : "{{ post.date }}",
      "content"  : {{ page.content | jsonify }}
    } {% unless forloop.last %},{% endunless %}
  {% endfor %}
  ,
  {% for page in site.html_pages %}
    {% if page.name == '404.html' %}
      {% continue %}
    {% endif %}
   {
     {% assign title = page.title | default: page.name %}
     {% if title != nil %}
        "title"    : "{{ title | escape }}",
        "category" : "{{ page.category }}",
        "tags"     : "{{ page.tags | join: ', ' }}",
        "url"      : "{{ site.baseurl }}{{ page.url }}",
        "date"     : "{{ page.date }}",
        "content"  : {{ page.content | jsonify }}
     {% endif %}
   } {% unless forloop.last %},{% endunless %}
  {% endfor %}
];

var sjs = SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: jsondata,
    searchResultTemplate: '<li><a href="{url}" title="{title}">{title}</a></li>',
    noResultsText: 'No results found',
    limit: 10,
    fuzzy: false,
    exclude: []
  })
{% endif %}

