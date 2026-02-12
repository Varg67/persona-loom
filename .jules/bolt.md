## 2024-05-23 - Eager Evaluation of Component Sections
**Learning:** Found a pattern where large JSX blocks are stored in an object `sections = { 0: (...), 1: (...) }`. This forces React to instantiate all sections on every render, even if only one is returned.
**Action:** Replace these object lookups with `switch` statements or conditional returns so only the active section is instantiated.
