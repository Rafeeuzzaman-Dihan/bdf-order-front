export default function $hasPermission(resource: string | string[], actions: string[] = []): boolean {

    const user = JSON.parse(window.localStorage.getItem('user'))

    if (!user) return false;

    if (user.is_super_admin) return true

    const resources = Array.isArray(resource) ? resource : [resource];

    return user.roles.some((role: any) =>
        role.permissions.some((permission: any) =>
            resources.includes(permission.resource) &&
            (actions.length ? actions.every(action => permission.actions.includes(action)) : true)
        )
    );
}



