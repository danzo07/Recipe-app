import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { Link } from "react-router-dom";

function Veggies() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      console.log(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Veggies</h3>
        <Splide
          options={{
            perPage: 3,
            gap: "2rem",
            arrows: false,
            pagination: false,
            drag: "free",
            breakpoints: {
              1400: {
                perPage: 2,
              },
              700: {
                perPage: 1,
                arrows: true,
              },
            },
          }}
        >
          {veggie.map((recipes) => {
            return (
              <SplideSlide key={recipes.id}>
                <Card>
                  <Link to={"/recepie/" + recipes.id}>
                    <p>{recipes.title}</p>
                    <img src={recipes.image} alt={recipes.title} />
                    <Gradiant />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 2rem 0rem;
`;
const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  transition: 300ms all ease-in;
  &:hover {
    img {
      transform: scale(1.2);
    }
  }
  img {
    border-radius: 2rem;
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: 300ms all ease-in;
  }
  p {
    padding: 0px 20px;
    position: absolute;
    left: 50%;
    bottom: 50%;
    z-index: 10;
    transform: translate(-50%, 50%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1.2rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.61);
  }
`;

const Gradiant = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggies;
