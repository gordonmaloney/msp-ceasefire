import { PostCode } from "./PostCode";
import { Tweetr } from "./Tweetr";
import { NewCampaign } from "./NewCampaign";
import { Header } from "./Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Shortlinker } from "./Shortlinker";
import { Redirector } from "./Redirector";
import { EmailCampaign } from "./EmailCampaign";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
        <Route path="/" element={<PostCode />} />

          <Route path="/:campaign" element={<Redirector />} />

          <Route path="/:target/:hashtag/:template" element={<PostCode />} />
          <Route path="/newcampaign" element={<NewCampaign />} />

          <Route path="email" element={<EmailCampaign />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
