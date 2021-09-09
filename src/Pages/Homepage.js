import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Logout } from "../Redux/Actions/AuthActions";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch();

  return (
    <Box>
      <Link to={"/"} onClick={() => dispatch(Logout())}>
        {"Logout"}
      </Link>
    </Box>
  );
}
