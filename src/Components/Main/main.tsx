import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getPopularMovies, getTrendingMovies } from "../../services/api";
export default function Main() {
  interface Movies {
    poster_path: string;
    title: string;
    release_date: string;
  }

  const [popularMovies, setPopularMovies] = useState<Movies[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movies[]>([]);
  const [allMovies, setAllMovies] = useState<Movies[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movies[]>([]);
  const [movieName, setMovieName] = useState<string>();

  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovies = async () => {
      const popularResponse = await getPopularMovies();
      const trendingResponse = await getTrendingMovies();
      const combinedMovies = [...popularResponse, ...trendingResponse];

      const uniqueMovies = Array.from(
        new Set(combinedMovies.map((movie) => movie.title))
      ).map((title) => combinedMovies.find((movie) => movie.title === title));

      setPopularMovies(popularResponse);
      setTrendingMovies(trendingResponse);
      setAllMovies(uniqueMovies);
    };

    fetchMovies();
  }, []);

  const searchedMovies = () => {
    if (movieName?.trim() !== "") {
      const filteredResults = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(movieName?.toLowerCase())
      );
      setFilteredMovies(filteredResults);
    } else {
      setFilteredMovies([]);
    }
  };

  return (
    <div className="p-6 md:px-20">
      {/* <button onClick={() => console.log(filteredMovies.length)}>Teste</button> */}
      <div className="flex flex-col gap-8 text-center">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-4xl">Bem-vindo</h1>
          <h2 className="text-2xl">
            Milhões de filmes e Séries para descobrir. Explore agora
          </h2>
        </div>
        <div className="border p-2 rounded flex items-center focus-within:border-blue-500">
          <input
            placeholder="Pesquise por um filme ou serie..."
            className="border-0 outline-0 w-full placeholder-gray-500  mr-2"
            onChange={(e) => setMovieName(e.target.value)}
          />
          <FiSearch
            size={20}
            className="cursor-pointer hover:scale-110 transition-all "
            onClick={() => searchedMovies()}
          />
        </div>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, key) => (
            <div key={key}>
              <h1 className="text-2xl font-bold md:text-left">Sua busca</h1>
              <div
                key={key}
                className="mt-10 flex flex-col items-center transition-transform duration-300 hover:scale-110 cursor-pointer min-w-[150px] min-h-[350px] "
              >
                <img
                  src={`${imageBaseURL}${movie.poster_path}`}
                  alt={movie.title}
                  width={150}
                  height={150}
                  className="rounded-2xl"
                />
                <h2 className="font-bold truncate w-[140px]  ">
                  {movie.title}
                </h2>
                <h2>
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1 className="text-2xl font-bold md:text-left ">
              Tendências da Semana
            </h1>
            <div className="flex gap-10 overflow-x-auto whitespace-nowrap overflow-hidden">
              {trendingMovies.length > 0 &&
                trendingMovies.map((movie, key) => (
                  <div
                    key={key}
                    className="mt-10 flex flex-col items-center transition-transform duration-300 hover:scale-110 cursor-pointer min-w-[150px] min-h-[350px] "
                  >
                    <img
                      src={`${imageBaseURL}${movie.poster_path}`}
                      alt={movie.title}
                      width={150}
                      height={150}
                      className="rounded-2xl"
                    />
                    <h2 className="font-bold truncate w-[140px]  ">
                      {movie.title}
                    </h2>
                    <h2>
                      {new Date(movie.release_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </h2>
                  </div>
                ))}
            </div>
            <h1 className="text-2xl font-bold md:text-left">Populares</h1>
            <div className="flex gap-10 overflow-x-auto whitespace-nowrap overflow-hidden">
              {popularMovies.length > 0 &&
                popularMovies.map((movie, key) => (
                  <div
                    key={key}
                    className="mt-10 flex flex-col items-center transition-transform duration-300 hover:scale-110 cursor-pointer min-w-[150px] min-h-[350px]"
                  >
                    <img
                      src={`${imageBaseURL}${movie.poster_path}`}
                      alt={movie.title}
                      width={150}
                      height={150}
                      className="rounded-2xl"
                    />
                    <h2 className="font-bold truncate w-[140px] ">
                      {movie.title}
                    </h2>
                    <h2>
                      {new Date(movie.release_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
