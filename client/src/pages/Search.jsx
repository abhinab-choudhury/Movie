import { useParams } from 'react-router';

function Search() {
  const params = useParams();
  const tmdb_id = params.tmdb_id;

  // show the movie details from TMDB
  // also add shows u might like i.e from the model
  // in the deployed version add the /similar api endpoint to get the
  // details

  return (
    <div>
      <h1>Search</h1>
    </div>
  );
}

export default Search;
