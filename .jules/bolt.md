## 2024-05-22 - [Pattern: Conditional Rendering for Tab Content]
**Learning:** The codebase uses monolithic components where tab content is often defined in a map/object, causing eager evaluation of all tabs (and their heavy sub-trees) on every render.
**Action:** Refactor to use `switch` statements or conditional returns to ensure only the active tab's component tree is created.
