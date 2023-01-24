import { PostCode } from "./PostCode";
import { Tweetr } from "./Tweetr";
import { NewCampaign } from "./NewCampaign";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<PostCode />} />
          <Route path="/:hashtag/:template" element={<PostCode />} />
        <Route path='/newcampaign' element={<NewCampaign />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
