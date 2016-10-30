/**
 * Import plugins
 */
import gulp from 'gulp';
import config from './gulp_config.json';
import yargs from 'yargs';

import NodeESModuleLoader from 'node-es-module-loader';
const loader = new NodeESModuleLoader();

import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

import { styles, stylesTask, stylesLintTask } from './tasks/styles';
import { deploy, deployTask } from './tasks/deploy';
import { serve } from './tasks/server';

const conditionalStyleguide = yargs.argv.production ? '' : './tasks/metalsmith';
const inprod = done => done();

/**
 * Init project
 */
gulp.task('init', function() {
  return gulp.src('node_modules/bootstrap/scss/_variables.scss')
    .pipe($.rename('bootstrap-variables.scss'))
    .pipe(gulp.dest(`${config.assets}sass/`));
});

/**
* Task to build assets on production server
*/
const build = gulp.series(styles);
gulp.task('build', build);

/**
 * Default task
 */
const defaultFunc = (done, isServe) => loader.import(conditionalStyleguide)
 .then(m => {
   $.util.log('DEVELOPMENT MODE');
   if (isServe) {
     done(gulp.series(build, serve));
   } else {
     done(gulp.series(build));
   }
 })
 .catch(err => {
   $.util.log('PRODUCTION MODE');
   if (isServe) {
     done(gulp.series(build, serve));
   } else {
     done(gulp.series(build));
   }
 });

gulp.task('default', () => defaultFunc(res => res(), false));

/**
* Serve task
*/
const serveTask = gulp.task('serve', () => defaultFunc(res => res(), true));
