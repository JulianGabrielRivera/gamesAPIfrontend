import { LoadingContext } from "../context/loading.context";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { post, get } from "../services/authService";

const Library = () => {
  const { user, setDetails, setUser } = useContext(LoadingContext);
  const { authenticateUser } = useContext(AuthContext);
  const [review, setReview] = useState("");

  {
    console.log("Wish in library", user);
  }

  useEffect(() => {
    // authenticateUser();
  }, [user]);

  console.log(user);
  // ${baseUrl}/games/delete/add-wish/${user._id}

  const handleAddToWishlistDelete = (user, game) => {
    console.log(game);
    axios
      .post(`${baseUrl}/games/delete/add-wish/${user._id}`, { gameId: game })
      .then((response) => {
        console.log("Game deleted", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // console.log(
  //   user.games_pick.map((game) => {
  //     console.log(game);
  //   })
  // );

  const handleCommentSubmit = (gameId) => {
    // user.games_pick.forEach((game) => {
    //   if (game.id === gameId) {
    post(`/games/reviews/${gameId}/${user._id}`, { review })
      .then((results) => {
        console.log(results.data);
        setUser(results.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // });
  };

  const handleCommentDelete = (gameId) => {
    get(`/games/reviews/${gameId}/${user._id}`)
      .then((results) => {
        console.log(results.data, "deleted");
        setUser(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(user);
  return (
    <div>
      <h1>My List</h1>
      <div className="parentLib">
        {user ? (
          <>
            {/* <h1> {console.log("Wish in library inside", user)}</h1> */}

            {user.games_pick.map((game) => (
              <div className="game-card-container-lib" key={game.id}>
                <div className="game-card-lib">
                  {/* <Link
                    onClick={() => setDetails(game)}
                    to={`/games/${game.id}`}
                  > */}
                  <img src={game.background_image} alt="Gameimg" />
                  {/* </Link> */}
                  <h2>{game.name}</h2>
                  <ul>
                    {/* {game.genres.length && (
                      <li>
                        <strong>Genre </strong> {game.genres[0].name}
                      </li>
                    )} */}
                    <li>
                      <strong>Rating </strong>
                      {game.rating}
                    </li>

                    <li>
                      <strong>Playtime </strong>
                      {game.playtime} hrs
                    </li>
                    <li>
                      <strong>Released: </strong>
                      {game.released}
                    </li>
                  </ul>
                  user: {user.name}
                  comment: {game.review && game.review.comment}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log(game._id);
                      handleCommentSubmit(game._id);
                    }}
                  >
                    <label>
                      Comment:
                      {game.isCommented ? (
                        <textarea
                          disabled
                          className="commentArea"
                          placeholder="leave a review"
                          name="review"
                          onChange={(event) => setReview(event.target.value)}
                        />
                      ) : (
                        <textarea
                          className="commentArea"
                          placeholder="leave a review"
                          name="review"
                          onChange={(event) => setReview(event.target.value)}
                        />
                      )}
                    </label>
                    <button>comment</button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleCommentDelete(game.id);
                      }}
                    >
                      Delete
                    </button>
                  </form>
                </div>
                <div>
                  <button
                    className="check-button"
                    onClick={() => handleAddToWishlistDelete(user, game.id)}
                  >
                    <a className="check-button-a">Finish</a>
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>No games found in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default Library;
