/* eslint-disable no-unused-vars */
import Navbar from "./components/navbar";
import ForumPostForm from "./components/forumPostForm";
import ForumPost from "./components/forumPost";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginPage from "./components/loginPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ForumPost />} />
          <Route path="/createPost" element={<ForumPostForm />} />
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </Router>

      {/* <ForumPostForm />
      <ForumPost /> */}
    </>
  );
}

export default App;
