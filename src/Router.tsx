import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "pages/Home/Home";
import Game from "pages/Game/Game";
import Leaderboard from "components/Leaderboard/Leaderboard";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/game/:gameId",
    element: <Game />,
  },
  // { path: "/game/:gameId/leaderboard", element: <Leaderboard /> },
]);

export default function Router() {
  return <RouterProvider router={router}></RouterProvider>;
}
