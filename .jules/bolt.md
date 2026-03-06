
## 2024-05-28 - Extracted Inline Components from DatabaseContent
**Learning:** Defining large components like `QuickSummary` and `SectionCard` inside `DatabaseContent` forces React to unmount and remount them on every render cycle of `DatabaseContent`. Since `DatabaseContent` renders tabs and section data, these re-renders can happen frequently, leading to unnecessary component creation overhead.
**Action:** Always extract inline components to the module scope (or standalone files). When they depend on the parent's data, pass that data via props. Use `React.memo` to skip re-renders if the props haven't changed.
