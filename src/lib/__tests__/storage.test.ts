import { getStorageItem as getItem, setStorageItem as setItem } from "@/lib/storage";
import { afterEach, beforeEach, describe, expect, test } from "@/lib/test";

type CircularType = {
  self?: CircularType;
};

describe("Storage Utility", () => {
  const mockKey = "test-key";
  const mockValue = { data: "test-value" };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  test("setItem should store data in localStorage", () => {
    setItem(mockKey, mockValue);
    const storedValue = JSON.parse(localStorage.getItem(mockKey) || "");
    expect(storedValue).toEqual(mockValue);
  });

  test("getItem should retrieve data from localStorage", () => {
    localStorage.setItem(mockKey, JSON.stringify(mockValue));
    const retrievedValue = getItem(mockKey);
    expect(retrievedValue).toEqual(mockValue);
  });

  test("getItem should return null for non-existent key", () => {
    const retrievedValue = getItem("non-existent-key");
    expect(retrievedValue).toBeNull();
  });

  test("removeItem should delete data from localStorage", () => {
    localStorage.setItem(mockKey, JSON.stringify(mockValue));
    localStorage.removeItem(mockKey);
    expect(localStorage.getItem(mockKey)).toBeNull();
  });

  test("setItem should handle invalid JSON gracefully", () => {
    const circularObj: CircularType = {};
    circularObj.self = circularObj;

    expect(() => setItem(mockKey, circularObj)).not.toThrow();
  });
});
