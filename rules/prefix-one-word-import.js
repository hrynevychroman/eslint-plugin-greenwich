module.exports = {
  create: function (context) {
    const { prefixes = [] } = context.options[0] || {};
    const { paths = [] } = context.options[0] || {};

    return {
      ImportDeclaration(node) {
        const value = node.source.value;

        const isInsidePath = paths.some(path => value.includes(path));

        if (isInsidePath) {
          node.specifiers.forEach(specifier => {
            if (specifier.type === "ImportDefaultSpecifier") {
              const importName = specifier.local.name;
              const words = importName.split(/(?=[A-Z])/);
              const fileName = value
                .split("/")
                .pop()
                .replace(/\.vue$/, "");

              if (
                (words.length === 1 || fileName.match(/[A-Z]/g).length === 1) &&
                !prefixes.some(prefix => importName.startsWith(prefix))
              ) {
                context.report({
                  node: specifier,
                  message: `Single-word file names in components directory must start with one of the following prefixes: ${prefixes.join(
                    ", "
                  )}`
                });
              }
            }
          });
        }
      }
    };
  }
};
