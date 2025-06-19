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


export default SavedUserCard
