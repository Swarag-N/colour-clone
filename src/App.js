import React, { Component } from "react";
import "./App.css";
// import { Route, Switch } from "react-router-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Palette from "./Palette/Palette";
import PaletteList from "./Palette/PaletteList";
import SingleColourPalette from "./Palette/SingleColourPalette";
import NewPaletteForm from "./Palette/NewPaletteForm";
import Page from "./Palette/Page";

import colours from "./seedColors";
import { generatePalette } from "./Palette/ColorHelper";
// import seedColors from './seedColors';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || colours,
    };
    this.savePalette = this.savePalette.bind(this);
    this.findPaletteById = this.findPaletteById.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  savePalette(newPalette) {
    this.setState(
      {
        palettes: [...this.state.palettes, newPalette],
      },
      this.syncLocalStorage
    );
  }

  deletePalette(id) {
    this.setState(
      (st) => ({
        palettes: st.palettes.filter((palette) => palette.id !== id),
      }),
      this.syncLocalStorage
    );
  }
  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }

  findPaletteById(id) {
    return this.state.palettes.find((palette) => {
      return palette.id === id;
    });
  }
  render() {
    return (
      <HashRouter basename="/">
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.pathname} classNames="page" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={(routeProps) => (
                    <Page>
                      <NewPaletteForm
                        {...routeProps}
                        savePalete={this.savePalette}
                        palettes={this.state.palettes}
                      />
                    </Page>
                  )}
                />

                <Route
                  exact
                  path="/palette/:paletteId/:colorID"
                  render={(routeProps) => (
                    <Page>
                      <SingleColourPalette
                        {...routeProps}
                        palette={generatePalette(
                          this.findPaletteById(
                            routeProps.match.params.paletteId
                          )
                        )}
                        colorId={routeProps.match.params.colorID}
                      />
                    </Page>
                  )}
                />

                <Route
                  exact
                  path="/palette/:id"
                  render={(routeProps) => (
                    <Page>
                      <Palette
                        palette={generatePalette(
                          this.findPaletteById(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />

                <Route
                  exact
                  path="/"
                  render={(routeProps) => (
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        {...routeProps}
                        deletePalette={this.deletePalette}
                      />
                    </Page>
                  )}
                />

                <Route
                  render={(routeProps) => (
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
      </HashRouter>
    );
  }
}

export default App;
