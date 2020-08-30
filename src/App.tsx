import React from "react";
import { SpaceTour } from "./components/SpaceTour/SpaceTour";
import { PageContainer } from "./components/PageContainer/PageContainer";
import { Ruler } from "./components/Ruler/Ruler";
import { CustomSelect } from "./components/CustomSelect/CustomSelect";
import { Header } from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import { MainView } from "./components/MainView/MainView";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PageContainer>
          <Header />
          <Ruler orientation="horizontal" spacing="bottom"></Ruler>
          <MainView />
        </PageContainer>
        <SpaceTour />
      </div>
    </BrowserRouter>
  );
}

export default App;
