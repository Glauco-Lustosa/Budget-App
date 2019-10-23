import Highway from "@dogstudio/highway";
import { Timeline, TimelineLite } from "gsap";

// this is for use transition from highway
class Fade extends Highway.Transition {
  // Page is comming in
  // from --> index.html , to --> were we gonna to , done --> function to say that this animation is finished
  in({ from, to, done }) {
    // create a new tineline object
    const tl = new TimelineLite();

    //to --> the container is comming in , 0.5 --> is the duration of animation, { left: "-100%" --> out of screen, top: "50%" } --> start from left and top. { left: "0%" } --> tell were to go the animation.
    tl.fromTo(to, 0.5, { left: "-100%", top: "50%" }, { left: "0%" })
      .fromTo(
        to,
        0.5,
        { height: "2vh" },
        {
          height: "100vh",
          top: "5%",
          onComplete: function() {
            // remove the container
            from.remove();
            done();
          }
        }
      )
      // remove the first children the home-content , removes and put de opacity
      .fromTo(to.children[0], 2, { opacity: 0 }, { opacity: 1 });
  }

  out({ from, done }) {
    done();
  }
}
// we need to export to let it know what to use.
export default Fade;
