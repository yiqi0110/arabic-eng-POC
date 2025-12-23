import { useEffect, useRef, useContext, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

import './ScrambledText.css';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const ScrambledText = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '*',
  className = '',
  style = {},
  children
}) => {
  const charRef = useRef([]);
  const [root, setRoot] = useState(null);

  useEffect(() => { 
    if (!root) return;

    const split = SplitText.create(root.querySelector('p'), {
      type: 'chars',
      charsClass: 'char'
    });
    
    // console.log(split)
    // console.log(root.querySelector('p'))
    // console.log(children  )
    // console.log(test, children); // DOING THE DO
    
    charRef.current = split.chars;
    
    charRef.current.forEach(c => console.log(c));
    console.log(root.querySelector('p'))

    charRef.current.forEach(c => {
      gsap.set(c, {
        display: 'inline-block',
        attr: { 'data-content': c.innerHTML }
      });
    });

    const handleMove = e => {
      charRef.current.forEach(c => {
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || '',
              chars: scrambleChars,
              speed
            },
            ease: 'none'
          });
        }
      });
    };

    const el = root;
    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars, children]);

  return (
    <div ref={(r) => setRoot(r)} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;
