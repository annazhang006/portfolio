# Anna Zhang — Portfolio

## Run it locally

npm install
npm run dev

Then open the local URL it prints (usually http://localhost:5173).

## Slow down the hero rotation

Open `src/components/Hero3D.jsx` and change this line near the top:

  const ROTATION_SPEED = 0.08

Lower it (e.g. 0.03) for a slower spin, raise it for faster. The mouse
reaction easing is the two `0.03` values inside the `useFrame` callback —
smaller = lazier, more delayed follow.

## Notes

- The 3D hero is lazy-loaded and pauses its render loop entirely when the
  browser tab is hidden (see the visibilitychange listener in Hero3D.jsx),
  so it doesn't burn battery in the background.
- Swap the resume link in App.jsx (`/Anna_Zhang_Resume.pdf`) once you drop
  your resume PDF into the `public/` folder.
- Update the email/LinkedIn in the contact section and footer year handles itself.
