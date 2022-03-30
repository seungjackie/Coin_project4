import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { startInit } from "./reducer/modules/coinReducer";
import loadable from '@loadable/component';
// import AppLayout from './Components/common/AppLayout';
// import MainRouter from "./components/Router/MainRouter";
import Auth from './lib/utils/auth';


// import Main from "./Pages/Main";
// import Intro from "./Pages/Intro";
// import Login from "./Pages/Login";
// import Join from "./Pages/Join";
// import Book from "./Pages/Book";
// import Mypage from "./Pages/Mypage";
// import Explorer from "./Pages/Explorer";

const Main = loadable(() => import('./Pages/Main'));
const Intro = loadable(() => import('./Pages/Intro'));
const Login = loadable(() => import('./Pages/Login'));
const Join = loadable(() => import('./Pages/Join'));
const Book = loadable(() => import('./Pages/Book'));
const Mypage = loadable(() => import('./Pages/Mypage'));
const Explorer = loadable(() => import('./Pages/Explorer'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startInit());
  }, [dispatch]);

  return (
    // <MainRouter />
    <Router>
      <Suspense fallback={<div>...loading</div>}>
        <Switch>
          {/* <Route exact path="/" component={Auth(Main, false)} />
            <Route exact path="/login" component={Auth(Login, false)} />
            <Route exact path="/register" component={Auth(Register, false)} />
            <Route exact path="/home" component={Auth(Main, true)} /> */}
          <Route exact path="/" component={Intro} />
          <Route exact path="/trade" component={Auth(Main, false)} />
          <Route exact path="/home" component={Auth(Main, true)} />
          <Route exact path="/intro" component={Auth(Intro, false)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/join" component={Auth(Join, false)} />
          <Route exact path="/book" component={Auth(Book, false)} />
          <Route exact path="/mypage" component={Auth(Mypage, true)} />
          <Route exact path="/explorer" component={Auth(Explorer, false)} />
          {/* <Route exact path="/board" component={Auth(Board, true)} />
                  <Route
                    exact
                    path="/board/:boardId"
                    component={Auth(BoardDetail, true)}
                  />
                  <Route path="/mypage" component={Auth(MyPage, true)} /> */}
        </Switch>
      </Suspense>
    </Router>

  );
}

export default App;
