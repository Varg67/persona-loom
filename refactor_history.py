import re

with open('persona-loom-v4-expanded.jsx', 'r') as f:
    content = f.read()

# Pattern for HistoryContent
pattern = r'(const HistoryContent = \(\{ data, updateData, subtab, characterAge \}\) => \{)([\s\S]*?)(return sections\[subtab\] \|\| sections\[0\];\s*\};)'
match = re.search(pattern, content)

if match:
    header = match.group(1)
    body = match.group(2)
    footer = match.group(3)

    # 1. Extract LIFE_PHASES
    lp_pattern = r'(const LIFE_PHASES = \[[\s\S]*?\];\s*)'
    lp_match = re.search(lp_pattern, body)
    life_phases = lp_match.group(1) if lp_match else ""

    # 2. Extract getPhaseStatus
    gps_pattern = r'(const getPhaseStatus = \(phase\) => \{[\s\S]*?\};\s*)'
    gps_match = re.search(gps_pattern, body)
    get_phase_status = gps_match.group(1) if gps_match else ""

    # Update getPhaseStatus signature and usage of age
    if get_phase_status:
        get_phase_status = get_phase_status.replace("(phase) =>", "(phase, age) =>")
        # Body already uses 'age', so passing it as arg shadows it correctly if passed

    # 3. Extract LockedPhaseIndicator
    lpi_pattern = r'(const LockedPhaseIndicator = \(\{ phase \}\) => \([\s\S]*?\);\s*)'
    lpi_match = re.search(lpi_pattern, body)
    locked_phase_indicator = lpi_match.group(1) if lpi_match else ""

    if locked_phase_indicator:
        locked_phase_indicator = locked_phase_indicator.replace("({ phase })", "({ phase, age })")

    # 4. Extract PhaseStatusBadge
    psb_pattern = r'(const PhaseStatusBadge = \(\{ phase \}\) => \{[\s\S]*?return \(\s*<span[\s\S]*?span>\s*\);\s*\};\s*)'
    psb_match = re.search(psb_pattern, body)
    phase_status_badge = psb_match.group(1) if psb_match else ""

    if phase_status_badge:
        phase_status_badge = phase_status_badge.replace("({ phase })", "({ phase, age })")
        phase_status_badge = phase_status_badge.replace("getPhaseStatus(phase)", "getPhaseStatus(phase, age)")

    # Remove from body
    new_body = body
    if life_phases: new_body = new_body.replace(life_phases, "")
    if get_phase_status: new_body = new_body.replace(gps_match.group(1), "") # Remove original
    if locked_phase_indicator: new_body = new_body.replace(lpi_match.group(1), "")
    if phase_status_badge: new_body = new_body.replace(psb_match.group(1), "")

    # Update usages in body
    # getPhaseStatus(phase) -> getPhaseStatus(phase, age)
    new_body = new_body.replace("getPhaseStatus(phase)", "getPhaseStatus(phase, age)")

    # <LockedPhaseIndicator phase={LIFE_PHASES[0]} /> -> <LockedPhaseIndicator phase={LIFE_PHASES[0]} age={age} />
    # Use regex for components
    new_body = re.sub(r'<LockedPhaseIndicator phase=\{([^}]+)\} />', r'<LockedPhaseIndicator phase={\1} age={age} />', new_body)

    # <PhaseStatusBadge phase={LIFE_PHASES[0]} />
    new_body = re.sub(r'<PhaseStatusBadge phase=\{([^}]+)\} />', r'<PhaseStatusBadge phase={\1} age={age} />', new_body)

    # Also in the map
    # {LIFE_PHASES.map(phase => {
    #   const status = getPhaseStatus(phase);
    # ...
    # <PhaseStatusBadge phase={phase} />? No, distinct usage.

    # There is a loop:
    # {LIFE_PHASES.map(phase => {
    #           const status = getPhaseStatus(phase);

    # Also: <PhaseStatusBadge phase={LIFE_PHASES[0]} />

    # Construct new component
    extracted = f"{life_phases}{get_phase_status}{locked_phase_indicator}{phase_status_badge}"
    new_component = f"{extracted}{header}{new_body}{footer}"

    content = content.replace(match.group(0), new_component)

    with open('persona-loom-v4-expanded.jsx', 'w') as f:
        f.write(content)
    print("Successfully refactored HistoryContent")
else:
    print("Could not find HistoryContent")
