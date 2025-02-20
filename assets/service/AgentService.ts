export interface Agent {
    id: number;
    username: string;
    nickname: string;
    capacity: number;
    online: boolean;
}

export const AgentService = {
    getAgentsData(): Agent[] {
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

    getAgentsMini(): Promise<Agent[]> {
        return Promise.resolve(this.getAgentsData().slice(0, 2));
    },

    getAgentsSmall(): Promise<Agent[]> {
        return Promise.resolve(this.getAgentsData().slice(0, 5));
    },

    getAgents(): Promise<Agent[]> {
        return Promise.resolve(this.getAgentsData());
    }
};
