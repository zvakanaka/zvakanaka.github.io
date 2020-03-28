// HINT: hover over a certain link to activate
function forceNoCacheHash(src, useCache = true) {
  if (useCache) return src; // fine with using cached assets
  const delim = src.indexOf('?') > -1 ? '&' : '?';
  return `${src}${delim}${Math.random().toString(36).substring(7)}`;
}
function addScript(src, useCache) {
  const s = document.createElement('script');
  s.setAttribute('src', forceNoCacheHash(src, useCache));
  document.body.appendChild(s);
}
function addCss(url, useCache) {
  const element = document.createElement('link');
  element.setAttribute('rel', 'stylesheet');
  element.setAttribute('type', 'text/css');
  element.setAttribute('href', forceNoCacheHash(url, useCache));
  document.getElementsByTagName('head')[0].appendChild(element);
}
function getHtml(url, useCache) {
  return new Promise((resolve, reject) => {
    fetch(forceNoCacheHash(url, useCache))
      .then(res => res.text())
      .then(body => {
        resolve(body);
      });
  });
}
function addHtml(str) {
  const div = document.createElement('div');
  div.style.display = 'contents';
  div.innerHTML = str;
  document.body.appendChild(div);
}
function addCssStr(str) {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = str;
  document.head.appendChild(styleEl);
}

function addPen(pen) {
  const base = location.origin;
  getHtml(`${base}/cpio/${pen}/${pen}.html`).then(htmlStr => {
    addHtml(htmlStr);
    addCss(`${base}/cpio/${pen}/${pen}.css`);
    addScript(`${base}/cpio/${pen}/${pen}.js`);
  });
}

let easterEggLoaded = false;
document.addEventListener('postLoaded', function() {
  const easterEggLink = document.querySelector('.markdown-body #github + p a');
  if (easterEggLink) {
    easterEggLink.addEventListener('mouseover', function() {
      if (!easterEggLoaded) {
        addPen('YbOoRE');
        addCssStr(`
          body { color: white !important; }
          main { z-index: 1; }
          aside > ul { z-index: 1; }
          .markdown-body { background: #fffa; }
          canvas { position: fixed !important; }
        `);
      }
      easterEggLoaded = true;
    })
  }
});