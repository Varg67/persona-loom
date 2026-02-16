## 2026-02-16 - Eager Tab Evaluation Anti-Pattern
**Learning:** The `DatabaseContent` component was using an object literal (`subtabContent = { ... }`) to define tab content. This caused React to eagerly evaluate the JSX for *all* tabs on every render, including expensive calculations in hidden tabs (like recursive field counting in the "Statistics" tab), significantly impacting performance.
**Action:** Always use conditional rendering (e.g., `switch` statements or short-circuit evaluation) for tab content to ensure only the active tab's component tree is created.
