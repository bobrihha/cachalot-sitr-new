import React, { useState, useEffect } from 'react';

// Types
interface User {
    id: number;
    source: string;
    name?: string;
    username?: string;
    created_at: string;
    lead_status: string;
}



export const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'users' | 'web' | 'telegram'>('users');
    const [users, setUsers] = useState<User[]>([]);
    const [promptText, setPromptText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Generic Secure Fetch Helper
    const secureFetch = async (path: string, options: RequestInit = {}) => {
        // Use generic proxy for routing
        // URL: /proxy.php?path=/api/admin/...
        const proxyUrl = `/proxy.php?path=${encodeURIComponent(path)}`;

        const headers = {
            'Content-Type': 'application/json',
            'X-Cachalot-Secret': password, // Pass password as secret
            ...(options.headers || {}),
        } as HeadersInit;

        const res = await fetch(proxyUrl, {
            ...options,
            headers,
        });

        if (res.status === 403) {
            alert("Неверный пароль!");
            setIsAuthenticated(false);
            return null;
        }
        return res;
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password) {
            setIsAuthenticated(true);
            // Optional: Verify immediately? 
            // For now, next fetch will fail if wrong.
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await secureFetch('/api/admin/users');
            if (res && res.ok) {
                setUsers(await res.json());
            }
        } catch (e) {
            console.error(e);
        }
    };

    const fetchPrompt = async (channel: string) => {
        setIsLoading(true);
        try {
            const res = await secureFetch(`/api/admin/prompts/${channel}`);
            if (res && res.ok) {
                const data = await res.json();
                setPromptText(data.content);
            } else {
                setPromptText(''); // Reset or show error
            }
        } catch (e) { console.error(e); }
        setIsLoading(false);
    };

    const savePrompt = async (channel: string) => {
        setIsLoading(true);
        try {
            await secureFetch(`/api/admin/prompts/${channel}`, {
                method: 'POST',
                body: JSON.stringify({ content: promptText })
            });
            alert('Сохранено!');
        } catch (e) { console.error(e); }
        setIsLoading(false);
    };

    useEffect(() => {
        if (!isAuthenticated) return;

        if (activeTab === 'users') {
            fetchUsers();
        } else {
            fetchPrompt(activeTab);
        }
    }, [activeTab, isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-sans">
                <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Cachalot Admin</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Пароль администратора"
                        className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 mb-4 focus:outline-none focus:border-blue-500 text-white"
                    />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
                        Войти
                    </button>
                    <p className="text-xs text-gray-500 mt-4 text-center">Default: cachalot2025</p>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
                <h1 className="text-xl font-bold text-gray-800">Cachalot Control Center</h1>
                <button onClick={() => setIsAuthenticated(false)} className="text-sm text-red-500 hover:underline">Wyjść</button>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'users' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Пользователи
                        {activeTab === 'users' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('web')}
                        className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'web' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Web Prompt
                        {activeTab === 'web' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('telegram')}
                        className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'telegram' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Telegram Prompt
                        {activeTab === 'telegram' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'users' ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Имя</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Источник</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Создан</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((u: any) => (
                                    <tr key={u.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-600">{u.id}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.name || 'Гость'}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.source === 'telegram' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                                {u.source}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(u.created_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">Загрузка...</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Системный промпт для {activeTab === 'web' ? 'сайта' : 'Telegram'}
                        </h2>
                        <textarea
                            value={promptText}
                            onChange={e => setPromptText(e.target.value)}
                            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm bg-gray-50"
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => savePrompt(activeTab as string)}
                                disabled={isLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition disabled:opacity-50"
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
