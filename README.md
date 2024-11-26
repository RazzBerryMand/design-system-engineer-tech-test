# Immersive Labs Design System Engineer technical test

This is a working but unstyled application, the goal is for you to style it using an open source design system of your choice - there is no right or wrong choice but be prepared to explain why you chose it in the interview.

You are not expected to complete every requirement (but do try!) - we are not looking for perfection - the goal of the test is for us to get a feel for your approach and technical abilities and to help lead the conversation during the your follow-up interview.

If successful you will not be working with an off-the-shelf component library as in this test - you will be maintaining an in-house library designed to be used solely on our platform(s) and by our developers so we are more interested in your approach to applying (and enforcing) styles at the system level, although this isd a React app, consider how styles might be used in other environments.

We're not looking for a great looking app (but showing off your design skills would be a plus), we're more interested in seeing **how you approach creating a component-based architecture that enables developers to work at pace within the confines of a design system**.

You do not need to write tests but may be quizzed on how you would approach testing a design system later

## About the app

The app is a smart office app which Immersive staff can use to see what song is currently playing in the office, control the lights and open the front gates - see the wireframe below for a suggested layout to work towards.

> All the functionality is mocked, so don't expect music to play or lights to come on!

### Requirements

- You should use design tokens for things like colours, spacing, font styles etc. but how you implement them is up to you
- Each section should be displayed within a "card" and have consistent title styles, but bear in mind that in a real scenario card title may not all use the same semantic element
- Consider how the app and components will will adapt different screen sizes
- Accessibility will be a core part of your job at Immersive so this should be factored in where possible although we are aware that you don't have much time so feel free to use a light touch as you will have the opportunity to discuss accessibility during the face to face interview.
- Lights
  - Each room has one or many lights, these can be `on`, `off` or `unreachable`, if they are unreachable then the button should be disabled and you cannot toggle their on/off state. If it is reachable, it's on/off state should be reflected in the UI
  - Representing the light's brightness in the Ui would be nice
- Gates
  - The Open/Close button is the primary button, a secondary button displays options for latching the gate open for specific amounts of time (We have used a `select` element here but you a free to use or create something else, ideally it would look like a secondary button)
  - Clicking the Open/Close button toggles the gates' status from `open` to `closed` and vice versa - the current state should be reflected in the UI - for the sake of the test, you should presume that the gates close automatically after a set time but this functionality is not built into this mock app and you are not expected to add it.
- Alerts
  - There are three types of alert that can be displayed at the top of the app, the alert should be styled according to it's `alert.type`, you have access to icons if you want to use them via [this package](https://github.com/react-icons/react-icons)

[Link to wireframes](https://wireframe.cc/wfuUUw)

<img width="514" alt="Screenshot 2024-11-20 at 10 06 43" src="https://github.com/user-attachments/assets/94fa9fb0-1aa2-4d9f-b1e7-31d4520f7a70">

## Getting started

> First, fork the repo so that you can make your own edits.

This is a React 18 app running on Vite (it was bootstrapped with [the `npm create vite` command](https://vite.dev/guide/#scaffolding-your-first-vite-project)) and written in Typescript as that is the language we use, if you prefer to use Javascript then that's fine but you may need to strip the types from the code

To run it, run:

```bash
npm install
npm run dev
```

All the app's code is in `App.tsx`, the html used is just a placeholder and you are free to refactor as you please, the only requirement is that the Ui reflects the changes in data returned by the `useDummyData()` hook - this hook will update the data every 5 seconds unless you pass in `false` as a first argument or a time in milliseconds as a second argument - you shouldn't need to make changes to `useDummyData()` or `dummyData.ts` but can do if you feel the need.

```tsx
// Default behaviour, data updates every 5 seconds
const { music, rooms, alert } = useDummyData();

// Data does not update, reload the page to get new data
const { music, rooms, alert } = useDummyData(false);

// Data updates every 10 seconds
const { music, rooms, alert } = useDummyData(true, 10000);
```

## Submitting

There is no need to create a production build of the apo, we will run the dev build locally as above, please ensure your fork is public so that we can access and send a link to it to your contact at Immersive.

Once the interview process is over you should delete your fork

Thank you for you efforts and best of luck!
