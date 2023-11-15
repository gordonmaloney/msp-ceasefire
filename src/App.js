
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Landing } from "./Landing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
