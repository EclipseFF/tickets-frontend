'use client';

import {News} from "@/lib/data";
import Navbar from "@/components/admin/navbar";
import Link from "next/link";
import {useEffect, useState} from "react";
import GetLatestNews from "@/actions/news/get-latest";
import GetPaginatedNews from "@/actions/news/get-pagination";

export default function NewsList() {
    const [news, setNews] = useState<News[]>([]);
    useEffect(() => {
        GetPaginatedNews(1).then((res) => {
            setNews(res);
        });
    }, []);

    return (
        <div className="mt-6">
            {news.length > 0 ? (
                news.map((news) => (
                    <div key={news.id} className="border-b border-gray-200 py-4">
                        <h2 className="text-xl font-semibold text-gray-700">{news.name}</h2>
                        <p className="text-gray-600 mt-2">{news.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Дата: {new Date(news.created_at!).toLocaleDateString()}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">Новостей нет</p>
            )}
        </div>
    );
}