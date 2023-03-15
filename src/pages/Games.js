import { useEffect, createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { LoadingContext } from "../context/loading.context";
import GameDetail from "./GamesDetail";
import { post, get } from "../services/authService";

const Games = () => {
  const {
    setOtherGames,
    getGames,
    setGames,
    getNewGames,
    setGameDetails,
    getParams,
    page,
    page_size,
    setPage,
    games,
    gamesParams,
    setGamesParams,
    otherGames,
  } = useContext(LoadingContext);

  const [comment, setComment] = useState("");
  const [gamesWithComments, setGamesWithComments] = useState([]);
  const [gamesAgain, setGamesAgain] = useState([]);
  const [reviews, setCommentReviews] = useState([]);

  // const NextPage = () => {

  //     setPage(page + 1);
  //   // setPage(previousCount => previousCount + 1, getGames())

  // }
  console.log(comment);
  const setDetails = (thisGame) => {
    setGameDetails(thisGame);
  };

  const { user } = useContext(LoadingContext);
  const commentHandler = (e) => {
    setComment(e.target.value);
  };
  useEffect(() => {
    if (!games) {
      getGames();
    }
    // get(`/games/reviews/find`).then((results) => {
    //   setCommentReviews(results.data);
    // });

    // getReviewsTwo(games);
  }, []);
  // function hey(games) {
  //   const obj = {};
  //   const arr = [];
  //   for (let i = 0; i < reviews.length; i++) {
  //     obj[reviews[i].gameId] = [];
  //   }
  //   for (let i = 0; i < reviews.length; i++) {
  //     // console.log(reviews[i++]);

  //     if (obj[reviews[i].gameId]) {
  //       obj[reviews[i].gameId].push(reviews[i].comment);
  //     }

  //     // } else if (Object.keys(obj).includes(reviews[i].gameId)) {
  //     //   console.log("true");
  //     //   obj[reviews[i].gameId].push("hi");
  //     // }
  //     // if (!obj[i]) {
  //     //   obj[reviews[i].gameId] = [reviews[i].comment];
  //     // }
  //   }
  //   let count = 0;
  //   const gameArray = [...games];
  //   for (const key in obj) {
  //     console.log(obj[key]);
  //     console.log(Number(key));
  //     gameArray.forEach((game) => {
  //       if (Number(key) === game.id) {
  //         count = count + 1;
  //         arr.push({ ...game, comment: obj[key] });
  //       }
  //     });
  //     console.log(count);
  //   }
  //   const splicedArray = [
  //     ...arr.concat([...games.splice(count, games.length - 1)]),
  //   ];

  //   for (let i = 0; i < splicedArray.length; i++) {
  //     otherGames.push(splicedArray[i]);
  //   }
  //   console.log(otherGames);
  //   // const newGameArray = arr.concat(splicedArray);
  //   console.log(Object.keys(obj));
  //   // console.log(arr.concat(splicedArray));
  //   console.log(obj);
  //   console.log(arr);
  //   // console.log(newGameArray);
  //   // setGames(splicedArray);
  //   console.log(splicedArray);
  // }
  // console.log(otherGames);
  // console.log(reviews);
  // console.log(games);
  const onCommentSubmit = (gameId) => {
    console.log(gameId);
    post(`/games/reviews/${gameId}`, { comment, gameId })
      .then((results) => {
        console.log(results.data);
        // setUser(results.data);
        const newGames = [...games];
        const foundGame = newGames.filter((game) => game.id === gameId);
        console.log(foundGame);
        let foundGameNew = foundGame[0];
        console.log(foundGameNew);
        let ind = newGames.findIndex((game) => game === foundGameNew);
        console.log(ind);
        if (!foundGame[0].comment) {
          foundGameNew = { ...foundGame[0], comment: [] };
        }
        foundGameNew.comment.push(results.data.comment);

        // console.log(foundGameArray);
        // foundGameNew.comment = foundGameArray;
        console.log(foundGameNew);
        newGames.splice(ind, 1, foundGameNew);
        console.log(newGames);
        setGames(newGames);
        // console.log(hey);
        // const hey2 = newGames.splice(hey, 1, results.data);
        // console.log(hey2);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // gamesWithReviews();

  // function getReviews(gameId2, game) {
  //   // const newGamesArray = games.map((gameFound) => {
  //   //   return { ...gameFound, comments: [] };
  //   // });
  //   setGamesWithComments({ ...game, comment: [] });
  //   console.log(gamesWithComments);
  //   get(`/games/reviews/find/${gameId2}`).then((results) => {
  //     console.log(results.data.foundReviews);
  //     console.log("hey");
  //     //   results.data.foundReviews.forEach((review) => {
  //     //     console.log(review.gameId);

  //     //     if (review.gameId === game.id) {
  //     //       newGamesArray.push({ comments: review });
  //     //     } else {
  //     //       newGamesArray.push({ comments2: [] });
  //     //     }
  //     //   });
  //     //   console.log(newGamesArray);
  //     // });

  //     // const newArr = game.map((game) => {
  //     //   console.log(game);
  //     //   if (game.id === results.data.gameId)
  //     //     return { ...game, comment: results.data.foundReviews };
  //     //   else {
  //     //     return { ...game, comment: [] };
  //     //   }
  //     // });
  //     // console.log(newArr);
  //     getReviews = function () {};
  //   });
  // }
  // console.log(games);
  // useEffect(() => {
  //   // if(page > 1){

  //     getNewGames()
  //   // }

  // }, [page])
  return (
    <div>
      <Search />
      <div className="parentImg">
        <br />
        {/* {games && hey([...games])} */}

        {/* {games && console.log("Games now", games)} */}
        {/* {games && gamesWithReviews()} */}
        {games ? (
          <>
            {games.map((game) => {
              return (
                <>
                  {/* {game &&  */}
                  <div className="game-card-container" key={game.id}>
                    <div className="game-card">
                      <Link
                        onClick={() => setDetails(game)}
                        to={`/games/${game.id}`}
                      >
                        {game.comment &&
                          game.comment.map((com) => {
                            return <p>{com}</p>;
                          })}
                        <img src={game.background_image} alt="Gameimg" />
                      </Link>
                      <h2>{game.name}</h2>
                      <ul>
                        {game.genres.length && (
                          <li>
                            <strong>Genre </strong> {game.genres[0].name}
                          </li>
                        )}
                        <li>
                          <strong>Rating </strong>
                          {game.rating}
                        </li>
                        {game.esrb_rating ? (
                          <li>
                            <strong>ESRB Rating </strong>
                            {game.esrb_rating.name}
                          </li>
                        ) : (
                          <li>
                            <strong>ESRB Rating </strong>
                            No Rating
                          </li>
                        )}
                        <li>
                          <strong>Playtime </strong>
                          {game.playtime} hrs
                        </li>
                        <li>
                          <strong>Released: </strong>
                          {game.released}
                        </li>
                      </ul>

                      {game.comment ? <p>{game.comment}</p> : "none"}
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        onCommentSubmit(game.id);
                      }}
                    >
                      <textarea
                        name="comment"
                        onChange={commentHandler}
                      ></textarea>
                      <button>Comment</button>
                    </form>
                  </div>
                  {/* } */}
                </>
              );
            })}
          </>
        ) : (
          <h4>Loading...</h4>
        )}

        {games && (
          <footer>
            {" "}
            <button onClick={() => getNewGames()}>Next Page</button>{" "}
          </footer>
        )}
      </div>
    </div>
  );
};

export default Games;
