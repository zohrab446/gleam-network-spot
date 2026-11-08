import { describe, expect, it } from "vitest";
import { CommunityAction, PostInput } from "./community-schema";
describe("community validation", () => {
  it("rejects a forged post identity", () => { expect(CommunityAction.safeParse({ action: "comment", postId: "fake", body: "Test" }).success).toBe(false); });
  it("only supports catalog categories", () => { expect(PostInput.safeParse({ category: "admin", title: "Test title", body: "Test content here", tags: [] }).success).toBe(false); });
  it("rejects empty comments", () => { expect(CommunityAction.safeParse({ action: "comment", postId: "3c338d84-98ce-4f01-a645-27ccabb52fb6", body: " " }).success).toBe(false); });
  it("rejects fabricated event identities", () => { expect(CommunityAction.safeParse({ action: "register", eventId: "fake", active: true }).success).toBe(false); });
});