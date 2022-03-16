module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-final/" : "/",
};

module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "The Florist 花閣";
      return args;
    });
  },
};
