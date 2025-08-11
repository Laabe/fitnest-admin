export function getCookie(name: string) {
    if (typeof document === 'undefined') return undefined;
    const m = document.cookie.match(
        new RegExp('(^|; )' + name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\$1') + '=([^;]*)')
    );
    return m ? decodeURIComponent(m[2]) : undefined;
}