# LLM Wiki Pattern

The **LLM Wiki Pattern** is a method for building a personal knowledge base where an LLM incrementally maintains a structured collection of markdown files (the wiki) from raw sources.

## Core Principles

- **Persistent Artifact**: Unlike RAG, which re-derives knowledge on every query, the wiki is a compounding, interlinked codebase of knowledge.
- **LLM-Maintained**: The agent handles the "bookkeeping" (summarizing, cross-referencing, indexing) while the human focuses on curation and exploration.
- **Read -> Execute -> Update**: A mandatory loop for agents to ensure the wiki stays current.

## Architecture Layers

1.  **Raw Sources**: Immutable original documents (e.g., `raw/`).
2.  **The Wiki**: LLM-generated markdown synthesis (e.g., `.wiki/pages/`).
3.  **The Schema**: Configuration files (e.g., `AI.md`) that guide the agent's maintenance behavior.

## Key Operations

- **Ingest**: Processing a new source and updating multiple wiki pages.
- **Query**: Asking questions that result in new synthesis pages.
- **Lint**: Periodically checking for contradictions or gaps.

## Navigation Tools

- **index.md**: Content-oriented catalog.
- **log.md**: Chronological record of operations.

---
Source: [[llm-wiki.md]]
