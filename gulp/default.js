'use strict'

let gulp = require('gulp');

gulp.task("default", function () {
    return gulp.src("src/app.js")
        .pipe(gulp.dest("dist"));
});
