module.exports = {
    create: function (context) {
      const { prefixes = [] } = context.options[0] || {}; // Default to an empty array if no configuration is provided.
  
      return {
        ImportDeclaration(node) {
          const value = node.source.value;
          if (value.includes('/components/')) {
            node.specifiers.forEach((specifier) => {
              if (specifier.type === 'ImportDefaultSpecifier') {
                const importName = specifier.local.name;
                const words = importName.split(/(?=[A-Z])/);
                if (
                  words.length === 1 &&
                  !prefixes.some((prefix) => importName.startsWith(prefix))
                ) {
                  context.report({
                    node: specifier,
                    message: `Single-word import names in components directory must start with one of the following prefixes: ${prefixes.join(', ')}`,
                  });
                }
              }
            });
          }
        },
      };
    },
  };
  