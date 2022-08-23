export default function useIsTouchDevice() {

    const isTouchDevice = () => {
        return (('ontouchstart' in window) || 
            (navigator.maxTouchPoints > 0) || 
            (window.matchMedia("(pointer: coarse)").matches) ||
            (window.matchMedia("-moz-touch-enabled: 1").matches)
        );
    }

    return { isTouchDevice };
}