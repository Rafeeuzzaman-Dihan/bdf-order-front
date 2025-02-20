export default function accessUser(user: {} | null = useCookie<string>('user').value || null): {} | null {
    const cookieOptions: Record<string, unknown> = {
        maxAge: 60 * 60 * 24 * 7,
        priority: 'high',
        secure: true,
    };

    console.log(user, 'co');
    const savedUser = useCookie<{} | null>('user', cookieOptions);
    savedUser.value = user;
    return savedUser.value || null;
}