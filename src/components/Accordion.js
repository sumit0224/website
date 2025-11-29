"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.css';

export default function Accordion({ items }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.accordion}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    item={item}
                    isOpen={openIndex === index}
                    onClick={() => toggleItem(index)}
                />
            ))}
        </div>
    );
}

function AccordionItem({ item, isOpen, onClick }) {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div className={styles.item}>
            <button className={styles.header} onClick={onClick}>
                {item.title}
                <ChevronDown className={`${styles.icon} ${isOpen ? styles.open : ''}`} />
            </button>
            <div
                className={styles.content}
                style={{ height: `${height}px` }}
            >
                <div className={styles.contentInner} ref={contentRef}>
                    {item.content}
                </div>
            </div>
        </div>
    );
}
