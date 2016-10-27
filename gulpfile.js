var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-clean-css');

//default task;
gulp.task('less', function() {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(cssmin({
		    advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
		    compatibility: 'ie8',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
		    keepBreaks: true//类型：Boolean 默认：false [是否保留换行]
		}))
        .pipe(concat('wapmain.css'))
        .pipe(gulp.dest('www/css'));
});

//特别注意：若编译less的时候，同时执行其他操作，有可能引起页面刷新，而不是将样式植入页面
//例如下面任务同时生成sourcemap：
//var sourcemaps = require('gulp-sourcemaps');
//gulp.task('less', function () {
//    gulp.src(['src/less/*.less'])
//        .pipe(sourcemaps.init())
//        .pipe(less())
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('src/css'))
//        .pipe(livereload());
//});

gulp.task('watch', function() {
    gulp.watch('less/*.less', ['less']);
});

//End
//
gulp.task('default',['watch']);
