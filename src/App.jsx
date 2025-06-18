import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [users, setUsers] = useState([]);

  function inputChange(event) {
    setInput(event.currentTarget.value);
  }

  function handleClick() {
    const url = `https://api.github.com/users/${input}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        setResult(data)
      });
  }


  function ResultCard() {
    return (
      <div className="card card-side bg-base-100 shadow-sm w-144">
          <figure>
            <img
              src={result.avatar_url}
              alt="Movie"
              className="w-60"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{result.login}</h2>
            <p>{result.bio}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Secondary"
          className="input input-secondary input-lg w-[480px] mr-5"
          onChange={inputChange}
        />
        <button className="btn btn-secondary btn-lg" onClick={handleClick}>
          Search
        </button>
      </div>
      <div className="result place-items-center">
        { result && <ResultCard /> }

      </div>
      <div className="cards"></div>
    </div>
  );
}

export default App;
