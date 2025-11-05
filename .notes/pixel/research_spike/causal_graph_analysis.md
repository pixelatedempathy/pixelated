# Analysis of Causal Graph Sourcing

This document investigates and proposes methods for learning or defining the causal graph structure required by the `CausalEmotionGraph` module.

## The Core Challenge

The `CausalEmotionGraph` module is a powerful tool for reasoning, but it is useless without a high-quality causal graph to operate on. The primary challenge is to derive this graph from conversational data. Raw text is unstructured, whereas causal discovery algorithms require structured input.

Based on research, two primary approaches are viable for our context.

---

### Method 1: Granger Causality on Emotional Time Series

-   **Description:** This approach treats a conversation as a time series of emotional states. We would first need to run our production pipeline on a large corpus of conversations to generate a sequence of emotion vectors for each turn. We can then apply Granger Causality to determine if the presence of one emotion at time `t` improves the prediction of another emotion at time `t+1`.
-   **Pros:**
    -   It is a well-established, standard statistical method.
    -   It directly leverages the temporal nature of conversations.
    -   Libraries like `statsmodels` provide robust implementations.
-   **Cons:**
    -   Granger causality identifies *predictive* relationships, not necessarily true, deep causal links. It can be fooled by hidden confounders.
    -   Requires a large, pre-processed dataset of emotional time series before the graph can be built.

### Method 2: LLM-Powered Cause-and-Effect Extraction

-   **Description:** This modern approach leverages the reasoning capabilities of Large Language Models (LLMs). The workflow would be:
    1.  **Causal Sentence Detection:** Use an LLM to scan conversational text and identify sentences that likely contain a causal relationship (e.g., "I am anxious *because* I have a deadline.").
    2.  **Cause/Effect Extraction:** For each causal sentence, use the LLM with a structured prompt to extract the specific cause and effect phrases.
    3.  **Entity Normalization:** Use the LLM to normalize the extracted phrases into a canonical set of emotions (e.g., mapping "I have a deadline" to the concept of "Work Pressure").
    4.  **Graph Construction:** Build the graph from the normalized entities and their causal links.
-   **Pros:**
    -   Can uncover more nuanced and implicit causal relationships that statistical methods might miss.
    -   Does not require a pre-built time series dataset; can work directly on raw text.
    -   Aligns with the latest advancements in NLP.
-   **Cons:**
    -   The quality of the graph is highly dependent on the reasoning capabilities and potential biases of the chosen LLM.
    -   Can be more computationally expensive and may require significant prompt engineering to get reliable results.

## Recommendation

A hybrid approach is recommended:

1.  Use the **LLM-Powered Extraction (Method 2)** to generate an initial, rich causal graph.
2.  Use **Granger Causality (Method 1)** on a time-series dataset to validate and prune the edges of the LLM-generated graph.

This combines the nuanced reasoning of LLMs with the statistical rigor of established time-series methods, likely producing the most robust and useful causal graph.
