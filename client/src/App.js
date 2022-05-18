import React from 'react';
import SignIn from "./components/auth/Signin";

function App() {
  return (
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/album/:albumID" element={<Album />} />
        </Routes>
      </BaseLayout>
    </Router>
  )
}

export default App;
