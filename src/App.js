import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Sidebar, Header, Login, Users, DialogPage, News, PostPage, Home, Profile
} from './components'



function App() {

  const [activeSidebar, setActiveSidebar] = useState(false);

  return (
    <div className={`network ${activeSidebar ? "active-sidebar" : "no-active-sidebar"}`}>
      <Header activeSidebar={activeSidebar} setActiveSidebar={setActiveSidebar} />
      <Sidebar setActiveSidebar={setActiveSidebar} />
      <main className="main">
        <Switch>
          <Route path="/dialog/:userId?" render={() => <DialogPage />} />
          <Route path="/profile" render={() => <Profile />} />
          <Route path="/news" render={() => <News />} />
          <Route path="/post/:id?" render={() => <PostPage />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/users" render={() => <Users />} />
          <Route path="/" render={() => <Home />} />
        </Switch>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
