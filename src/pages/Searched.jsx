import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Searched() {
  const [searchedRecepie, setSearchedRecepie] = useState([]);

  let params = useParams();

  const getSearched = async (name) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const data = await api.json();
    setSearchedRecepie(data.results);
  };

  useEffect(() => {
    getSearched(params.search);
    console.log(params.search);
  }, [params.search]);

  return (
    <Grid>
      {searchedRecepie.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recepie/" + item.id}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 2rem;
`;
const Card = styled.div`
  width: 100%;
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }

`;

export default Searched;
