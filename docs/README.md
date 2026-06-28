# Developer Documentation Hub

Welcome to the central documentation index. Use the structured paths below to navigate our development, contract architecture, and testing ecosystems.

---

## 🗺️ Core Architecture & Framework Tracks

### 🏗️ Blockchain & Smart Contracts
* **[Soroban Smart Contracts](./soroban/README.md):** Architectural patterns, state structures, and runtime configuration parameters.
* **[Snapshot Approval Guide](./reviewers/soroban-snapshot-guide.md):** Structural checklist for reviewers evaluating footprints and ledger storage snapshots.
* **[Contract Testing Matrix](./contributors/contract-testing.md):** Local execution guides, test coverage requirements, and fixture specifications.

### 💻 Frontend & Application Layer
* **[Wallet Interception Hooks](./frontend/wallet-context.md):** Deep dives into context mappings, multi-wallet providers, and connection failure handling rules.
* **[Real-time Events Subscriptions](./backend/realtime-events.md):** WebSocket tracking routes, connection rooms, and JWT gateway authentication.

---

## 🚀 Contributor Lifecycle Shortcuts
* **[Onboarding Path](./contributors/onboarding.md):** Quickstart development setup instructions for new engineers.
* **[CI/CD Assurance Gates](../.github/workflows/README.md):** Specifications on unit testing passes and the headless Lighthouse automated performance audit pipelines.


# Anchor Core Identity Backend & Frontend Workspace

Enterprise-grade escrow settlement layer powered by the Stellar/Soroban network engine.

## 🛠️ Quickstart Ecosystem Guides

To skip direct repo configuration bottlenecks and access our onboarding tracks, step directly into our documentation architecture hubs:

* **[Developer Documentation Index](./docs/README.md):** Master index for all architecture specs, APIs, and directory trees.
* **[Local Setup Guide](./docs/contributors/onboarding.md):** Native component compiler dependencies, database seeding parameters, and environment orchestration rules.
* **[Soroban Contract Verification Guide](./docs/reviewers/soroban-snapshot-guide.md):** Explicit structural parameters governing pull request approvals for ledger footprints.

---

## ⚙️ Baseline System Verification Run

Ensure your environmental checkout maps correctly to validation tests by triggering cross-workspace scripts:

```bash
# Execute full system workspace automated verification testing suites
npm run test:all