export default function accessToken(token: string | null = useCookie<string>('token').value || null): string | null {
    const cookieOptions: Record<string, unknown> = {
        maxAge: 60 * 60 * 24 * 7,
        priority: 'high',
        secure: true,
    };
    const savedToken = useCookie<string | null>('token', cookieOptions);
    savedToken.value = token;
    return savedToken.value || null;
}