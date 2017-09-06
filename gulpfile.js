const gulp = require('gulp'),
  fs = require('fs'),
  path = require('path'),
  del = require('del'),
  rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css');

//put together posts.json based on md files in /posts/
gulp.task('nav', function (next) {
  const directory = `posts`;
  if (!fs.existsSync(directory)) return { err: `directory "${directory}" does not exist` };
  const fileExtensions = ['md'];
  const extensions = fileExtensions.map(ext => `.${ext.toLowerCase()}`);
  let files = fs.readdirSync(directory)
    .filter(function(file) {
      return (extensions.length === 0 || extensions.indexOf(path.extname(file).toLowerCase())>-1);
    });
  const json = JSON.stringify(files, null, 2);
  fs.writeFile('posts.json', json, 'utf8', next());
});


gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('dist', ['clean'], function (cb) {
  //TODO: check for css/markdown.css and conditionally load github-markdown
  gulp.src('./bower_components/github-markdown-css/github-markdown.css')
    .pipe(rename('markdown.css'))
    .pipe(gulp.dest('./dist/css/'));
  gulp.src('./src/css/main.css')
    .pipe(gulp.dest('./dist/css/'));
  gulp.src('./bower_components/marked/marked.min.js')
    .pipe(gulp.dest('./dist/js/'));
  gulp.src('./src/js/main.js')
    .pipe(gulp.dest('./dist/js/'));
  gulp.src('./src/js/patchArticle.js')
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['nav', 'dist']);
