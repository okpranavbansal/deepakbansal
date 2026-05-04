# LLM Wiki Agent Instructions

You are an AI agent maintaining this personal knowledge base. Follow this **Read -> Execute -> Update** loop for every task.

## The Loop

1.  **Read First**: Before starting any task, you MUST read:
    *   `.wiki/index.md` to understand the current state of the wiki.
    *   Any relevant pages in `.wiki/pages/` related to the task.
2.  **Execute**: Perform the requested task (coding, analysis, research).
3.  **Update Wiki**: After completion, you MUST:
    *   Update relevant pages in `.wiki/pages/` with new information.
    *   Update `.wiki/index.md` if new pages were created or summaries changed.
    *   Append a chronological entry to `.wiki/log.md`.

## Wiki Structure

*   `raw/`: Source documents (articles, papers, transcripts). These are immutable.
*   `.wiki/pages/`: LLM-generated markdown files for entities, concepts, and syntheses.
*   `.wiki/index.md`: Content-oriented catalog of all wiki pages.
*   `.wiki/log.md`: Chronological log of operations (e.g., `## [2026-05-04] ingest | Source Name`).

## Guidelines

*   **Compounding Artifact**: The wiki is a persistent synthesis. Don't just summarize; integrate new knowledge with existing pages.
*   **Cross-Link**: Use `[[Page Name]]` syntax for interlinking between wiki pages.
*   **Maintenance**: Periodically check for contradictions, stale info, or missing links.
