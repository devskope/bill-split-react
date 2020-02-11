import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AppLogo from "../../assets/bill.svg";

const Banner = props => {
  return (
    <Container>
      <Container text>
        <Header style={ledeHeaderStyles} image={AppLogo} content="BillSplit" />
        <h2>
          <i>The best way to manage split payments.</i>
        </h2>
      </Container>
      <Button
        as={Link}
        style={buttonStyles}
        to={props.loggedIn ? "/bills/list" : "/auth"}
        onClick={props.onButtonClick}
        color="green"
        size="huge"
        animated
      >
        <Button.Content
          visible
          content={props.loggedIn ? "My Bills" : "Get Started"}
        />
        <Button.Content hidden>
          <Icon name="right arrow" />
        </Button.Content>
      </Button>
    </Container>
  );
};

Banner.propTypes = {
  loggedIn: PropTypes.bool,
  onButtonClick: PropTypes.func
};

const ledeHeaderStyles = {
  marginTop: "1em",
  marginBottom: "0em",
  fontSize: "5rem",
  fontWeight: "bold"
};

const buttonStyles = {
  marginTop: "1.5rem"
};

export default Banner;
