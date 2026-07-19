// Shared mutable scroll state, written by GSAP ScrollTrigger (DOM side)
// and read every frame inside the R3F canvas. Kept as a plain module
// singleton so the canvas never re-renders on scroll.
export const scrollState = {
  // transitions[i] ∈ [0,1] — progress of section i+1 scrolling to the top
  // of the viewport. Their sum is a float "which section are we at".
  transitions: [0, 0, 0, 0, 0],
  sectionFloat: 0,
  // local progress inside the (tall) projects section, drives camera dolly
  projectsProgress: 0,
  mouse: { x: 0, y: 0 },
}

export const SECTION_COUNT = 6

// World-space anchor for each section's 3D scene. The camera path is a
// Catmull-Rom curve threaded through offsets of these points.
export const SECTION_POSITIONS = [
  [0, 0, 0],      // hero
  [6, 1, -24],    // about
  [-6, -1, -48],  // skills
  [5, 1, -72],    // projects
  [-5, 0, -96],   // journey (experience + education)
  [0, 0, -120],   // contact
]
