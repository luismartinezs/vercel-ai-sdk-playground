Example of nested UI streaming

- Stream components within other UI components, i.e. passed as props
- In short you can pass the value of a streamable ui as prop to a component

```tsx
// action.tsx
async function fetchNestedData(question) {
  ui = createStreamableUI(<>loading</>)
  (async () => {
    res = await callLLM(question) // get some data
    answer = createStreamableUI(<>loading</>)
    ui.done(<Dashboard
      answer={answer.value} // streamable ui value passed as prop
      otherProp={res}
    >)
    details = await callLLM(res) // get some other data
    answer.done(<Details details={details} />)
  })()

  return { id: Date.now(), ui: ui.value }
}
```

Then call server action and use the ui state as usual in client component with useUIState and useActions