'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'

gulp.task("default", function () {
    return gulp.src("src/app.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});
