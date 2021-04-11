import { Container } from "react-bootstrap";

const AUTH_URL = `https://accounts.spotify.com/authorize`;
const SCOPES =
  "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state";
const CLIENT_ID = `6762e6c12aec4a749727163e05bf4c6a`;
const REDIRECT_URI = `http://localhost:3000`;
const StateString = `LoremIpsum`;
const url =
  AUTH_URL +
  `?client_id=${CLIENT_ID}&response_type=code&scope=${encodeURIComponent(
    SCOPES
  )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${StateString}`;

const Login = () => {
    console.log({url})
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={url} >Login wth Spotify</a>
    </Container>
  );
};

export default Login;
