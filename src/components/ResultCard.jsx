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



export default ResultCard;
