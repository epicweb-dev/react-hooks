// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";

function Greeting({initialName = ""}) {
  const [name, setName] = React.useState(initialName);

  function handleChange({ target }) {
    setName(target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={initialName} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting initialName="Roman" />;
}

export default App;
