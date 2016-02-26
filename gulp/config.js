// [TODO] Read the respective data .json files for the slugs and then translate
// that into the html.pages info. Also translate it into non-substring info for
// the server to test the release build

module.exports = {
  paths: {
    project: './',
    release: './release',
    css: {
      source:  './_source/css/styles.scss',
      watch:   './_source/css/**/*.scss',
      release: './release/css',
      testing: './_source/css'
    },
    html: {
      source:  './_source/*.html',
      release: './release'
    },
    js: {
      source:  './_source/js/scripts.js',
      watch:   ['./_source/js/**/*.js', './_source/main.js'],
      release: './release/js'
    },
    json: {
      source:  './_source/js/data/**/*.json',
      watch:   './_source/js/data/**/*.json',
      release: './release/js/data'
    },
    libs: {
      source:  './_source/libs/**/*',
      release: './release/libs'
    },
    clean: ['./release', './_source/css/styles.css']
  },
  names: {
    css: 'styles.css',
    js:  'scripts.js'
  }
};