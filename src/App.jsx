import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import LoginButton from "./components/LoginButton";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginButton />} />
        </Routes>
    );
}

export default App;
