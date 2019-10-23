import Highway from "@dogstudio/highway";
import Fade from "./transition";


// Way we need to use for to start the transiton, renders etc...
const H = new Highway.Core({
  //evry page has a default transition of "Fade"
  transitions: {
    default: Fade
  }
});
