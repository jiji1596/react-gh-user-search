function SavedUserCard({ user, index, deleteUser }) {
  return (
    <div className="card bg-base-content text-primary-content w-72 shadow-sm">
      <figure className="px-5 pt-5">
        <img src={user.avatar_url} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{user.login}</h2>
        <p>{user.bio}</p>
        <p>Following: {user.following}</p>
        <p>Follwers: {user.followers}</p>
      </div>
      <div className="card-actions justify-center">
        <button className="btn btn-primary" onClick={() => deleteUser(index)}>Delete</button>
      </div>
    </div>
  );
}

export default SavedUserCard;
