import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "../Pages/Main";
import Intro from "../Pages/Intro";
import Login from "../Pages/Login";
import Join from "../Pages/Join";
import Book from "../Pages/Book";
import Mypage from "../Pages/Mypage";
import Explorer from "../Pages/Explorer";



const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Intro} />
      <Route exact path="/trade" component={Main} />
      <Route exact path="/intro" component={Intro} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/join" component={Join} />
      <Route exact path="/book" component={Book} />
      <Route exact path="/mypage" component={Mypage} />
      <Route exact path="/explorer" component={Explorer} />

    </Switch>
  );
};

export default MainRouter;
