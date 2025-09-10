# Pixelated Empathy Simulator: Starting Point & Sprint 1

## 🎯 Vision & Aim

The soul of Pixelated Empathy is an AI-powered therapist training simulator. The MVP should:
- Enable a therapist to interact with a simulated client (AI or mock agent)
- Track session context, conversation history, and user preferences
- Provide a foundation for bias detection, evaluation, and future LLM upgrades

This approach delivers immediate value, rapid iteration, and a modular base for expansion.

---

## 🏗️ Technical Scaffold

### 1. Frontend Session Component
- Create a new page/component (e.g., `src/pages/TrainingSession.tsx`)
- Use `useConversationMemory` to manage session state
- UI: Therapist sees a client message, responds, and gets feedback

### 2. Backend API Endpoint
- Add a simple API route (e.g., `/api/mock-client-response`)
- Returns mock agent responses (static or from a small dataset)

### 3. Memory Integration
- Wire up memory hooks so each session is tracked
- Store therapist actions for later evaluation

### 4. Basic Evaluation Logic
- Add placeholder evaluation (e.g., "Did the therapist ask about risk?")

---

## 📋 Sprint 1 Tasks

- [ ] Scaffold `TrainingSession.tsx` with basic UI and session loop
- [ ] Implement `/api/mock-client-response` endpoint
- [ ] Integrate `useConversationMemory` for session state
- [ ] Store therapist actions and session context
- [ ] Add basic evaluation feedback
- [ ] Link to bias detection and evaluation modules for future expansion
- [ ] Document learnings and edge cases

---

## 🔗 Related Planning Files
- [Principles & Mission](./principles.md)
- [Implementation Plan](./plan.md)
- [Technical Architecture](./architecture.md)
- [Risk Analysis](./risk-analysis.md)
- [Knowledge Synthesis](./knowledge.md)
- [Ideas & Strategies](./ideas.md)

---

## 📝 Summary

This starting point enables rapid prototyping and validation of the core therapist training loop. It leverages the existing memory system and modular hooks, and sets the stage for bias detection, evaluation, and LLM upgrades. All technical and strategic context is linked above for the VoidBeastMode agent to begin work.
