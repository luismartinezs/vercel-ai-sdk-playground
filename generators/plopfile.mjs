export default function plopGenerator(plop) {
  plop.setGenerator("route", {
    description: "Component with its own Route",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/index.ts",
        templateFile: "templates/component/index.ts.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component/component.tsx.hbs",
      },
      {
        type: 'append',
        path: '../src/main.tsx',
        pattern: /(\/\/ new component import here)/gi,
        template: `import {{pascalCase name}} from './components/{{pascalCase name}}';`,
      },
      {
        type: 'append',
        path: '../src/main.tsx',
        pattern: /(\/\/ new component route here)/gi,
        template: `      { path: '{{kebabCase name}}', element: <{{pascalCase name}} /> },`,
      },
      {
        type: 'append',
        path: '../src/routes/root.tsx',
        pattern: /(\/\/ new component link here)/gi,
        template: `  { path: '{{kebabCase name}}', label: '{{pascalCase name}}' },`,
      }
    ],
  });
  plop.setGenerator("kata", {
    description: "Kata with its own Route",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "kata name, e.g. 'my fancy kata'",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/katas/{{pascalCase name}}/index.ts",
        templateFile: "templates/kata/index.ts.hbs",
      },
      {
        type: "add",
        path: "../src/katas/{{pascalCase name}}/kata.tsx",
        templateFile: "templates/kata/kata.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/katas/{{pascalCase name}}/start.tsx",
        templateFile: "templates/kata/start.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/katas/{{pascalCase name}}/finish.tsx",
        templateFile: "templates/kata/finish.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/katas/{{pascalCase name}}/README.md",
      },
      {
        type: 'append',
        path: '../src/main.tsx',
        pattern: /(\/\/ new component import here)/gi,
        template: `import {{pascalCase name}} from './katas/{{pascalCase name}}';`,
      },
      {
        type: 'append',
        path: '../src/main.tsx',
        pattern: /(\/\/ new component route here)/gi,
        template: `      { path: '{{kebabCase name}}', element: <{{pascalCase name}} /> },`,
      },
      {
        type: 'append',
        path: '../src/routes/root.tsx',
        pattern: /(\/\/ new component link here)/gi,
        template: `  { path: '{{kebabCase name}}', label: '{{sentenceCase name}}' },`,
      }
    ],
  });
  plop.setGenerator("component", {
    description: "Standalone component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/index.ts",
        templateFile: "templates/component/index.ts.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component/component-with-props.tsx.hbs",
      }
    ],
  });
}
