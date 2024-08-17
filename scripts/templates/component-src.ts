/**
 * Generates React boilerplate for a component under `src/components`
 * @param componentName - the component name
 * @returns component src boilerplate as a string
 */
function generateComponentSrc(componentName: string, componentPath: string): string {
  const pathParts = componentPath.split('/').filter(Boolean);
  const isSitecoreComponent = false;
  const dottedPath = [...pathParts, componentName].join('.');

  return `import cn from 'classnames';
  import styles from './${componentName}.module.scss';
  ${
    isSitecoreComponent
      ? `import { ComponentProps } from 'lib/component-props';
  import { Website } from 'lib/component-props/model';
  import Text from 'components/BaseHelpers/Text';
  import RichText from 'components/BaseHelpers/RichText';
  `
      : ''
  }
  export type ${componentName}Props = ${
    isSitecoreComponent
      ? `ComponentProps &
    Website.Project.Main.ComponentTypes.${dottedPath};`
      : `{
  
  };`
  }
  
  const ${componentName} = (props: ${componentName}Props): JSX.Element => {
    return <div className={styles.main}></div>;
  };
  
  export default ${componentName};  
  `;
}

export default generateComponentSrc;
