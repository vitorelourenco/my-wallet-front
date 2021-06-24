import axios from "axios";
import Config from "./Config";

export default function logOut(user, setUser, history) {
  if (user === null) return;
  const config = new Config(user.token);
  axios
    .post("http://localhost:4000/logout", {}, config)
    .catch((err) => alert(err))
    .finally(() => history.push("/login"));
  setUser(null);
  localStorage.clear();
}
