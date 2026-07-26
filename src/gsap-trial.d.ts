/**
 * Type declarations for gsap-trial modules.
 * The trial version of GSAP includes ScrollSmoother and SplitText
 * which are not in the main GSAP package types.
 */

declare module "gsap-trial/ScrollSmoother" {
  import { ScrollSmoother } from "gsap/ScrollSmoother";
  export { ScrollSmoother };
  export default ScrollSmoother;
}

declare module "gsap-trial/SplitText" {
  import { SplitText } from "gsap/SplitText";
  export { SplitText };
  export default SplitText;
}
