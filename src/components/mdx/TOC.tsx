'use client'

import { type Toc } from '@/lib/types/toc-type';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import {clsx} from "clsx";

import { Card } from "@/components/ui/card";

const numberToStringMap = {
    1: 'one',
    2: 'two',
    3: 'three',
};

const getScrollTop = () => {
    if (!document.body) return 0;
    if (document.documentElement && 'scrollTop' in document.documentElement) {
        return document.documentElement.scrollTop || document.body.scrollTop;
    } else {
        return document.body.scrollTop;
    }
};

interface IHeadingTops {
    slug: string;
    top: number;
}

interface TocSideProps {
    tableOfContents: Toc[];
}

const TocSide = ({ tableOfContents }: TocSideProps) => {
    const [activeToc, setActiveToc] = useState('');
    const [headingTops, setHeadingTops] = useState<null | IHeadingTops[]>([]);

    const settingHeadingTops = useCallback(() => {
        const scrollTop = getScrollTop();
        const headingTops = tableOfContents.map(({ slug }) => {
            const el = document.getElementById(slug);
            const top = el ? el.getBoundingClientRect().top + scrollTop : 0;
            return { slug, top };
        });
        setHeadingTops(headingTops);
    }, [tableOfContents]);

    useEffect(() => {
        settingHeadingTops();
        let prevScrollHeight = document.body.scrollHeight;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const trackScrollHeight = () => {
            const scrollHeight = document.body.scrollHeight;
            if (prevScrollHeight !== scrollHeight) {
                settingHeadingTops();
            }
            prevScrollHeight = scrollHeight;
            timeoutId = setTimeout(trackScrollHeight, 250);
        };

        timeoutId = setTimeout(trackScrollHeight, 250);

        return () => {
            timeoutId && clearTimeout(timeoutId);
        };
    }, [settingHeadingTops]);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = getScrollTop();
            if (!headingTops) return;
            const currentHeading = headingTops
                .slice()
                .reverse()
                .find((headingTop) => scrollTop >= headingTop.top - 4);

            if (currentHeading) {
                setActiveToc(currentHeading.slug);
            } else {
                setActiveToc('');
            }
        };
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [headingTops]);

    return (
        <>
            {tableOfContents.length ? (
                <Card>
                    <ul className="pl-2 py-2 pb-4 pr-1">
                        <div className ="text-lg font-medium dark:border-gray-700 pb-1">Table of Contents</div>
                        {tableOfContents.map((toc, i) => (
                            <li
                                data-level={numberToStringMap[toc.level]}
                                key={i}
                                className={clsx(`${activeToc === toc.slug ? 'active' : ''}`,
                                'pl-2 border-l-2 border-gray-100 first-of-type:pt-2 py-1 text-gray-400 text-sm hover:text-gray-800 dark:hover:text-gray-200 transition-all data-[level=two]:pl-4 data-[level=three]:pl-6')}
                            >
                                <Link href={`#${toc.slug}`}>{toc.text}</Link>
                            </li>
                        ))}
                    </ul>
                </Card>
            ) : null}
        </>
    );
};

export default TocSide;
