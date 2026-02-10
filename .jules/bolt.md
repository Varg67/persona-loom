## 2024-05-23 - Eager Evaluation of Tab Content
**Learning:** Defining a map of components inside a render function causes all of them to be instantiated on every render, even if only one is returned. This is especially costly for large forms with controlled inputs.
**Action:** Use conditional rendering (if/switch) or lazy evaluation to instantiate only the active component.
