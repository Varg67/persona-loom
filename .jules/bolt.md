## 2026-02-08 - Render Optimization for Large Components
**Learning:** React components that eagerly create large virtual DOM trees for hidden content (like inactive tabs) cause significant performance degradation.
**Action:** Use conditional rendering (e.g., `switch` statements or `if` blocks) to ensure only the active content is instantiated.
