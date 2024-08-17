/**
 * Generates React boilerplate for a component under `src/components`
 * @param componentName - the component name
 * @returns component src boilerplate as a string
 */
function generateComponentScss(componentRootPath: string): string {
  const levelsNested = componentRootPath.split('/').filter(Boolean);
  const nestedDir = levelsNested.map(() => '../').join('');
  return `@import "./../../${nestedDir}styles/sass-resources/sass-resources.scss";
    
    .main {
      border: 1px solid red;
    }`;
}

export default generateComponentScss;
