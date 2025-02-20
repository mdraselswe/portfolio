import { ThemeContext, ThemeProvider } from "@/contexts/ThemeContext";
import { useContext } from "@/lib";
import { fireEvent, render, screen } from "@/lib/test";

const TestComponent = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  const { theme, toggleTheme } = context;
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme} data-testid="theme-toggle">
        Toggle Theme
      </button>
    </div>
  );
};

describe("ThemeContext", () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("provides initial theme value", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeValue = screen.getByTestId("theme-value");
    expect(themeValue.textContent).toBe("light");
  });

  test("toggles theme when button is clicked", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeValue = screen.getByTestId("theme-value");
    const toggleButton = screen.getByTestId("theme-toggle");

    expect(themeValue.textContent).toBe("light");

    fireEvent.click(toggleButton);
    expect(themeValue.textContent).toBe("dark");

    fireEvent.click(toggleButton);
    expect(themeValue.textContent).toBe("light");
  });

  test("persists theme in localStorage", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId("theme-toggle");
    fireEvent.click(toggleButton);

    expect(localStorage.getItem("theme")).toBe('"dark"');
  });
});
