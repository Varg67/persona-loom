## 2024-05-23 - Eager Evaluation of React Subtabs
**Learning:** In `DatabaseContent` (and other tabbed components), defining all subtabs' JSX content in an object map (`const content = { 0: <Comp1/>, 1: <Comp2/> }`) causes React to instantiate *all* components on every render, even if only one is returned. This is a significant performance anti-pattern for heavy components.
**Action:** Use conditional rendering (e.g., `switch` statement or `if` blocks) to ensure only the active tab's JSX is created.
