Manage UI state from server actions by using a streamable UI:

1. use createStreamableUI and initialize it with loading state, e.g. Spinner
2. use .update to update ui
3. get message from LLM
4. use .update again to show response
5. return UI from server action
5. In the client get UI state with useUIState and use it to render UI
6. Call server action and use the return value of server action to update ui state

```js
// server action
ui = createStreamableUI(<>Loading</>)
try
  city = await getCityName(userInput) // call to LLM
  temp = await getTemp(city) // call to API
  ui.update(<WeatherCard city={city} temp={temp} />)
catch(err)
  ui.done(<Error />)
return ui.value
// client component
Chat = () => {
  [ui, setUI] = useUIState()
  {serverAction} = useAction()
  handleSubmitUserInput = async() => {
    setUI(prev => [...prev, <>{value}</>]) // local user inputted value
    newUI = await serverAction(value)
    setUI(prev => [...prev, newUI])
  }
}
```

Pass server action to client component and call it as needed:

```js
<ClientComp
  action={async () => {
    'use server'
    // call LLM or API
  }}
/>
```