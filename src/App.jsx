import { useState, useEffect } from "react";
import "./App.css";
import ResultCard from "./components/ResultCard";
import SavedUserCard from "./components/SavedUserCard";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [user, setUser] = useState();
  const [savedUsers, setSavedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function inputChange(event) {
    setInput(event.currentTarget.value);
  }

  function handleClick() {
    setError(null);
    setUser(null);
    setLoading(true);
    setResult(input);
  }

  useEffect(() => {
    if (result) {
      const url = `https://api.github.com/users/${input}`;

      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message === "Not Found") {
            setError(true); // 👈 city not found
            setLoading(false);
            return;
          }
          console.log(data);
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [result]);

  function handleSaved() {
    setSavedUsers((prev) => [...prev, user]);
  }

  function handleDelete(key) {
    setSavedUsers(prev =>
      prev.filter((user, i) => {
        if (key === i) {
          return false
        }
        return user
      })
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-secondary text-primary-content py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">GitHub Profile Collector</h1>
        </div>
      </header>
      <div className="flex justify-center my-5">
        <input
          type="text"
          placeholder="Username"
          className="input input-secondary input-lg w-[480px] mr-5"
          onChange={inputChange}
        />
        <button className="btn btn-secondary btn-lg" onClick={handleClick}>
          Search
        </button>
      </div>
      <div className="result flex justify-center mb-5 ">
        {loading && (
          <span className="loading loading-ring loading-xl text-primary"></span>
        )}
        {error && <p>Can't find the user</p>}
        {user && <ResultCard user={user} saveUser={handleSaved} />}
      </div>
      <div className="cards">
        <h2 className="text-4xl text-center mb-5">Saved Genius Profiles</h2>
        <div className="grid grid-cols-4 gap-3 w-8/10 mx-auto">
          {savedUsers.map((userData, i) => {
            return (
              <SavedUserCard
                user={userData}
                key={i}
                index={i}
                deleteUser={handleDelete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
