
export function calculateDimensions(reference, proportion) {
  let width = document.querySelector(reference.width).offsetWidth;
  let height = document.querySelector(reference.height).offsetHeight;
  let frame = {};

  if(width > height) { /* Landscape */
    if(height < 500) /* min-height:*/
      height = 600;
    frame = { width: height, height: height };
  } else { /* Portrait */
    frame = { width: width, height: height * .8 };
    if(width < 500 ) { /* Mobile */
      frame.width -= 15;
    } else { /* Wide */
      frame.width *= .8;
    }
  }

  if(proportion.width) frame.width *= proportion.width;
  if(proportion.height) frame.height *= proportion.height;

  if(proportion.wide)
    frame.width = width;

  return frame;
}
