import React, { Component } from "react";
import styled from "styled-components";
import CategoryList from "../components/List";
import Grid from "@material-ui/core/Grid";
import UserCard from "../components/Card";

const HomeWrapper = styled.div`
  display: flex;
  background: rgba(230, 230, 230, 1);
  padding: 20px;
  min-height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

class HomePage extends Component {
  state = {
    categories: [
      "antiques",
      "appliances",
      "arts/crafts",
      "atv",
      "auto parts",
      "aviation",
      "baby",
      "beauty",
      "bike parts",
      "bikes",
      "boat parts",
      "boats",
      "books",
      "business",
      "cars/trucks",
      "cd/dvd/vhs",
      "cell phones",
      "clothes",
      "collectibles",
      "computer parts",
      "computers",
      "electronics",
      "farm/garden",
      "furniture",
      "general",
      "heavy equipment",
      "household",
      "jewelry",
      "materials",
      "motorcycle parts",
      "motorcycles",
      "music instruments",
      "photo/video",
      "rvs/camping",
      "sporting",
      "tickets",
      "tools",
      "toys/games",
      "trailers",
      "video gaming",
      "wheels/tires"
    ],
    checked: [0]
  };

  handleToggle = value => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    return (
      <HomeWrapper>
        <Grid container spacing={0}>
          <Grid item md={3}>
            <ContentWrapper style={{ position: "absolute", top: "70px" }}>
              <CategoryList
                checked={this.state.checked}
                handleToggle={this.handleToggle}
                categories={this.state.categories}
              />
            </ContentWrapper>
          </Grid>
          <Grid item md={6}>
            <h1>Posts</h1>
          </Grid>
          <Grid item md={3}>
            <ContentWrapper style={{ position: "absolute", top: "70px" }}>
              <UserCard user={this.props.user} />
            </ContentWrapper>
          </Grid>
        </Grid>
      </HomeWrapper>
    );
  }
}

export default HomePage;
