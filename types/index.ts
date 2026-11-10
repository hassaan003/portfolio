export type Locale= 'en' | 'ur';
export type MultiLingualString = {
    [key in Locale]?: string;
};

export interface Project {
    id: string;
    title: MultiLingualString;
    description: MultiLingualString;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    image: string;
}

export interface Experience {
    id: string;
    role: MultiLingualString;
    company: string;
    period: string;
    highlights: MultiLingualString[];
}