import React from "react";
import styled from "styled-components";

const IntroWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const IntroHeader = styled.h1`
  font-size: 2rem;
  color: #ff2f21;
  letter-spacing: 0.03em;
`;

const IntroBlurb = styled.p`
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: 0.03em;
`;

const Intro = props => {
  return (
    <IntroWrapper>
      <IntroHeader>One's Trash is Another's Treasure</IntroHeader>
      <IntroBlurb>
        <img alt="icon" /> See what's for free in your neighborhood.
      </IntroBlurb>
      <IntroBlurb>
        {" "}
        <img alt="icon" /> Want to get rid of something but don't want it to go
        to waste?
      </IntroBlurb>
      <IntroBlurb>
        {" "}
        <img alt="icon" /> We help people connect so everybody wins.
      </IntroBlurb>
    </IntroWrapper>
  );
};

export default Intro;
