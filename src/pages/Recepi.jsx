import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import React from "react";

function Recepi() {
  const params = useParams();

  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await api.json();
    setDetails(data);
    console.log(data);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailsWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button
          onClick={() => setActiveTab("instructions")}
          className={activeTab === "instructions" ? "active" : ""}
        >
          Instructions
        </Button>
        <Button
          onClick={() => setActiveTab("ingridiant")}
          className={activeTab === "ingridiant" ? "active" : ""}
        >
          Ingrediants
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingridiant" && (
          <ul>
            {details.extendedIngredients.map((ingridient) => (
              <li key={ingridient.id}>{ingridient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailsWrapper>
  );
}

const DetailsWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  div {
    img {
      width: 50%;
      @media only screen and (max-width: 868px) {
        width: 100%;
      }
    }
  }

  h2 {
    margin-bottom: 1.5rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;
  margin: 0.5rem 0rem;
  display: block;
  cursor: pointer;
  width: 50%;
  @media only screen and (max-width: 868px) {
    width: 100%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 1.4rem;
    line-height: 2.5rem;
    @media only screen and (max-width: 868px) {
      font-size: 1.2rem;
      line-height: 2rem;
    }
  }
`;

export default Recepi;
