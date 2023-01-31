import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch></FaSearch>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  //margin: 0rem 20rem;

  div {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input {
    border: none;
    font-size: 1.5rem;
    color: #313131;
    padding: 1rem 3rem;
    border: #55aa55 solid 2px;
    border-radius: 2rem;
    outline: none;
    width: 50%;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    @media only screen and (max-width: 1400px) {
      width: 70%;
    }
    @media only screen and (max-width: 700px) {
      width: 100%;
    }
  }
  svg {
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(100%, -50%);
    color: #55aa55;
    @media only screen and (max-width: 1400px) {
      left: 15%;
    }
    @media only screen and (max-width: 700px) {
      left: 2%;
    }
  }
`;

export default Search;
