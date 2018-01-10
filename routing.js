/dashboard
/dashboard/profile
/dashboard/privacy
/dashboard/cool-stuff
/upcoming-events
/friends

| Dashboard | Upcoming EVents | Friends |


| Dashboard | Upcoming EVents | Friends |
 ___________
 | Profile | Privacy | Cool-Stuff |
  ________
<Route exact path="/dashboard" component={DashboardIndex}/>
<Route exact path="/dashboard/profile" component={DashboardProfile}/>
<Route exact path="/dashboard/privacy" component={DashboardPrivacy}/>

DashboardIndex = () => {
  return <div>
    <Link to="/dashboard/profile">
    <Link to="/dashboard/privacy">
  </div>
}

DashboardProfile = () => {
  return <div>
    <Link to="/dashboard/profile">
    <Link to="/dashboard/privacy">
    <div>
      PRofile INformation
    </div>
  </div>
}

DashboardPrivacy = () => {
  return <div>
    <Link to="/dashboard/profile">
    <Link to="/dashboard/privacy">
    <div>
      Privacy Info
    </div>
  </div>
}


-----------

<Router>
  <Main>
    <Route path="/dashboard" component={DashboardIndex}/>
  </Main>
</Router>

<DashboardIndex/> <= lost, sad, and alone :(

DashboardIndex = () => {
  return <div>
    <Link to="/dashboard/profile">
    <Link to="/dashboard/privacy">
    <Route exact path="/dashboard/profile" component={DashboardProfile}/>
    <Route exact path="/dashboard/privacy" component={DashboardPrivacy}/>
  </div>
}

DashboardProfile = () => {
  return <div>
    PRofile INformation
  </div>
}

DashboardPrivacy = () => {
  return <div>
    Privacy Info
  </div>
}



