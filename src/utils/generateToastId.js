export const generateToastId = (() => {
    let idCount = 0;

    return () => {
        return (++idCount).toString();
    }
})();