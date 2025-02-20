
export const AgentService = {
    getAgentsData() {
        return [
            {
                id: 1000,
                username: 'Alam',
                nickname: 'Khan',
                capacity: 3,
                online: true
            },
            {
                id: 1001,
                username: 'Rafiq',
                nickname: 'Rahman',
                capacity: 5,
                online: false
            },
            {
                id: 1002,
                username: 'Salman',
                nickname: 'Ahmed',
                capacity: 2,
                online: true
            }
        ];
    },

    getAgentsMini() {
        return Promise.resolve(this.getAgentsData().slice(0, 2));
    },

    getAgentsSmall() {
        return Promise.resolve(this.getAgentsData().slice(0, 5));
    },

    getAgents() {
        return Promise.resolve(this.getAgentsData());
    }
};
