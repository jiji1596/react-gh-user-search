import { useState, useEffect } from "react";
import "./App.css";

function ResultCard({ user, saveUser }) {
  return (
    <div className="card card-side bg-base-content text-primary-content shadow-sm w-144">
      <figure>
        <img src={user.avatar_url} alt="Movie" className="w-60" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.login}</h2>
        <p>{user.bio}</p>
        <p>Following: {user.following}</p>
        <p>Follwers: {user.followers}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => saveUser()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function SavedUserCard({ user }) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={user.avatar_url} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{user.login}</h2>
        <p>{user.bio}</p>
        <p>Following: {user.following}</p>
        <p>Follwers: {user.followers}</p>
      </div>
    </div>
  );
}

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [user, setUser] = useState();
  const [savedUsers, setSavedUsers] = useState([]);

  function inputChange(event) {
    setInput(event.currentTarget.value);
  }

  function handleClick() {
    setResult(input);
  }

  useEffect(() => {
    if (result) {
      const url = `https://api.github.com/users/${input}`;

      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);

          setUser(data);
        });
    }
  }, [result]);

  function handleSaved() {
    setSavedUsers((prev) => [...prev, user]);
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
      <div className="result place-items-center mb-5">
        {user && <ResultCard user={user} saveUser={handleSaved} />}
      </div>
      <div className="cards">
        <h2 className="text-4xl text-center">Saved Genius Profiles</h2>
        <div className="grid grid-cols-4 gap-3">
          {savedUsers.map((userData, i) => {
            return <SavedUserCard user={userData} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
