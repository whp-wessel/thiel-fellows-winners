"use client"

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'
import { Badge, badgeVariants } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useMemo } from "react"
import { QrCode } from 'lucide-react';

export const BADGES = [
    'Progress studies', 'Climate change', 'AI', 'Career development', 'Crypto', 'Moonshots', 'Biotech',
    'Space', 'Mental health', 'Education', 'Cities', 'Robotics', 'Economics', 'Virtual reality',
    'Academia'
]

interface SearchBarProps {
    setLoadingTrue: () => void;
}

export default function SearchBar({ setLoadingTrue }: SearchBarProps) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push } = useRouter();
    const params = new URLSearchParams(searchParams);

    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');

    function handleSearch(term: string) {
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        push(`${pathname}?${params.toString()}`);
        setSearchTerm(term);
        setLoadingTrue();
    }

    return (
        <>
            <h2 className="font-semibold mb-2">Semantic search over every Thiel Fellowship winner</h2>
            <p className="mb-4 text-sm">
                <a className="underline" href="https://thielfellowship.org/">Thiel Fellowship</a> is a fellowship and grant program founded by <a className="underline" href="https://en.wikipedia.org/wiki/Peter_Thiel">Peter Thiel</a>, co-founder of PayPal, investor at Founders Fund and author of the book Zero to One.
                It supports ambitious individuals to drop out and pursue foundational work.
            </p>
            <p className="mb-4 text-sm">
                This site collects all winners in one place. You can also find a CSV by clicking the Github link on the top right.
            </p>
            <p className="mb-4 text-sm">
                This search bar doesn&lsquo;t need you to get the keywords exactly right; it uses a technique from machine learning called embeddings to find close enough matches.
                Here are a few starting suggestions for you:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
                {BADGES.map((badgeText) => (
                    <button
                        key={badgeText}
                        className={`badge ${badgeVariants({ variant: "secondary" })}`}
                        onClick={() => handleSearch(badgeText)}
                    >
                        {badgeText}
                    </button>
                ))}
            </div >
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault;
                    handleSearch(searchTerm);
                }} className="flex">
                    <Input
                        className="flex-1 mr-2"
                        placeholder="Search project descriptions..."
                        name="query"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <Button type="submit">Search</Button>
                </form>
            </div>
        </>
    )
}