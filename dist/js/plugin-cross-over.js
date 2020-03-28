/*
 * Use this script to load posts from another repo.
 * See special setup in:
 * https://github.com/zvakanaka/zvakanaka.github.io posts.json
 */
function getPostName(el) {
  const postNameRegexArr = el.textContent.match(/(^.*)\/([\w-.:]+)/);
  if (postNameRegexArr) {
    const [ , path, postName ] = postNameRegexArr;
    return postName;
  }
}
document.addEventListener('postLoaded', function replaceAsideTitles(ev) {
  document.querySelectorAll('.navigation ul > li').forEach(li => {
    const postName = getPostName(li);
    if (postName) {
      if (li.children.length === 0) {
        li.textContent = postName;
      } else if (li.childNodes && li.childNodes.length > 1 && li.childNodes[0].nodeType === 3) {
        li.childNodes[0].textContent = getPostName(li.childNodes[0]);
      }
    }
  });
});