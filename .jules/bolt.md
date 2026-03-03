
## 2024-05-30 - DatabaseContent Component Recreation Anti-Pattern
**Learning:** Defining large components like `QuickSummary` and `SectionCard` and recursive helper functions like `countSectionFields` and `getFilledFields` inline inside the `DatabaseContent` component's body causes them to be re-created on every render, severely degrading performance. Additionally, inline components cannot effectively leverage `React.memo`.
**Action:** Extract inline components and static helper functions to the module scope. Wrap the extracted components in `React.memo` where appropriate and pass data via props instead of relying on closures. Use `React.useCallback` for event handlers passed as props and `React.useMemo` for expensive computations.
