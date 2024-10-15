import { useNavigate } from "react-router-dom";

export function Navigator() {
  const navigate = useNavigate();

  const goToRoute = (path) => {
    navigate(path);
  };

  return goToRoute;
}
