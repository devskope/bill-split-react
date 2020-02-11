import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Banner from "../../components/home/Banner";
import { stateContext } from "../../store";

const Home = props => {
  const history = useHistory();

  const {
    state: {
      auth: { loggedIn }
    }
  } = useContext(stateContext);

  const handleBannerButtonClick = () => {
    if (loggedIn) authRedirect();
  };
  const authRedirect = () => {
    history.push("/bills/list");
  };

  return (
    <div>
      <Banner loggedIn={loggedIn} onButtonClick={handleBannerButtonClick} />
    </div>
  );
};

export default Home;
