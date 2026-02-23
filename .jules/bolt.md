## 2024-05-23 - Monolithic Components Anti-Pattern
**Learning:** Large components like `DatabaseContent` defining child components (`QuickSummary`, `SectionCard`) inside their render body cause significant performance issues due to re-creation on every render.
**Action:** Always define components at the module scope. If they need access to parent state, pass it via props.
