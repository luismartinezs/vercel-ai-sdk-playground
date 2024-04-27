export default function plopGenerator(plop) {
  plop.setGenerator("component", {
    description: "Component",
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
        path: "../components/{{pascalCase name}}.tsx",
        templateFile: "templates/component/component-with-props.tsx.hbs",
      }
    ],
  });
  plop.setGenerator("page", {
    description: "Create a new Next.js page",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "page name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../app/{{kebabCase name}}/page.tsx",
        templateFile: "templates/page/page.tsx.hbs",
      },
      {
        type: "modify",
        path: "../components/header.tsx",
        pattern: /\/\/ append new link/g,
        template: `{ href: "/{{kebabCase name}}", label: "{{properCase name}}" },\n  // append new link`
      }
    ],
  });
}
