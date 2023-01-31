import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <Slink to={"cuisine/italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </Slink>

      <Slink to={"cuisine/american"}>
        <FaHamburger />
        <h4>American</h4>
      </Slink>

      <Slink to={"cuisine/thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </Slink>

      <Slink to={"cuisine/japanese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </Slink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0rem;
  gap: 2rem;
   @media only screen and (max-width: 700px) {
    align-items: center;
    gap: 1rem;
   }
  
`;

const Slink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-decoration: none;
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.9);
  background-color: #55aa55;

  h4 {
    color: white;
    font-size: 0.8rem;
  }
  svg {
    color: white;
    font-size: 1.5rem;
  }
  &.active {
    background: rgb(124, 223, 124);
    background: linear-gradient(
      90deg,
      rgba(124, 223, 124, 1) 35%,
      rgba(85, 170, 85, 1) 100%
    );
    svg {
      color: white;
    }
    h4 {
      color: white;
    }
  }

  @media only screen and (max-width: 700px) {
    width: 5rem;
    height: 5rem;
  }
`;

export default Category;
