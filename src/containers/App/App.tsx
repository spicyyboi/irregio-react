import * as React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Navigation from "../../ui/navi/navigation";
import Layout from "../../ui/layout/layout";

import PhrasalVerbsEn from "../../containers/PhrasalVerbs/PhrasalVerbsEn/PhrasalVerbsEn";
import Languages from "../../components/Languages/Languages";
import Home from "../../components/Home/Home";

import IrregularVerbs from "../../containers/IrregularVerbs/IrregularVerbs";

import { injectGlobal } from "../../theme/styled-components";
import CourseList from "../../components/CoursesList/CoursesList";

injectGlobal`*{ 
  margin:0;
  padding:0;
}
  body{
  font-family: "brandon-grotesque", "Brandon Grotesque", "Source Sans Pro", "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
  text-rendering: optimizeLegibility;
  background: #56ccf2; 
  background: -webkit-linear-gradient(to right, #56ccf2, #2f80ed); 
  background: linear-gradient(to right, #56ccf2, #2f80ed); 
} 

.fade-enter {
  opacity: 0;
  z-index: 1;
}
.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 250ms ease-in;
}
.fade-exit{
  opacity:1;
}
.fade-exit.fade-exit-active{
  opacity:0;
  transition:all 400ms;
}
`;

type IProps = RouteComponentProps;
class App extends React.Component<IProps, {}> {
  public render() {
    return (
      <React.Fragment>
        <Navigation language={"en"} />

        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames="fade"
          >
            <Switch location={this.props.location}>
              <Route
                path="/phrasals"
                render={() => {
                  return (
                    <Layout>
                      <PhrasalVerbsEn />
                    </Layout>
                  );
                }}
              />
              <Route
                path="/verbs"
                render={() => {
                  return (
                    <Layout>
                      <IrregularVerbs />
                    </Layout>
                  );
                }}
              />
              <Route
                path="/supported-languages"
                render={() => {
                  return (
                    <Layout>
                      <Languages />
                    </Layout>
                  );
                }}
              />
              <Route
                path="/"
                exact={true}
                render={() => {
                  return (
                    <Layout>
                      <Home />
                    </Layout>
                  );
                }}
              />
              <Route
                path="/courses"
                exact={true}
                render={() => {
                  return <CourseList />;
                }}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
