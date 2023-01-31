import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { Link } from "react-router-dom";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Popuplar</h3>
        <Splide
          options={{
            perPage: 4,
            gap: "2rem",
            arrows: false,
            pagination: false,
            drag: "free",
            breakpoints: {
              1400: {
                perPage: 3,
              },
              700: {
                perPage: 2,
                arrows: true,
              },
              600:{
                perPage:1,
                arrows:true,
              }
            },
          }}
        >
          {popular.map((recipes) => {
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

export default Popular;
