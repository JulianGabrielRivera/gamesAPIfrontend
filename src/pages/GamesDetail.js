import "./details.css";
import { useContext, useEffect, useState, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import { LoadingContext } from "../context/loading.context";
import axios from "axios";

import { baseUrl } from "../services/baseUrl";
import { useNavigate } from "react-router-dom";

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    gameDetails,
    games,
    setGameDetails,
    gameDetailsScreen,
    noGame,
    getGameScreen,
    user,
    setUser,
  } = useContext(LoadingContext);

  const carouselRef = useRef(null);

  useEffect(() => {
    //  if (!gameDetails) {
    console.log("this is the id", id);
    noGame(id);
    //  }

    getGameScreen(id);
    console.log("this is the id 2", id);
  }, [id]);

  useEffect(() => {}, [gameDetailsScreen, user]);

  const handleAddToWishlist = (user, game) => {
    if (user !== null) {
      console.log("user Det ", user, gameDetails.id);
      axios
        .post(`${baseUrl}/games/add-wish/${user._id}`, { game: game })
        .then((response) => {
          console.log("Response picked game ", response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {gameDetails ? (
        <div className="game-detail-container">
          <div className="game-detail-image">
            <img src={gameDetails.background_image} alt={gameDetails.name} />
          </div>
          <button onClick={() => handleAddToWishlist(user, gameDetails)}>
            Next to play
          </button>
          <div className="game-detail-info">
            <h1>{gameDetails.name}</h1>

            <p>
              <strong>Release Date:</strong> {gameDetails.released}
            </p>

            <p>
              <strong>Genres:</strong>{" "}
              {gameDetails.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p>
              <strong>Platforms:</strong>{" "}
              {gameDetails.platforms
                .map((platform) => platform.platform.name)
                .join(", ")}
            </p>
            <p>
              <strong>Metacritic Score:</strong> {gameDetails.metacritic}
            </p>
            {gameDetails.description_raw && (
              <p>{gameDetails.description_raw}</p>
            )}

            {gameDetailsScreen && gameDetailsScreen.results && (
              <div>
                <h2>Screenshots:</h2>
                <div className="game-detail-carousel" ref={carouselRef}>
                  {gameDetailsScreen.results.map((screen) => (
                    <img
                      className="game-detail-screen"
                      key={screen.id}
                      src={screen.image}
                      alt={screen.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </>
  );
};

export default GameDetail;
