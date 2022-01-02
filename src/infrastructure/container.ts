import { createContainer, asClass, AwilixContainer, InjectionMode, Lifetime } from 'awilix';
import path from 'path';

function camalize(str: string) {
  return str.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
}

let container: AwilixContainer = null;

export function loadContainer(): AwilixContainer {

  if (container) {
    throw new Error('Awilix Container already loaded');
  }

  container = createContainer({
    injectionMode: InjectionMode.PROXY
  });

  const baseDir = path.resolve(`${__dirname} + '/..`);

  container.loadModules([
    `${baseDir}/use-cases/**/*.interactor.*`,
    `${baseDir}/adapters/**/*.presenter.*`,
    `${baseDir}/adapters/**/*.controller.*`,
    `${baseDir}/adapters/**/*.gateway.*`,
    `${baseDir}/infrastructure/plugins/**/*.*`,
    `${baseDir}/infrastructure/db/data-mappers/**/*.*`
  ], {
    formatName: (name: string) => {
      const infraLabelsRegex = /impl|mysql|redis|express|sql|aws|kms|dynamo|http|sequelize|gerencianet/gi;

      let moduleName = name.replace(infraLabelsRegex, '');

      if (moduleName.startsWith('-')) {
        moduleName = moduleName.slice(1);
      }

      moduleName = moduleName.replace('.', '-');

      return camalize(moduleName).replace('-', '');
    },
    resolverOptions: {
      register: asClass,
      lifetime: Lifetime.SCOPED
    }
  });

  return container;
};


export const getContainer = () => {
  return container;
}