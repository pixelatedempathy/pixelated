// @vitest-environment jsdom
import { render, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs";
import React from "react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

describe("Tabs Component", () => {
  it("should have correct ARIA roles hierarchy", () => {
    // We expect the component to accept ...props so data-testid works
    const { getByTestId, getByRole } = render(
      <Tabs defaultValue="tab1" data-testid="tabs-root">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    // The root should NOT have role="tablist"
    const root = getByTestId("tabs-root");
    expect(root).not.toHaveAttribute("role", "tablist");

    // The list SHOULD have role="tablist"
    const list = getByRole("tablist");
    expect(list).toBeInTheDocument();
  });

  it("should support keyboard navigation", () => {
    const { getByRole } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>,
    );

    const tab1 = getByRole("tab", { name: "Tab 1" });
    const tab2 = getByRole("tab", { name: "Tab 2" });
    const tab3 = getByRole("tab", { name: "Tab 3" });

    // Focus first tab
    tab1.focus();
    expect(document.activeElement).toBe(tab1);

    // Arrow Right -> Tab 2
    fireEvent.keyDown(tab1, { key: "ArrowRight", code: "ArrowRight", bubbles: true });
    expect(document.activeElement).toBe(tab2);

    // Arrow Right -> Tab 3
    fireEvent.keyDown(tab2, { key: "ArrowRight", code: "ArrowRight", bubbles: true });
    expect(document.activeElement).toBe(tab3);

    // Arrow Right -> Loop to Tab 1
    fireEvent.keyDown(tab3, { key: "ArrowRight", code: "ArrowRight", bubbles: true });
    expect(document.activeElement).toBe(tab1);

    // Arrow Left -> Loop to Tab 3
    fireEvent.keyDown(tab1, { key: "ArrowLeft", code: "ArrowLeft", bubbles: true });
    expect(document.activeElement).toBe(tab3);

    // Home -> Tab 1
    fireEvent.keyDown(tab3, { key: "Home", code: "Home", bubbles: true });
    expect(document.activeElement).toBe(tab1);

    // End -> Tab 3
    fireEvent.keyDown(tab1, { key: "End", code: "End", bubbles: true });
    expect(document.activeElement).toBe(tab3);
  });
});
