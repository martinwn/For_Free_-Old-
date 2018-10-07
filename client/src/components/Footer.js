import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  text-align: center;
  border-top: solid 0.3px rgba(0, 0, 0, 0.3);
`;

const Footer = props => {
  return (
    <StyledFooter>
      <p>For Free &copy;</p>
    </StyledFooter>
  );
};

export default Footer;
