import React, { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

const ReactConfetti = () => {
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
       
        setIsExploding(true);

        const timer = setTimeout(() => {
            setIsExploding(false);
        }, 4000);

        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 className='text-3xl font-semibold mt-5'> Congrats! Your payment is successful</h1>
            {isExploding && (
                <ConfettiExplosion
                    force={0.6} 
                    duration={4000} 
                    particleCount={500} 
                    colors={['#FFC700', '#FF0000', '#00FF00', '#0000FF']} 
                />
            )}
        </div>
    );
};

export default ReactConfetti;
