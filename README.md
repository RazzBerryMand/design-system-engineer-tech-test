# Immersive Labs Smart Office App - Styled with Chakra UI

This project is a React-based smart office application where Immersive Labs staff can interact with features such as music, lights, and gates. My task was to implement styling for the app, using a component-based approach with a design system, and to ensure the app is responsive, accessible, and easy to extend.

## Task Approach

### UI Inventory and Initial Research

My first step was to conduct a UI inventory to understand the structure of the app and identify reusable components. This inventory helped me determine what elements were already present in the code, what needed styling, and which components aligned with the design system. I documented the findings on Miro ([view here](https://miro.com/app/board/uXjVL-eISu8=/)) to visualize and organize the necessary UI elements.

### Choice of Design System

I chose to style the app using Chakra UI ([check it out here](https://www.chakra-ui.com/)), a component library I had not worked with before. I wanted to demonstrate my ability to quickly learn new tools and apply them effectively to meet project requirements.

Chakra UI offered several advantages:

- Comprehensive Component Library: Chakra UI provided all the components I needed based on my UI inventory (e.g., cards, buttons, form elements).
- Customizable Tokens: Chakra's design tokens (such as colors, typography, and spacing) were easy to configure and adapt to the needs of the app.
- Built-in Accessibility: Chakra UI emphasizes accessibility by default, which aligns with the project’s focus on making the app usable for all users.
- Responsive Design: Chakra makes building responsive UIs straightforward using its built-in breakpoints and layout components.

### Commit Strategy: Micro Commits with Gitmoji

I committed my work using a micro-commit approach, where each commit represents a small, logical change. This was done to maintain clarity and traceability in the development process. For consistency, I used Gitmoji ([check it out here](https://gitmoji.dev/)) to provide a visual representation of each commit type, making it easier to understand the nature of the changes at a glance.

## How to Run the Project

```bash
npm install
npm run dev
```

## Things to Note

- I used the default Chakra UI theme for the application, as I find the light color scheme visually appealing (I personally prefer light mode for all my applications).
- To ensure usability, I conducted user testing with my partner, who is a non-technical user, to validate the ease of understanding and navigation.

## If Given More Time

- I would extract the card components from `App.tsx` to improve modularity and maintainability.
- Implement tests using React Testing Library to ensure the app functions as expected.
- Customize the theme tokens and potentially introduce a toggle between light and dark modes for improved user customization.
