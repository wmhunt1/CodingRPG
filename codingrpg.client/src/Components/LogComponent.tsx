// GameLogComponent.tsx
import React, { useEffect, useRef } from 'react';
import '../StyleSheets/GameStyle.css'; 

interface LogProps {
    logEntries: string[];
}

const Log: React.FC<LogProps> = ({ logEntries }) => {

    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
   
        if (logContainerRef.current) {
     
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logEntries]); 
    return (
        <div className="game-log-wrapper"> 
            <h3>Log</h3> 
            <div className="log-entries-container" ref={logContainerRef}> 
                {logEntries.map((log, index) => (
                    <p key={index}>{log}</p>
                ))}
            </div>
        </div>
    )
};

export default Log;