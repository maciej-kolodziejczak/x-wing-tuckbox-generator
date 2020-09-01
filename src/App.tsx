import React from "react";
import { SpaceTour } from "./components/SpaceTour/SpaceTour";
import { PageContainer } from "./components/PageContainer/PageContainer";
import { Ruler } from "./components/Ruler/Ruler";
import { Header } from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import { MainView } from "./components/MainView/MainView";
import { Footer } from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PageContainer>
          <Header />
          <Ruler orientation="horizontal" spacing="bottom"></Ruler>
          <MainView />
          <Footer />
        </PageContainer>
        <SpaceTour />
      </div>
    </BrowserRouter>
  );
}

export default App;
