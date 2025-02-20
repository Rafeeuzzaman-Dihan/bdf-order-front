export const usePermissions = (permissions) => {
    const updateSelectedGroupPermissions = (isChecked: boolean, groupName: string | null) => {
        const group = permissions.value.find(resource => resource.name === groupName);
        if (group) {
            group.children.forEach(child => {
                child.checked = isChecked;
            });
        }
    };

    const updateSelectedGroupDependsOnPermission = (isChecked: boolean, group: any) => {
        if (group) {
            if (isChecked) {
                group.checked = true;
            } else {
                const anyChecked = group.children.some(child => child.checked);
                group.checked = anyChecked;
            }
        }
    };

    return {
        updateSelectedGroupPermissions,
        updateSelectedGroupDependsOnPermission
    };
};