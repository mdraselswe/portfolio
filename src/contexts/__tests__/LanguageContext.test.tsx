import { LanguageContext, LanguageProvider } from "@/contexts/LanguageContext";
import { useContext } from "@/lib";
import { fireEvent, render, screen } from "@/lib/test";
import { translations } from "@/translations";
import { act } from "@testing-library/react";

const TestComponent = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  const { language, toggleLanguage } = context;
  return (
    <div>
      <span data-testid="language-value">{language}</span>
      <button onClick={toggleLanguage} data-testid="language-toggle">
        Toggle Language
      </button>
      <span data-testid="translated-text">{translations[language].hero.greeting}</span>
    </div>
  );
};

describe("LanguageContext", () => {
  test("provides initial language value", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const languageValue = screen.getByTestId("language-value");
    expect(languageValue.textContent).toBe("en");
  });

  test("toggles language when button is clicked", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const languageValue = screen.getByTestId("language-value");
    const toggleButton = screen.getByTestId("language-toggle");

    expect(languageValue.textContent).toBe("en");

    fireEvent.click(toggleButton);
    expect(languageValue.textContent).toBe("bn");

    fireEvent.click(toggleButton);
    expect(languageValue.textContent).toBe("en");
  });

  test("updates translations when language changes", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const translatedText = screen.getByTestId("translated-text");
    const toggleButton = screen.getByTestId("language-toggle");

    expect(translatedText.textContent).toBe(translations.en.hero.greeting);

    fireEvent.click(toggleButton);
    expect(translatedText.textContent).toBe(translations.bn.hero.greeting);
  });

  test("persists language preference in localStorage", async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const toggleButton = screen.getByTestId("language-toggle");

    await act(async () => {
      fireEvent.click(toggleButton);
      // Wait for React state updates to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Get the language value after state updates are complete
    const languageValue = screen.getByTestId("language-value");
    expect(languageValue.textContent).toBe("bn");
    expect(localStorage.getItem("language")).toBe('"bn"');
  });
});
