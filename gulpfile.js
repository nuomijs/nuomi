const {
  src, dest, parallel, watch,
} = require('gulp');
const babel = require('gulp-babel');
const { readdirSync, statSync } = require('fs');

const pkgs = 'packages';
const ext = '*.{js,jsx}';
const readdir = readdirSync(pkgs);

function task(stream) {
  readdir.forEach((pkg) => {
    const pkge = `${pkgs}/${pkg}`;
    if (!/^\./.test(pkg) && statSync(pkge).isDirectory()) {
      stream(pkge).pipe(dest(`${pkge}/lib`));
    }
  });
}

function transform(cb) {
  task((pkg) => src(`${pkg}/src/**/${ext}`).pipe(babel()));
  cb();
}

if (process.env.NODE_ENV === 'development') {
  watch(`${pkgs}/*/src/**/${ext}`, transform);
}

exports.default = parallel(transform);
