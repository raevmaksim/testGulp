//создаем константы сподключением модулей
const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const del = require('del')

//создаём константу с путями
const paths = {
  styles: {
    src: 'src/styles/**/*.less',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js'    
  }
}

///чистим каталог "dist"//
/////////////////////////

function clean() {
  return del(['dist'])
}

///Обрабатывем стили//
/////////////////////

function styles() {
  // "src/styles/**/*.less"
  return gulp.src(paths.styles.src)
    //компилируем "less" в "css"
    .pipe(less())
    //минифицыруем "css"
    .pipe(cleanCSS())
    //добавляем в каталог "css" суфикс "min"
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    //создаем котадог "css"
    .pipe(gulp.dest(paths.styles.dest))
}

///Обрабатывем скрипты//
///////////////////////

function scripts() {
    // "'src/scripts/**/*.js'"
    return gulp.src(paths.scripts.src, {
      sourcemaps: true
    })
    // Переводим javascript из новых стандартов
    // в болле раннии что бы javascript
    // поддерживался всеми браузерами
    .pipe(babel())
    // Минифицируем и оптимизируем "JS"
    .pipe(uglify())
    //Обьединяем все файлы со скриптами в один
    .pipe(concat('main.min.js'))
    //создаем котадог "js"
    .pipe(gulp.dest(paths.scripts.dest))
}

///Отслеживаем изминение в "less" и "js" - "ВОТЧЕР"//
/////////////////////////////////////////////

function watch() {
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build