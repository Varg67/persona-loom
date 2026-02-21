## 2024-05-23 - Eager Evaluation in Component Maps
**Learning:** Defining tab content in a map object (e.g., `const sections = { 0: <Component />, ... }`) causes all components in the map to be instantiated and rendered (even if not mounted to DOM) on every parent render. This is a significant performance bottleneck for large components like `IdentityContent`.
**Action:** Use a `switch` statement or conditional rendering (e.g., `if (tab === 0) return <Component />`) to ensure only the active tab's content is instantiated.
