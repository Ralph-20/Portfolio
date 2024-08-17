/**
 * Generates index.ts boilerplate for a component under `src/components`
 * @param componentName - the component name
 * @returns component src boilerplate as a string
 */
function generateComponentIndex(componentName: string): string {
  return `import ${componentName} from './${componentName}';
    
    export { type ${componentName}Props } from './${componentName}';
    export default ${componentName};
    `;
}

export default generateComponentIndex;
