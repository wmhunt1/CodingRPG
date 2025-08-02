// Log.tsx
import React, { useRef, useEffect } from 'react';
import '../StyleSheets/GameStyle.css';

interface LogProps {
    logEntries: string[];
}

const Log: React.FC<LogProps> = ({ logEntries }) => {
    const logRef = useRef<HTMLDivElement>(null);

    // Scroll to the bottom of the log whenever new entries are added
    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [logEntries]);

    return (
        <div className="game-log" ref={logRef}>
            {logEntries.map((entry, index) => (
                <p key={index}>{entry}</p>
            ))}
        </div>
    );
};

export default Log;