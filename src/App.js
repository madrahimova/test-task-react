import './App.css';
import FileDropArea from "./components/FileDropArea";
import DataHandler from "./helpers/data_handler";

function App() {
  const handler = new DataHandler();

  return (
    <div className="App">
      <FileDropArea upload={handler.parse}/>
    </div>
  );
}

export default App;
