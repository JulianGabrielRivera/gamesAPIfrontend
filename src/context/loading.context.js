import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../services/authService";
import axios from "axios";
import Games from "../pages/Games";
const API_KEY = "43a14242dd124f1fb5e0bb64b4a70da0";
const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [games, setGames] = useState(null);
  const [gamesParams, setGamesParams] = useState(1);
  const [page, setPage] = useState(1); // current page number
  const [page_size, setPageSize] = useState(20); // number of games per page
  const [next, setNext] = useState("");
  const [gameDetails, setGameDetails] = useState(null);
  const [gameDetailsScreen, setGameDetailsScreen] = useState(null);
  const [search, setSearch] = useState("");
  const [wish, setWish] = useState([]);
  const [otherGames, setOtherGames] = useState([]);

  const [editing, setEditing] = useState(false);

  const setTimedMessage = (newMessage) => {
    setMessage(newMessage);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  // ${API_KEY}
  // 43a14242dd124f1fb5e0bb64b4a70da0
  // games?key=<key from RAWG>

  const getGames = () => {
    if (page === 1) {
      console.log("Calling API");

      get("/games/reviews/find").then((result) => {
        axios
          .get(
            `https://rawg-video-games-database.p.rapidapi.com/games?key=${API_KEY}`,
            {
              headers: {
                "X-RapidAPI-Key":
                  "3ab9eedeeemsh37ec609bf36b9b6p1b04b2jsnc001e82699f7",
                "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
              },
              params: { page: 1, page_size: page_size },
            }
          )
          .then((response) => {
            console.log(result.data);
            console.log(response.data.results);

            const array = [];
            const obj = {};
            let array2;
            const finalArray = [];
            result.data.forEach((review) => {
              obj[review.gameId] = [];
            });
            result.data.forEach((review) => {
              console.log(review.gameId);
              for (const key in obj) {
                if (Number(key) === review.gameId) {
                  obj[key].push(review.comment);
                }
                console.log(Number(key), review.gameId);
              }
            });
            console.log(obj);

            let count = 0;
            for (const key in obj) {
              // response.data.results.findIndex((game) => game.id === Number(key) );
              //     console.log(ind);
              response.data.results.forEach((game, i) => {
                if (game.id === Number(key)) {
                  console.log(i);
                  count++;
                  response.data.results.splice(i, 1, {
                    ...game,
                    comment: obj[key],
                  });
                }
              });
            }
            array2 = response.data.results.splice(
              count,
              response.data.results.length - 1
            );
            console.log(count);
            console.log(array);
            console.log(array2);
            finalArray.push(response.data.results.concat(array2));
            console.log(finalArray[0]);
            // let newArr = [...games];
            //newArr.push(...response.data.results)
            //   setGames(response.data.results)
            setGames(finalArray[0]);
            // setNext(response.data.next)
            setPage(page + 1);
            setGamesParams(response.data.next);
            // console.log("page", page);
            // console.log("res", response.data);
            // console.log("this is the response", response);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };

  const noGame = (id) => {
    axios
      .get(
        `https://rawg-video-games-database.p.rapidapi.com/games/${id}?key=${API_KEY}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "3ab9eedeeemsh37ec609bf36b9b6p1b04b2jsnc001e82699f7",
            "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
          },
          params: { page: 1, page_size: page_size },
        }
      )
      .then((response) => {
        console.log("this is the found game", response.data);

        setGameDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGameScreen = (id) => {
    axios
      .get(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`)
      .then((response) => {
        console.log("RESPONSE MOVIES", response.data);
        setGameDetailsScreen(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SearchGame = (id) => {
    get("/games/reviews/find").then((result) => {
      axios
        .get(`https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`)
        .then((response) => {
          console.log(result.data);
          console.log(response.data.results);

          const array = [];
          const obj = {};
          let array2;
          const finalArray = [];
          result.data.forEach((review) => {
            obj[review.gameId] = [];
          });
          result.data.forEach((review) => {
            console.log(review.gameId);
            for (const key in obj) {
              if (Number(key) === review.gameId) {
                obj[key].push(review.comment);
              }
              console.log(Number(key), review.gameId);
            }
          });
          console.log(obj);
          let count = 0;
          for (const key in obj) {
            response.data.results.forEach((game, i) => {
              if (game.id === Number(key)) {
                console.log(i);
                count++;
                array.splice(i, 1, { ...game, comment: obj[key] });
              }
            });
            // response.data.results.forEach((game) => {
            //   if (game.id === Number(key)) {
            //     count++;
            //     array.push({ ...game, comment: obj[key] });
            //   }
            // });
          }
          array2 = response.data.results.splice(
            count,
            response.data.results.length - 1
          );
          console.log(count);
          console.log(array);
          console.log(array2);
          finalArray.push(array.concat(array2));
          console.log(finalArray[0]);
          console.log("RESPONSE Search=>>>", response.data.results);
          setGames(finalArray[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const getNewGames = () => {
    console.log("Calling API");
    get("/games/reviews/find").then((result) => {
      axios
        .get(
          `https://rawg-video-games-database.p.rapidapi.com/games?key=${API_KEY}`,
          {
            headers: {
              "X-RapidAPI-Key":
                "3ab9eedeeemsh37ec609bf36b9b6p1b04b2jsnc001e82699f7",
              "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
            },
            params: { page: page, page_size: page_size },
          }
        )
        .then((response) => {
          console.log(result);
          const array = [];
          const obj = {};
          let array2;
          const finalArray = [];
          result.data.forEach((review) => {
            obj[review.gameId] = [];
          });
          result.data.forEach((review) => {
            console.log(review.gameId);
            for (const key in obj) {
              if (Number(key) === review.gameId) {
                obj[key].push(review.comment);
              }
              console.log(Number(key), review.gameId);
            }
          });
          console.log(obj);
          let count = 0;
          for (const key in obj) {
            response.data.results.forEach((game, i) => {
              if (game.id === Number(key)) {
                console.log(i);
                count++;
                array.splice(i, 1, { ...game, comment: obj[key] });
              }
            });
            // response.data.results.forEach((game) => {
            //   if (game.id === Number(key)) {
            //     count++;
            //     array.push({ ...game, comment: obj[key] });
            //   }
            // });
          }
          array2 = response.data.results.splice(
            count,
            response.data.results.length - 1
          );
          console.log(count);
          console.log(array);
          console.log(array2);
          finalArray.push(array.concat(array2));
          console.log(finalArray[0]);
          console.log("RESPONSE Search=>>>", response.data.results);
          // setGames(finalArray[0]);
          let newArr = [...games];
          console.log(newArr);
          let finalArr2;
          finalArr2 = newArr.concat(finalArray[0]);

          // newArr.push(...response.data.results);
          //   setGames(response.data.results)
          setGames(finalArr2);
          setPage(page + 1);
          // setGames((prev) => [...prev, ...response.data.results])
          //    setGamesParams(response.data.next)
          //    console.log('page',  page);
          //     console.log('res',  response.data);
          //  console.log('this is the response', response)
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  // const getParams = async () => {

  //    function handleClick () {
  //     setGamesParams('next');
  //   }

  // }

  // {condition && <ConditionalComponent />}
  //{fetchQuotes && <Games data={{fetchQuotes}} />}
  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        noGame,
        getGameScreen,
        page,
        page_size,
        setPage,
        getNewGames,
        gameDetails,
        setGameDetails,
        gameDetailsScreen,
        setGameDetailsScreen,
        gamesParams,
        setGamesParams,
        games,
        getGames,
        message,
        setUser,
        user,
        setIsLoading,
        setMessage,
        setTimedMessage,
        search,
        setSearch,
        SearchGame,
        wish,
        setWish,
        editing,
        setEditing,
        otherGames,
        setOtherGames,
        setGames,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
