import gulp from 'gulp';
import browserSync from 'browser-sync';
import config from '../gulp_config.json';

import { styles } from './styles';

/**
 * Serve
 */
export const serve = () => {
  browserSync({
    server: {
      baseDir: [config.app.basedir],
    },
    open: false
  });

  gulp.watch([
    `${config.assets}**/*.scss`
  ], styles);
};
