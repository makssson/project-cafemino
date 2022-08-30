const gulp = require("gulp"),
  concat = require("gulp-concat"),
  clean = require("gulp-clean"),
  browserSync = require("browser-sync").create(),
  sass = require("gulp-sass"),
  uglify = require("gulp-uglify"),
  autoprefixer = require("gulp-autoprefixer");

const path = {
  src: {
    scss: "./src/scss/**/*.scss",
    js: "./src/js/*.js",
    img: "./src/img/*.png",
    html: "./index.html",
  },
  build: {
    css: "./dist/css",
    js: "./dist/js",
    img: "./dist/img",
    self: "./dist",
  },
};

const htmlSync = () => gulp.src(path.src.html).pipe(browserSync.stream());

const imgBuild = () =>
  gulp
    .src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());

const cssBuild = () =>
  gulp
    .src(path.src.scss)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());

const jsBuild = () =>
  gulp
    .src(path.src.js)
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());

const cleanBuild = () =>
  gulp.src(path.build.self, { allowEmpty: true }).pipe(clean());

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch(path.src.scss, cssBuild).on("change", browserSync.reload);
  gulp.watch(path.src.js, jsBuild).on("change", browserSync.reload);
  gulp.watch(path.src.img, imgBuild).on("change", browserSync.reload);
  gulp.watch(path.src.html, htmlSync).on("change", browserSync.reload);
};

gulp.task("htmlSync", htmlSync);
gulp.task("cssBuild", cssBuild);
gulp.task("jsBuild", jsBuild);
gulp.task("imgBuild", imgBuild);
gulp.task("clean", cleanBuild);

gulp.task(
  "start",
  gulp.series(cleanBuild, cssBuild, jsBuild, imgBuild, htmlSync, watcher)
);
