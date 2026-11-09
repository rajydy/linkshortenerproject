# UI Components

- Build every user-facing UI element with shadcn/ui components. Do not create custom UI components or hand-build controls with raw HTML.
- Reuse the components in `src/components/ui`. If a needed component is missing, add the corresponding shadcn/ui component using this project's configured setup (`components.json`) rather than implementing a custom replacement.
- Do not introduce another component library. Keep UI styling consistent with the existing shadcn/ui and Tailwind setup.
