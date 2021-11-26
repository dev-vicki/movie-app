import {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "4767a295";

const Container = styled.div`
display:flex;
flex-direction:column;
`;

const Header = styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
background-color: black;
align-items: center;
color:white;
padding: 10px;
font-size: 20px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
display: flex;
flex-direction:row;
align-items: center;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 10px;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
  margin: 5px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  background-color: white;
  color: black;
  border-radius: 6px;
  width: 40%;
  margin:5px;
  margin-right: 10px;
`;

const SearchInput = styled.input`
color: black;
font-size: 18px;
font-weight: bold;
border: none;
outline: none;
margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();


  const fetchData = async(searchString) => {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    updateMovieList(response.data.Search)
  };
  const onTextChange = (event) => {
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeoutId(() => fetchData(event.target.value), 500);
    setTimeoutId(timeout);
  }
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="movie-icon.png" />
          Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="search-icon.png" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
      <MovieListContainer>
        {movieList?.length
          ? (movieList.map((movie, index) => (
              <MovieComponent
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          )
          : (<Placeholder src="movie-icon.png"/>
          )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
