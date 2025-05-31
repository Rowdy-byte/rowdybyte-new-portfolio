import { gsap } from "gsap";

export type AnimationConfig = {
    type: 'from' | 'to' | 'fromTo';
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    duration?: number;
    delay?: number;
    x?: number;
    y?: number;
    rotation?: number;
    scale?: number;
    opacity?: number;
    ease?: string;
    fill?: string;
    stroke?: string
    repeat?: number;
    transformOrigin?: string;
    yoyo?: boolean
    onComplete?: () => void
}

export const animate = (node: HTMLElement | SVGPathElement, animations: AnimationConfig[]) => {
    const tl = gsap.timeline();

    animations.forEach((animation: AnimationConfig) => {
        const { type, from, to, duration, delay, ...args } = animation;

        if (type === 'fromTo') {
            if (!from || !to) {
                console.error("For 'fromTo' animations, both 'from' and 'to' values must be provided.");
                return;
            }
            // Hier is de belangrijke aanpassing
            tl.fromTo(node, from, { ...to, duration, delay, ...args });
        } else if (type === 'to') {
            tl.to(node, { duration, delay, ...args }); // Zorg ervoor dat je duration en delay doorgeeft
        } else if (type === 'from') {
            tl.from(node, { duration, delay, ...args });
        }
    });

    return {
        update(newAnimations: AnimationConfig[]) {
            newAnimations.forEach((newAnimation) => {
                const { type, from, to, duration, delay, ...newArgs } = newAnimation;

                if (type === 'fromTo') {
                    tl.fromTo(node, from || {}, { ...(to || {}), duration, delay, ...newArgs });
                } else if (type === 'to') {
                    tl.to(node, { duration, delay, ...newArgs });
                } else if (type === 'from') {
                    tl.from(node, { duration, delay, ...newArgs });
                }
            });
        },
        destroy() {
            tl.kill();
        }
    };
};
