var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    sourcemaps = require("gulp-sourcemaps"),
    del = require('del'),
    tsProject = tsc.createProject('tsconfig.json');


gulp.task('clean:dist', () => {
    return del([
        'dist/**/*'
    ]);
});

gulp.task("copy-files", async() => {

    gulp.src('package.json')
        .pipe(gulp.dest('./dist'));

    gulp.src('package-lock.json')
        .pipe(gulp.dest('./dist'));
});

gulp.task('compile-ts', () => {

    return tsProject.src()
        .pipe(tsProject())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"))
});

gulp.task('default', gulp.series('clean:dist', 'compile-ts', 'copy-files'));