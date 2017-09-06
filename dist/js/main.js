/* global marked */
function getFile(url, callback, parseJSON) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      if (parseJSON) callback(JSON.parse(xmlhttp.responseText));
      else callback(xmlhttp.responseText);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function setMarkdown(file) {
  getFile(`posts/${file}`, function(post) {
    document.querySelector('.markdown-body').innerHTML = marked(post);
    const postLoaded = new CustomEvent('postLoaded', { detail: { name: post }});
    document.dispatchEvent(postLoaded);
    //highlight post in sidebar
    const displayedArticle = document.querySelector('.displayed-article');
    if (displayedArticle) displayedArticle.classList.remove('displayed-article');
    document.getElementById(`${file}`).classList.add('displayed-article');
  });
  if (history.pushState) history.pushState(null, null, `#${file}`);
  else location.hash = `#${file}`;
}

function getHash() {
  if (window.location.hash) return window.location.hash.substring(1);
  return null;
}

getFile('posts.json', function loadPostsIntoNav(posts) {
  let ul = document.createElement('ul');
  posts.forEach(function(post) {
    let li = document.createElement('li');
    li.textContent = post.substr(0, post.lastIndexOf('.'));//strip extension
    li.id = post;
    li.addEventListener('click', function(ev) {
      setMarkdown(post);
    });
    ul.appendChild(li);
  });
  document.querySelector('.navigation').appendChild(ul);
  const hash = getHash();
  if (hash) {
    let selectedPost = posts
      .filter(function(post) {
        return post.substr(0, post.lastIndexOf('.')) === hash || post === hash;
      })
      .forEach(function(post) {
        setMarkdown(post);
      });
  } else setMarkdown(posts[0]);
}, true);
