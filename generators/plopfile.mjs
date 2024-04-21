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
}
