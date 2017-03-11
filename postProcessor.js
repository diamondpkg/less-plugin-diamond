const fs = require('fs-extra');
const path = require('path');
const async = require('async');
const deasync = require('deasync-promise');

module.exports = () => class PostProcessor {
  process(css) {
    return deasync(new Promise((resolve, reject) => {
      let packages;
      try {
        packages = JSON.parse(fs.readFileSync('./diamond/.internal/packages.lock'));
      } catch (err) {
        packages = [];
      }

      const postCompiles = packages.filter(o => !!o.postCompile)
        .map(o => require(path.join(process.cwd(), 'diamond/packages', o.path, o.postCompile)));

      async.each(postCompiles, (postCompile, done) => {
        let res;
        try {
          res = postCompile(css);
        } catch (err) {
          reject(err);
        }

        Promise.resolve(res).then((newCss) => {
          css = newCss;
          done();
        }).catch((err) => {
          reject(err);
        });
      }, () => {
        resolve(css);
      });
    }));
  }
};
