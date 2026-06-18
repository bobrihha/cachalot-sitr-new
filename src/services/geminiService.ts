import type { Lang } from "../site";

// Use PHP proxy on Beget to avoid mixed content issues (HTTPS site -> HTTP API)
// The proxy.php forwards requests to VPS backend securely
const PROXY_URL = "/proxy.php";

export const generateProjectSpec = async (userIdea: string, lang: Lang): Promise<string> => {
    try {
        // Use proxy with path parameter pointing to our new endpoint
        const response = await fetch(`${PROXY_URL}?path=/api/ai/brief`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idea: userIdea, lang }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || errorData.error || `API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.text;
    } catch (error: unknown) {
        console.error("AI Brief Error:", error);
        const message = error instanceof Error ? error.message : JSON.stringify(error);
        const errorPrefix = lang === "en"
            ? "⚠️ Error: "
            : "⚠️ Ошибка: ";
        return `${errorPrefix}${message}`;
    }
};
