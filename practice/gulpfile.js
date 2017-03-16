var $r = require,
    $gulp = $r('gulp'),
    $jade = $r('gulp-jade'),
    $scss = $r('gulp-sass'),
    $smap = $r('gulp-sourcemaps'),
    $cmin = $r('gulp-minify-css'),
    $imin = $r('gulp-imagemin'),
    $spriter = $r('gulp.spritesmith');
    $repl = $r('gulp-replace'),
    $renm = $r('gulp-rename'),
    $jshint = $r('gulp-jshint');

//- scss=>css
$gulp.task('css', function () {
    return $gulp.src('share/scss/dahao.scss')
        .pipe($smap.init())
        .pipe($scss().on('error', $scss.logError))
        .pipe($cmin())
        .pipe($repl('/*!', '/*'))
        .pipe($renm('dahao.min.css'))
        .pipe($smap.write('.'))
        .pipe($gulp.dest('var/build'));
});

//- 监听scss变化
$gulp.task('scss', function () {
    return $gulp.watch(['share/scss/*.scss', 'share/scss/**/*.scss'], ['css']);
});

//- jade=>html
$gulp.task('html', function () {
    return $gulp.src([
        'share/jade/**/*.jade',
        '!share/jade/**/_*.jade'
    ]).pipe($jade({
        pretty: '\t'
    })).pipe($gulp.dest('var/build'));
});

//- 图片压缩
$gulp.task('imagemin', function () {
    $gulp.src([
        'var/img/**/*.{png,jpg,gif,ico}'
        ])
        .pipe($imin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe($gulp.dest('./var/img'));
});

//- 图片合并
$gulp.task('sprite', function() {
    var spriteData = $gulp.src('share/demo/sprite/*.{png,jpg,gif,ico}').pipe($spriter({
        imgName: 'var/img/sprite/sprite-1.png',
        cssName: 'share/scss/sprite/sprite-1.scss',
        cssFormat: 'scss'
    }));
    return spriteData.pipe($gulp.dest('./'));
});

//- 监听jade变化
$gulp.task('jade', function () {
    return $gulp.watch(['share/jade/**/*.jade'], ['html']);
});

//- 检测js错误
$gulp.task('jshint', function () {
    return $gulp.src('var/js/*.js')
        .pipe($jshint())
        .pipe($jshint.reporter('default'));
});

//- 监听事件集合
$gulp.task('watch', ['scss', 'jade', 'jshint']);

//- 默认事件集合
$gulp.task('default', ['sprite', 'imagemin', 'css', 'html']);
