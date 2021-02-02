import Form from "./Form"

function App() {

  function langDetect() {
    let userLang = navigator.language;
    console.log(userLang)
  }
  langDetect();

  return (
    <div className="App">
    <Form />
    </div>
  );
}

export default App;
