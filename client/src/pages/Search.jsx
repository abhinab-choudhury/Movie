import { useParams } from "react-router";

function Search() {
  const params = useParams()
  const tmdb_id = params.tmdb_id;
  
  return (
    <div>
      <h1>Search</h1>

    </div>
  );
}

export default Search;
